/*
 @name    : 锅巴汉化 - Web汉化插件 (高性能稳定版)
 @version : V0.8.2 - 2026-05-26
 @features: 静态词条索引 O(1) | 资源名索引 O(1) | 无缓存 | 支持 {{*}} | 忽略首字母大小写 | 自动分类匹配 (数组定义)
*/
// ==/UserScript==
var CNITEM_DEBUG = 0;

// ============================================================
// 匹配配置（由 chs.js 的 cnConfig 传入，支持 CN_Helper.setConfig 运行时修改）
// ============================================================
var cnConfig = Object.assign({
    ignoreCase: true,
    trimSpaces: true,
}, window.cnConfig || {});
window.cnConfig = cnConfig;

// ============================================================
// 辅助函数
// ============================================================
function normalizeForMatching(str) {
    if (typeof str !== 'string') return str;
    let result = str;
    if (cnConfig.trimSpaces) {
        result = result.trim();
    }
    return result.split(/\s+/).map(word => {
        if (word.length === 0) return word;
        if (cnConfig.ignoreCase) {
            return word.toLowerCase();
        }
        return word[0].toLowerCase() + word.slice(1);
    }).join(' ');
}

function ignoreFirstLetterCaseEqual(a, b) {
    if (a === b) return true;
    return normalizeForMatching(a) === normalizeForMatching(b);
}

function addIgnoreCaseFlag(regex) {
    if (!cnConfig.ignoreCase) return regex;
    if (!(regex instanceof RegExp)) return regex;
    if (regex.flags.includes('i')) return regex;
    return new RegExp(regex.source, regex.flags + 'i');
}

// ============================================================
// 分类索引构建（支持从 cnItems 数组值自动提取）
// ============================================================
var _categoryIndex = {};  // { categoryName: Map(原文标准化 -> 中文) }

function rebuildCategoryIndex() {
    _categoryIndex = {};
    // 1. 如果用户手动定义了 cnCategories，先加载（兼容旧版）
    if (window.cnCategories) {
        for (let catName in window.cnCategories) {
            let dict = window.cnCategories[catName];
            if (typeof dict !== 'object') continue;
            let catMap = new Map();
            for (let original in dict) {
                let chinese = dict[original];
                if (typeof chinese !== 'string') continue;
                let normKey = normalizeForMatching(original);
                catMap.set(normKey, chinese);
            }
            _categoryIndex[catName] = catMap;
        }
    }
    // 2. 从 cnItems 的数组值自动提取分类
    if (window.cnItems) {
        for (let key in window.cnItems) {
            let val = window.cnItems[key];
            if (Array.isArray(val) && val.length >= 2) {
                let chinese = val[0];
                let category = val[1];
                if (typeof chinese === 'string' && typeof category === 'string') {
                    if (!_categoryIndex[category]) {
                        _categoryIndex[category] = new Map();
                    }
                    let normKey = normalizeForMatching(key);
                    _categoryIndex[category].set(normKey, chinese);
                }
            }
        }
    }
}

// 检查原文是否属于指定分类，并返回翻译后的中文
function getCategoryTranslation(categoryName, rawValue) {
    if (!_categoryIndex[categoryName]) return null;
    let trimmed = rawValue.trim();
    let normValue = normalizeForMatching(trimmed);
    let catMap = _categoryIndex[categoryName];
    if (catMap.has(normValue)) return catMap.get(normValue);
    // 简单复数处理（如果以s结尾，尝试去掉s）
    if (trimmed.endsWith('s')) {
        let singular = trimmed.slice(0, -1);
        let normSingular = normalizeForMatching(singular);
        if (catMap.has(normSingular)) return catMap.get(normSingular);
    }
    return null;
}

// 检查是否为数字（整数或小数）
function isNumberString(str) {
    str = str.trim();
    if (str === '') return false;
    return /^[+-]?\d+(?:\.\d+)?$/.test(str);
}

// ============================================================
// 索引构建
// ============================================================
var _staticIndex = {};      // 标准化静态词条原文 -> 中文
var _templateList = [];     // 存储 { srcTemplate, translation, regex, varNames } 用于模板匹配
var _resourceNameIndex = {}; // 标准化资源名 -> 中文
var _transCache = {};       // cnItem 结果缓存
var _tagTargets = [];       // 预编译的 cnItemByTag 目标列表 [{ key, val }]

function rebuildIndices() {
    _staticIndex = {};
    _templateList = [];
    _tagTargets = [];
    _transCache = {};
    for (let key in window.cnItems) {
        let val = window.cnItems[key];
        if (Array.isArray(val)) {
            if (typeof val[0] === 'string') {
                let normKey = normalizeForMatching(key);
                _staticIndex[normKey] = val[0];
            }
            continue;
        }
        if (typeof val !== 'string') continue;
        if (key.indexOf('{{') !== -1) {
            let { regex, varNames } = templateToRegex(key);
            _templateList.push({ srcTemplate: key, translation: val, regex, varNames });
        } else {
            let normKey = normalizeForMatching(key);
            _staticIndex[normKey] = val;
        }
    }
    // 模板按精确度排序：固定前缀越长越优先
    _templateList.sort((a, b) => {
        let aPre = a.srcTemplate.indexOf('{{');
        let bPre = b.srcTemplate.indexOf('{{');
        if (aPre === -1) aPre = a.srcTemplate.length;
        if (bPre === -1) bPre = b.srcTemplate.length;
        return bPre - aPre;
    });
    // 预编译标签匹配目标列表
    for (let key in window.cnItems) {
        if (typeof window.cnItems[key] === "object" && !Array.isArray(window.cnItems[key])) {
            _tagTargets.push({ key, val: window.cnItems[key] });
        }
    }
    _resourceNameIndex = {};
    if (window.cnResourceNames) {
        for (let key in window.cnResourceNames) {
            let normKey = normalizeForMatching(key);
            _resourceNameIndex[normKey] = window.cnResourceNames[key];
        }
    }
    rebuildCategoryIndex();  // 自动从数组值构建分类索引
}

// ============================================================
// 模板匹配核心
// ============================================================
function templateToRegex(template) {
    let varNames = [];
    let escaped = '';
    let lastIndex = 0;
    while (true) {
        let start = template.indexOf('{{', lastIndex);
        if (start === -1) {
            escaped += template.slice(lastIndex).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            break;
        }
        let end = template.indexOf('}}', start);
        if (end === -1) break;
        escaped += template.slice(lastIndex, start).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let varName = template.slice(start+2, end);
        varNames.push(varName);
        if (varName === '*' || varName.startsWith('*|') || varName.includes('*|')) {
            escaped += '(.+)';
        } else {
            escaped += '(.+?)';
        }
        lastIndex = end + 2;
    }
    return { regex: new RegExp('^' + escaped + '$', cnConfig.ignoreCase ? 'i' : ''), varNames: varNames };
}

function parseListPlaceholder(varName) {
    let sepRegex = /\s*,\s*/;
    let joinStr = '、';
    if (varName === '*') return { sepRegex, joinStr };
    if (varName.startsWith('*|')) {
        let parts = varName.slice(2).split('|');
        let sepPart = parts[0] !== undefined ? parts[0] : '';
        let joinPart = parts[1] !== undefined ? parts[1] : '';
        if (sepPart !== '') {
            let regexMatch = sepPart.match(/^\/(.+)\/([gimuy]*)$/);
            if (regexMatch) {
                try {
                    sepRegex = new RegExp(regexMatch[1], regexMatch[2]);
                } catch(e) {
                    let escaped = sepPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    sepRegex = new RegExp('\\s*' + escaped + '\\s*');
                }
            } else {
                let escaped = sepPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                sepRegex = new RegExp('\\s*' + escaped + '\\s*');
            }
        }
        if (joinPart !== '') joinStr = joinPart;
    }
    return { sepRegex, joinStr };
}

function applyTemplateTranslation(sourceText, srcTemplate, tgtTemplate, node, precompiledRegex, precompiledVarNames) {
    let regex = precompiledRegex, varNames = precompiledVarNames;
    if (!regex) {
        let result = templateToRegex(srcTemplate);
        regex = result.regex;
        varNames = result.varNames;
    }
    let match = sourceText.match(regex);
    if (!match) return null;
    let values = {};
    for (let i = 0; i < varNames.length; i++) {
        let varName = varNames[i];
        let rawValue = match[i+1];
        if (rawValue === undefined) rawValue = '';
        
        // 处理列表占位符 {{*}} 或 {{*|...}}
        if (varName === '*' || varName.startsWith('*|')) {
            let { sepRegex, joinStr } = parseListPlaceholder(varName);
            let items = rawValue.split(sepRegex).map(s => s.trim()).filter(s => s);
            let translatedItems = items.map(item => cnItem(item, node));
            values[varName] = translatedItems.join(joinStr);
        }
        // 处理数字占位符 {{%d}}
        else if (varName === '%d') {
            if (!isNumberString(rawValue)) {
                return null;  // 不是数字，匹配失败
            }
            values[varName] = rawValue.trim();
        }
        // 处理分类占位符 {{分类名}}
        else {
            // 支持 {{分类名*}} 仅查分类(找不到保留原文)
            // 支持 {{分类名*|sep|join}} 分类限定列表解析
            let catName = varName;
            let categoryOnly = false;
            let listMode = false;
            let sepRegex = /\s*,\s*/;
            let joinStr = '、';

            let starIdx = catName.indexOf('*');
            if (starIdx !== -1) {
                categoryOnly = true;
                let suffix = catName.slice(starIdx);
                catName = catName.slice(0, starIdx);
                if (suffix.startsWith('*|')) {
                    listMode = true;
                    let parsed = parseListPlaceholder(suffix);
                    sepRegex = parsed.sepRegex;
                    joinStr = parsed.joinStr;
                }
            }

            if (listMode) {
                let items = rawValue.split(sepRegex).map(s => s.trim()).filter(s => s);
                let translatedItems = items.map(item => {
                    let t = getCategoryTranslation(catName, item);
                    return t !== null ? t : item.trim();
                });
                values[varName] = translatedItems.join(joinStr);
            } else {
                let translated = getCategoryTranslation(catName, rawValue);
                if (translated !== null) {
                    values[varName] = translated;
                } else if (categoryOnly) {
                    values[varName] = rawValue.trim();
                } else {
                    // 不是分类，则作为普通占位符（递归翻译）
                    let trimmed = rawValue ? rawValue.trim() : '';
                    values[varName] = cnItem(trimmed, node);
                }
            }
        }
    }
    let result = tgtTemplate.replace(/\{\{([^}]+)\}\}/g, (_, varName) => {
        if (values[varName] !== undefined) return values[varName];
        let idx = varNames.indexOf(varName);
        if (idx !== -1 && match[idx+1]) return match[idx+1].trim();
        return '';
    });
    return result;
}

// ============================================================
// 纯名词翻译（使用索引 O(1)）
// ============================================================
function translateNoun(text) {
    if (!window.cnResourceNames) return null;
    let trimmed = text.trim();
    if (trimmed === "") return null;
    // 精确原文匹配：先试原文（含尾部空格），再试trimmed
    if (window.cnResourceNames.hasOwnProperty(text)) {
        return window.cnResourceNames[text];
    }
    if (window.cnResourceNames.hasOwnProperty(trimmed)) {
        return window.cnResourceNames[trimmed];
    }
    let normKey = normalizeForMatching(trimmed);
    if (_resourceNameIndex.hasOwnProperty(normKey)) {
        return _resourceNameIndex[normKey];
    }
    // 简单复数处理
    if (trimmed.endsWith('s')) {
        let singular = trimmed.slice(0, -1);
        if (singular.endsWith('e')) {
            let candidate = singular.slice(0, -1);
            let normCandidate = normalizeForMatching(candidate);
            if (_resourceNameIndex.hasOwnProperty(normCandidate)) {
                return _resourceNameIndex[normCandidate];
            }
        }
        let normSingular = normalizeForMatching(singular);
        if (_resourceNameIndex.hasOwnProperty(normSingular)) {
            return _resourceNameIndex[normSingular];
        }
    }
    return null;
}

// ============================================================
// 资源数值自动翻译（使用索引）
// ============================================================
function autoTranslateResourceName(text) {
    if (!window.cnResourceNames) return null;
    let match1 = text.match(/^([A-Za-z][A-Za-z\s]+):\s*(.+)$/i);
    if (match1) {
        let resource = match1[1].trim();
        let value = match1[2];
        let normKey = normalizeForMatching(resource);
        if (_resourceNameIndex.hasOwnProperty(normKey)) {
            return _resourceNameIndex[normKey] + '：' + value;
        }
    }
    let match2 = text.match(/^([\+\-]\d+(?:\.\d+)?)\s+([A-Za-z][A-Za-z\s]+)$/i);
    if (match2) {
        let num = match2[1];
        let resource = match2[2].trim();
        let normKey = normalizeForMatching(resource);
        if (_resourceNameIndex.hasOwnProperty(normKey)) {
            return num + ' ' + _resourceNameIndex[normKey];
        }
    }
    let match3 = text.match(/^(\d+(?:\.\d+)?)\s+([A-Za-z][A-Za-z\s]+)$/i);
    if (match3) {
        let num = match3[1];
        let resource = match3[2].trim();
        let normKey = normalizeForMatching(resource);
        if (_resourceNameIndex.hasOwnProperty(normKey)) {
            return num + ' ' + _resourceNameIndex[normKey];
        }
    }
    return null;
}

// ============================================================
// cnItemByTag 保持不变
// ============================================================
function cnItemByTag(text, itemgroup, node, textori){
    for (let i in itemgroup){
        if (i[0] == '.') {
            let current_node = node;
            while (current_node){
                if (current_node.classList && current_node.classList.contains(i.substr(1))) return itemgroup[i];
                else if(current_node.parentElement && current_node.parentElement != document.documentElement) current_node = current_node.parentElement;
                else break;
            }
        }
        else if (i[0] == '#') {
            let current_node = node;
            while (current_node){
                if (current_node.id == i.substr(1)) return itemgroup[i];
                else if(current_node.parentElement && current_node.parentElement != document.documentElement) current_node = current_node.parentElement;
                else break;
            }
        }
        else if (i[0] == '$') {
            if (document.querySelector(i.substr(1)) != null) return itemgroup[i];
        }
        else if (i[0] == '*') {
            if (textori.includes(i.substr(1))) return itemgroup[i];
        }
        else CNITEM_DEBUG && console.log({text, itemgroup, dsc:"不识别的标签" + i});
    }
    return null;
}

// ============================================================
// 全局变量（兼容原有配置）
// ============================================================
var cnItems = window.cnItems || {};
var cnRegReplace = window.cnRegReplace || new Map();
var cnResourceNames = window.cnResourceNames || {};
var cnPrefix = window.cnPrefix || {};
var cnPostfix = window.cnPostfix || {};
var cnExcludeWhole = window.cnExcludeWhole || [];
var cnExcludePostfix = window.cnExcludePostfix || [];
var cnCategories = window.cnCategories || {};  // 可选手动分类

// ============================================================
// 主翻译函数（无缓存，使用索引）
// ============================================================
function cnItem(text, node) {
    if (typeof text !== "string") return text;
    if (_transCache.hasOwnProperty(text)) return _transCache[text];
    let textori = text;

    // 前缀处理
    let text_prefix = "";
    for (let prefix in cnPrefix) {
        if (text.length >= prefix.length) {
            let head = text.substr(0, prefix.length);
            if (ignoreFirstLetterCaseEqual(head, prefix)) {
                text_prefix += cnPrefix[prefix];
                text = text.substr(prefix.length);
            }
        }
    }

    // 后缀处理
    let text_postfix = "";
    for (let postfix in cnPostfix) {
        if (text.length >= postfix.length) {
            let tail = text.substr(-postfix.length);
            if (ignoreFirstLetterCaseEqual(tail, postfix)) {
                text_postfix = cnPostfix[postfix] + text_postfix;
                text = text.substr(0, text.length - postfix.length);
                break;
            }
        }
    }

    // 正则后缀
    let text_reg_exclude_postfix = "";
    for (let reg of cnExcludePostfix) {
        let ignoreCaseReg = addIgnoreCaseFlag(reg);
        let result = text.match(ignoreCaseReg);
        if (result) {
            text_reg_exclude_postfix = result[0] + text_reg_exclude_postfix;
            text = text.substr(0, text.length - result[0].length);
        }
    }

    // 排除规则
    for (let reg of cnExcludeWhole) {
        let ignoreCaseReg = addIgnoreCaseFlag(reg);
        if (ignoreCaseReg.test(text)) {
            return _transCache[textori] = text_prefix + text + text_reg_exclude_postfix + text_postfix;
        }
    }

    // 精确静态匹配（使用索引 O(1)）
    let normText = normalizeForMatching(text);
    if (_staticIndex.hasOwnProperty(normText)) {
        return _transCache[textori] = text_prefix + _staticIndex[normText] + text_reg_exclude_postfix + text_postfix;
    }

    // 正则替换
    for (let [key, value] of cnRegReplace.entries()) {
        let ignoreCaseKey = addIgnoreCaseFlag(key);
        if (ignoreCaseKey.test(text)) {
            let replaced;
            if (typeof value === 'function') {
                let match = text.match(ignoreCaseKey);
                replaced = value(match, text, node);
            } else {
                replaced = text.replace(ignoreCaseKey, value);
                replaced = cnItem(replaced, node);
            }
            return _transCache[textori] = text_prefix + replaced + text_reg_exclude_postfix + text_postfix;
        }
    }

    // 模板匹配（使用预编译正则）
    for (let { srcTemplate, translation, regex, varNames } of _templateList) {
        let result = applyTemplateTranslation(text, srcTemplate, translation, node, regex, varNames);
        if (result !== null) {
            return _transCache[textori] = text_prefix + result + text_reg_exclude_postfix + text_postfix;
        }
    }

    // 条件标签匹配（使用预编译目标列表）
    for (let { key, val } of _tagTargets) {
        let result = cnItemByTag(key, val, node, textori);
        if (result != null) {
            return _transCache[textori] = text_prefix + result + text_reg_exclude_postfix + text_postfix;
        }
    }

    // 纯名词翻译
    let nounResult = translateNoun(text);
    if (nounResult !== null) {
        return _transCache[textori] = text_prefix + nounResult + text_reg_exclude_postfix + text_postfix;
    }

    // 资源数值自动翻译
    let autoResult = autoTranslateResourceName(text);
    if (autoResult !== null) {
        return _transCache[textori] = text_prefix + autoResult + text_reg_exclude_postfix + text_postfix;
    }

    // 未翻译收集
    if (!cnItems._OTHER_) cnItems._OTHER_ = [];
    let save_cfg = 1;
    let save_text = save_cfg ? text : textori;
    for (let i = 0; i < cnItems._OTHER_.length; i++) {
        if (save_text == cnItems._OTHER_[i]) {
            return _transCache[textori] = text_prefix + text + text_reg_exclude_postfix + text_postfix;
        }
    }
    if (cnItems._OTHER_.length < 10000) {
        cnItems._OTHER_.push(save_text);
        cnItems._OTHER_.sort();
    }
    CNITEM_DEBUG && console.log('有需要汉化的英文：', text);
    return _transCache[textori] = text_prefix + text + text_reg_exclude_postfix + text_postfix;
}

// ============================================================
// 辅助工具（支持重建索引和分类扩展）
// ============================================================
window.CN_Helper = {
    getUntranslatedList: () => cnItems._OTHER_ || [],
    exportUntranslated: function(filename = "untranslated.json") {
        let data = JSON.stringify(cnItems._OTHER_, null, 2);
        let blob = new Blob([data], {type: "application/json"});
        let url = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        console.log(`已导出 ${cnItems._OTHER_.length} 个未翻译词条`);
    },
    addTranslations: function(translations) {
        for (let eng in translations) {
            cnItems[eng] = translations[eng];
        }
        rebuildIndices(); // 重建索引
        console.log(`已添加 ${Object.keys(translations).length} 条翻译，索引已重建`);
    },
    extendResourceNames: function(more) {
        if (!window.cnResourceNames) window.cnResourceNames = {};
        Object.assign(window.cnResourceNames, more);
        rebuildIndices();
        console.log("资源名映射已扩展，索引已重建");
    },
    getResourceNames: () => window.cnResourceNames || {},
    rebuildIndex: rebuildIndices,
    // 运行时修改匹配配置（修改后自动重建索引）
    setConfig: function(newConfig) {
        Object.assign(cnConfig, newConfig);
        rebuildIndices();
        console.log("匹配配置已更新:", JSON.stringify(cnConfig));
    },
    getConfig: function() { return Object.assign({}, cnConfig); },
    // 扩展分类（兼容手动定义）
    extendCategories: function(more) {
        if (!window.cnCategories) window.cnCategories = {};
        for (let catName in more) {
            if (!window.cnCategories[catName]) window.cnCategories[catName] = {};
            Object.assign(window.cnCategories[catName], more[catName]);
        }
        rebuildCategoryIndex();
        console.log("分类词典已扩展，分类索引已重建");
    },
    getCategories: () => window.cnCategories || {}
};

// ============================================================
// 页面汉化及 MutationObserver
// ============================================================
var transTaskMgr = {
    tasks: [],
    addTask: function(node, attr, text) { this.tasks.push({node, attr, text}); },
    doTask: function() { let task; while (task = this.tasks.pop()) task.node[task.attr] = task.text; }
};

function TransSubTextNode(node) {
    if (node.childNodes.length) {
        for (let subnode of node.childNodes) {
            if (subnode.nodeName === "#text") {
                let text = subnode.textContent;
                let cnText = cnItem(text, subnode);
                cnText !== text && transTaskMgr.addTask(subnode, 'textContent', cnText);
            } else if (subnode.nodeName !== "SCRIPT" && subnode.nodeName !== "STYLE" && subnode.nodeName !== "TEXTAREA") {
                if (!subnode.childNodes || !subnode.childNodes.length) {
                    let text = subnode.innerText;
                    let cnText = cnItem(text, subnode);
                    cnText !== text && transTaskMgr.addTask(subnode, 'innerText', cnText);
                } else {
                    TransSubTextNode(subnode);
                }
            }
        }
    }
}

!function() {
    rebuildIndices();
    console.log("加载汉化模块 (高性能稳定版 V0.8.2) - 支持自动分类匹配 (数组定义)");
    let observer_config = { attributes: false, characterData: true, childList: true, subtree: true };
    let targetNode = document.body;
    TransSubTextNode(targetNode);
    transTaskMgr.doTask();
    let observer = new MutationObserver(function(e) {
        observer.disconnect();
        for (let mutation of e) {
            if (mutation.target.nodeName === "SCRIPT"|| mutation.target.nodeName === "STYLE" || mutation.target.nodeName === "TEXTAREA") continue;
            if (mutation.target.nodeName === "#text") {
                mutation.target.textContent = cnItem(mutation.target.textContent, mutation.target);
            } else if (!mutation.target.childNodes || !mutation.target.childNodes.length) {
                if (mutation.target.innerText) mutation.target.innerText = cnItem(mutation.target.innerText, mutation.target);
            } else if (mutation.addedNodes.length) {
                for (let node of mutation.addedNodes) {
                    if (node.nodeName === "#text") {
                        node.textContent = cnItem(node.textContent, node);
                    } else if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE" && node.nodeName !== "TEXTAREA") {
                        if (!node.childNodes || !node.childNodes.length) {
                            if (node.innerText) node.innerText = cnItem(node.innerText, node);
                        } else {
                            TransSubTextNode(node);
                        }
                    }
                }
            }
        }
        transTaskMgr.doTask();
        observer.observe(targetNode, observer_config);
    });
    observer.observe(targetNode, observer_config);
}();