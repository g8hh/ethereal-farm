/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    'a weathered tree': '一棵饱经风霜的树',
    'Weathered tree': '饱经风霜的树',
    'about & changelog': '关于 & 更新日志',
    'back': '返回',
    'cancel': '取消',
    'achievements': '成就',
    'export save': '导出存档',
    'field': '田地',
    'hard reset': '硬重置',
    'help': '帮助',
    'import save': '导入存档',
    'number format': '数字格式',
    'player stats': '玩家统计',
    'import': '导入',
    'save now': '立即保存',
    'seeds': '种子',
    'Settings': '设置',
    'Undo': '撤销',
    'to clipboard': '复制到剪切板',
    'preferences': '首选项',
    'Example': '例如',
    'Examples': '例如',
    'none': '无',
    'Loaded local save': '载入本地存档',
    'Notation': '符号',
    'Notation description': '符号说明',
    'Player Statistics': '玩家统计',
    'precision': '精确',
    'The game moved to': '游戏已移至',
    'time': '时间',
    'About': '关于',
    'Changelog': '更新日志',
    'Consumption': '消耗',
    'cost': '成本',
    'delete': '删除',
    'detailed stats / bonuses': '详细数据/奖金',
    'Ethereal Farm': '空灵农场',
    'Buy': '购买',
    'Current amount': '当前数量',
    'Current season': '当前季节',
    'have of this crop': '有这样的作物',
    'Production': '生产',
    'Production bonus: +': '生产加成: +',
    'Season change in': '季节变化将在',
    'Seeds': '种子',
    'Spring': '春季',
    'Summer': '夏季',
    'Autumn': '秋季',
    'Winter': '冬季',
    'Spring Effects': '春季效果',
    'Stats': '统计',
    'ok': '好的',
    'prod': '产出',
    'See Completed Upgrades': '查看完成的升级',
    'see unlocked crops': '查看解锁的农作物',
    'Short-lived plant. Time left': '寿命短的植物。 剩下的时间',
    'Show breakdown of multipliers and bonuses and other detailed stats.': '显示乘数，奖金和其他详细统计信息的细目。',
    'Show the crop dialog with unlocked plants.': '显示带有未锁定植物的作物对话框。',
    'The image below shows an optimal configuration to use for watercress copying: the single watercress duplicates the production of 4 blackberries': '下图显示了用于西洋菜复制的最佳配置：单个西洋菜复制了4个黑莓的生产',
    'This tree needs to be rejuvenated first. Requires spores.': '这棵树需要首先恢复活力。 需要孢子。',
    'housand': '数千',
    'Improves production of blackberry by 25% (multiplicative': '将黑莓产量提高25％（成倍增加',
    'Improves production of blueberry by 25% (multiplicative': '使蓝莓产量提高25％（成倍增加',
    'Num planted of this type': '种植这种类型的数量',
    'Auto-saved state locally': '本地自动保存状态',
    'Unlocked crops...': '解锁的农作物...',
    'Expected production/sec': '预期产量/秒',
    'Growing. Time to grow left': '生长中。 成长剩余时间',
    'Planted': '种植',
    'Short-lived plant. Total lifetime': '寿命短的植物。 总寿命',
    'download': '下载',
    'Manually saved state locally': '手动保存到本地',
    'reset': '重置',
    'Save copied to clipboard': '复制存档到剪贴板',
    'Use exponent notation, and the exponents are always multiples of 3. E.g. 10e6 for 10 million': '使用指数表示法，并且指数始终是3的倍数。 10e6是千万',
    'Always uses exponents, such as 2e4 for 20000 (4 zeroes': '始终使用指数，例如2e4表示20000（4个零',
    'Change the displayed number format used for most costs, amounts, percentages, etc...': '更改显示的数字格式，用于大多数成本，金额，百分比等等...',
    'Formats': '格式',
    'Latin suffixes': '拉丁后缀',
    'Latin suffixes, but only up to T (trillion, 1e12), then switches to engineering notation': '拉丁后缀，但最多为T（万亿，1e12），然后切换为工程符号',
    'Latin suffixes, but only up to U (undecillion, 1e36), then switches to engineering notation': '拉丁后缀，但最多不超过U（十进制，1e36），然后切换为工程符号',
    'exponential function for logarithm 10 notation': '对数10表示法的指数函数',
    'exponential function for natural log notation. Here, e = 2.71828...': '用于自然对数符号的指数函数。 本游戏中 e = 2.71828 ...',
    'Engineering': '工程符号',
    'engineering': '工程符号',
    'hybrid T': '混合T',
    'Hybrid T': '混合T',
    'hybrid U': '混合U',
    'Hybrid U': '混合U',
    'scientific': '科学计数法',
    'Scientific': '科学计数法',
    'suffixes latin': '拉丁文后缀',
    'Suffixes latin': '拉丁文后缀',
    'etc...': '等等...',
    'Permanent crop & watercress copying': '永久性作物和西洋菜复制',
    'Help': '帮助',
    'Upgrades': '升级',
    'Dynamic help dialogs': '动态帮助对话框',
    'Keyboard shortcuts': '快捷键',
    'Main help': '关键帮助',
    'More help topics will appear here as the game progresses. Any in-game help dialog that pops up will become permanently available here once it\'s unlocked': '随着游戏的进行，更多帮助主题将出现在此处。 解锁后，任何弹出的游戏内帮助对话框都将在此处永久可用',
    'Number format help': '数字格式帮助',
    'empty field': '空地',
    'fruit ability upgrade': '水果能力升级',
    'fruit: move to sacrificial pool or from sacrificial pool to storage.': '水果：转移到牺牲池或从牺牲池转移到存储。',
    'You can click resources in the resource panel to see more detailed breakdown. You can click fullgrown crops to see detailed stats. As the game progresses, more types of information may appear in there.': '您可以在资源面板中单击资源以查看更多详细信息。 您可以单击成熟的农作物以查看详细的统计信息。 随着游戏的进行，可能会在其中显示更多类型的信息。',
    'You unlocked your first permanent type of plant. Plants like this stay on the field forever, keep producing forever, and have much more powerful production upgrades too.': '您解锁了您的第一个永久类型的植物。 这样的工厂将永远留在田间，永远保持生产，并且还具有更强大的生产升级能力。',
    'You unlocked your first upgrade! Check the "upgrades" tab to view it. Upgrades can unlock new crops, upgrade existing crops, or various other effects. Upgrades usually cost': '您已解锁首次升级！ 检查“升级”标签以查看它。 升级可以解锁新作物，升级现有作物或其他各种效果。 升级通常需要花费',
    'achievements production bonus': '成就生产加成',
    'blueberry.': '蓝莓.',
    'deleted': '删除的',
    'duration': '持续了',
    'ferns': '蕨类植物',
    'highest production': '最高产量',
    'highest resources': '最高资源',
    'planted (permanent': '种植的 (永久',
    'planted (watercress': '种植的 (西洋菜',
    'start time': '开始时间',
    'total earned': '累计获得',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    'undo': '撤销',
    'upgrade': '升级',
    'to view them.': '查看它们。',
    'This game auto-saves every few minutes in local storage in the web browser, but please use': '本游戏每隔几分钟自动保存在浏览器本地存储，但请使用',
    'The upgrades also unlock permanent crops that produce seeds forever, unlike the short-lived watercress.': '升级还可以解锁永久作物，永久产生种子，而不像短命的西洋菜。',
    'The text in the message log at the bottom will guide you through how to play. A short summary of the first steps: initially you have no resources but can get some from clicking ferns. Then you can click on field tiles to plant crops and soon resources are gained automatically and soon after that permanently. The rest will be revealed when the time is ready.': '底部消息日志中的文字将指导你如何玩。对第一步的简短总结:最初您没有资源，但可以通过单击ferns获得一些资源。然后你可以点击田地瓷砖种植庄稼，很快资源就会自动获得，不久之后就会永久获得。剩下的事等时机成熟了再揭晓。',
    'Ethereal farm is an incremental game taking place on a field with a mysterious tree in the center. Most crops are permanent and there\'s no harvesting/selling/withering as in many farm games, instead it\'s about growing better and better plant types, with various neighbor-interaction rules with other plants in the field.': '《空灵农场》是一款发生在一块中央有一棵神秘树的土地上的增量游戏。大多数作物都是永久性的，不像许多农场游戏那样可以收获/出售/枯萎，相反地，它是关于种植越来越好的植物类型，并与地里的其他植物产生各种邻居互动规则。',
    'buy multiple abilities up to 25% of current available essence': '购买多种技能最多25%的当前可用精华',
    'buy as many of this upgrade as you can afford': '购买尽可能多的这种升级，在你可以负担的范围内',
    'A key no longer works since only 1 weather ability can be active at once now, use 1, 2 or 3 to enable an ability instead.': '一个钥匙不再起作用，因为现在只能激活一个天气技能，使用1,2或3来激活一个技能。',
    'was still growing, full refund given': '仍在成长，全额退款',
    'Deleted watercress. Since this is a short-lived plant, nothing is refunded': '删除西洋菜。 由于这是短寿命的植物，因此无法退还任何资源',
    'Viewed the main help dialog': '查看了主帮助对话框',
    'delete plant, only if this is enabled in preferences': '删除植物，仅在首选项中启用后',
    'close dialogs.': '关闭弹框.',
    'available: "Upgrade blueberry': '可用：“升级蓝莓',
    'activate one of the weather abilities': '激活天气能力之一',
    'settings -> export save': '设置 -> 导出存档',
    'Savegame recovery': '游戏存档恢复',
    'save the undo state now, rather than load it. This overwrites your undo so eliminates any chance of undoing now. This will also be overwritten again if you do actions a minute later.': '现在保存撤消状态，而不是加载它。 这将覆盖您的撤消，因此消除了立即撤消的任何机会。 如果您在一分钟后执行操作，此操作也将再次被覆盖。',
    'replant watercress on all field tiles that have a watercress remainder, and refresh existing ones. Such a remainder appears for watercress that have been copying from multiple plants, that is, a good copying spot. Copying has diminishing returns if there are multiple watercress anywhere on the map, 1 or 2 is effective (check the seeds/s income to view the effect).': '在所有剩下西洋菜的田间地砖上重新种植西洋菜，并刷新现有的。 对于已经从多个植物中复制的西洋菜来说，这样的残留物是很好的复制点。 如果地图上的任何地方有多个西洋菜，则复制的收益递减，有效值为1或2（检查种子的收入以查看效果）。',
    'regularly for backups, because a local storage savegame can easily get lost.': '定期进行备份，因为本地存储保存游戏很容易丢失。',
    'plant a watercress (does not affect last planted type for shift key': '种植西洋菜（不影响上次种植的类型用Shift键',
    'plant last planted type': '种植上次种植的类型',
    'List of keyboard shortcuts': '快捷键列表',
    'import and old savegame, but do not run the time, so you get the resources at the time of saving rather than with all production during that time added.': '导入和旧的游戏存档，但不运行时间，这样你就可以在保存的时候获得资源，而不是添加那段时间的所有生产。',
    'If you plant watercress next to permanent plants, the watercress copy all its neighbors (orthogonal, not diagonal) production for free, so watercress remains relevant if you like to use it. If there is more than 1 watercress in the entire field this gives diminishing returns, so having 1 or perhaps 2 max makes sense (which is by design to not need to plant many of them all the time). The watercress is its own independent multiplier so it works well and is relevant no matter how high level other boosts the plant has later in the game.': '如果您在永久性植物旁边种植豆瓣，豆瓣可免费复制其所有邻居（正交，而非对角线）的产品，因此如果您愿意使用豆瓣，则豆瓣仍然很重要。 如果整个田间有超过1个西洋菜，这将使收益递减，因此具有1个或2个最大值是有道理的（这是设计使您不必一直种植很多）。 豆瓣菜是其自己的独立乘数，因此它运作良好，并且与植物后期在游戏中产生的高水平其他提升无关。',
    'If something goes wrong with your savegame, there may be a few older recovery savegames. Click': '如果您的游戏存档出现问题，则可能是一些较旧的恢复保存游戏。 请点击',
    'Symbol meanings': '符号含义',
    'Number Format help': '数字格式帮助',
    'WARNING: This is not a soft reset: nothing is kept, everything will be deleted, including achievements, settings and recovery saves. This starts over with a new, blank, savegame, and cannot be reverted. Are you sure you want to do this?': '警告：这不是软重置：不保留任何内容，所有内容都将被删除，包括成就，设置和恢复保存。 这将从新的空白游戏开始，并且无法还原。 你确定你要这么做吗？',
    'Perform a hard reset. This removes all savegame data, deletes your entire game and starts a new game from the beginning.': '执行硬重置。 这将删除所有保存的游戏数据，删除整个游戏并从头开始创建新游戏。',
    'Export a savegame backup: copy or download the encoded savegame below, and store it somewhere safe. Do this regularly: even though the game autosaves in the web browser, browsers can easily lose this data. This contains all your progress!': '导出存档游戏备份：复制或下载以下编码的游戏存档，并将其存储在安全的地方。 定期执行此操作：即使游戏在网络浏览器中自动保存，浏览器也很容易丢失这些数据。 这包含了您的所有进度！',
    'Remains of a watercress that was copying from multiple plants. Visual reminder of good copying-spot only, this is an empty field spot and does nothing. Allows replanting this watercress with "w" key.': '从多个植物复制的西洋菜的遗迹。 仅视觉提示良好的复制点，这是一个空白字段，不执行任何操作。 允许使用“ w”键重新种植西洋菜。',
    'Planted 5 or more permanent plants over the course of the game': '在游戏过程中种植了5棵或以上的永久植物',
    'Million': '百万',
    'Have 1 fullgrown blackberry': '拥有1个成熟的黑莓',
    'Not yet earned. Unearned achievements are normally hidden, except hinted ones like this shown as "?': '尚未获得。 不劳而获的成果通常是隐藏的，除了那些暗示这样的显示为“？',
    'Export an encoded savegame, for backups.': '导出游戏的存档代码，以进行备份。',
    'Perform a hard reset. This removes all savegame data, deletes your entire game and starts a new game from the beginning.\n\nWARNING: This is not a soft reset: nothing is kept, everything will be deleted, including achievements, settings and recovery saves. This starts over with a new, blank, savegame, and cannot be reverted. Are you sure you want to do this?': '执行硬重置。 警告：这不是软重置：不保留任何内容，所有内容将被删除，包括成就，设置和恢复保存。这将删除所有保存的游戏数据，删除整个游戏并从头开始创建新游戏。 这将从新的空白游戏开始，并且无法还原。 你确定要这么做吗？',
    'Various UI, saving, gameplay and other settings.': '各种用户界面，保存，游戏和其他设置。',
    'Undo is saved when doing an action, but with at least a minute in-between, so multiple actions in quick succession may all be undone.': '执行操作时会保存撤消操作，但间隔至少一分钟，因此快速连续执行的多个操作都可能被撤消。',
    'Undo your last action(s). Press again to redo.': '撤消您的最后一个动作。 再按一次即可重做。',
    'No matter how long ago the undo was saved, you still get the correct produced resources now for that timespan.': '无论撤消保存了多久，现在仍可以在该时间范围内获得正确的生产资源。',
    ': to duplicate full production of long-lived berry and mushroom neighbors for free (mushroom copy also consumes more': '：免费复制长寿命的浆果和蘑菇邻居的完整产量（蘑菇副本也会消耗更多',
    'Thousand': '数千',
    'the entire field full of watercress': '整个田地都充满西洋菜',
    'short-lived': '短期',
    'short-lived.': '寿命短.',
    'berry': '浆果',
    'berry.': '浆果.',
    'blackberry.': '黑莓.',
    'crops...': '农作物...',
    'Produces seeds. Boosted by flowers. Negatively affected by nettles. Neighboring mushrooms can consume its seeds to produce spores. Neighboring watercress can copy its production.': '产生种子。 由花助长。 受到荨麻的负面影响。 邻近的蘑菇可以消耗其种子来产生孢子。 邻近的西洋菜可以复制其生产。',
    'Breakdown (production': '细目分类（生产',
    "base": "基础",
    'Tree level': '树等级',
    'Tip: use SHIFT key on the field to plant last plant type, or CTRL for watercress.': '提示：在字段上使用SHIFT键可以种植最后的植物类型，对于西洋菜则使用CTRL。',
    'TIP: hold SHIFT to plant last crop type, CTRL to plant watercress': '提示：按住SHIFT键可种植最后一种作物类型，按住CTRL键可种植西洋菜',
    'You have enough resources to plant. Click an empty field to plant': '你有足够的资源来种植。单击空地进行种植',
    'Viewed the player stats': '查看玩家数据',
    'Viewed the changelog': '查看更新日志',
    'upgrades': '升级',
    'blackberry. Base production: 4 seeds/s. Crop type: berry': '解锁新作物:黑莓。基地产量:每秒钟4粒。作物类型:浆果',
    'Time since beginning': '起始时间',
    'Time in this field': '在这个田野的时间',
    'Breakdown per crop type (as potential production': '按作物类型分类(作为潜在产量',
    'Adds 20%  time duration to the lifespan of watercress (additive), and adds 50% base production excluding the neighbor coppying effect. (additive': '将西洋菜的寿命延长20%(额外)，并将基础产量增加50%，排除邻近复制效应。(额外',
    'Ethereal winter upgrade now more useful: also upgrades those positive winter effects.': '现在更有用空灵的冬季升级：也提升了冬季的积极影响。',
    'Ethereal mushroom bonus improved: no longer increases consumption.': '空灵蘑菇奖励提高：不再增加消耗。',
    'Ethereal crops now give 100% resin back on delete, but require ethereal deletion tokens.': '空灵农作物现在会在删除时提供100％的树脂，但需要空灵删除标记。',
    'Delete crop and get some of its cost back.': '删除作物，收回一些成本。',
    'Copy ability: if this plant has resource-producing long-lived neighbors (orthogonal, not diagonal) of type berry or mushroom, the watercress will duplicate all their production (but also consumption), no matter how high their tier! This has diminishing returns if there are multiple watercress plants in the entire field, max 1 or 2 watercress makes sense. A badly placed watercress can even negatively affect the copying of all others. If you have no other crop types this is not yet relevant, plant as many watercress as you want then!': '复制能力：如果这种植物的浆果或蘑菇类型具有长寿命资源（邻居，而不是对角线），西洋菜将复制其所有产量（包括消耗量），无论其等级高高！ 如果整个田地中有多个西洋菜植物，则收益递减，最多1或2个西洋菜是有意义的。 放置不当的西洋菜甚至会对所有其他产品的复制产生负面影响。 如果您没有其他作物类型，那么这还不重要，那么您可以种植任意数量的西洋菜！',
    'Choose a crop to plant': '选择一种农作物',
    'Achievement production bonus: +': '成就生产加成: +',
    'Save to local storage now. The game also autosaves every few minutes so you don\'t need this button often.': '立即保存到本地存储。 游戏还会每隔几分钟自动保存一次，因此您不需要经常使用此按钮。',
    'Latin suffixes for large numbers, such as T for trillion, Qa for quadrillion, V for vigintillion, ...': '大数字的拉丁后缀，例如T表示万亿，Qa表示千万亿，V表示非常大的数字，…',
    'Ethereal upgrades are permanent and the resin is not refundable. You can also spend resin on plants in the ethereal field instead.': '空灵的升级是永久性的，树脂不予退款。 您也可以将树脂花在空灵领域的植物上。',
    'Click icon or see tooltip for more info': '单击图标或查看工具提示以获取更多信息',
    'Choose large number notation': '选择大数符号',
    'Change the precision and display type for large numbers.': '更改数字的精度和显示类型。',
    ', to use the up to date location please export your savegame (see under gear icon), visit the new location, and import your savegame there.': '，要使用最新位置，请导出您的游戏存档（请参见齿轮图标下方），访问新位置，然后将您的游戏存档导入该位置。',
    'or starter resources when there is no production yet.': '或尚无生产的入门资源。',
    'Once a fern appeared, letting it sit longer does not change the amount gives.': '一旦一株蕨类植物出现，让它停留的时间更长并不会改变它的数量。',
    'fern: provides some resource when activated.': '蕨菜：启动时提供了一些资源。',
    'Hold shift to buy as many as possible': '按住Shift键购买最大数量',
    'The amount is based on production at time when the fern appears,': '该数量基于蕨类植物出现时的产量，',
    'No further ethereal upgrades are available for now.': '目前没有进一步的空灵升级。',
    'Import a savegame backup. You can create a backup with "export save". Paste in here and press "import".': '导入游戏存档备份。 您可以使用“导出存档”创建备份。 粘贴在这里，然后按“导入”。',
    'Import a save, which you created with "export save': '导入您使用“导出存档”创建的存档代码',
    // 更新日志
    'A few other minor tweaks, e.g. the savegame now remembers which tab you had open and the assigned shift key plant.': '其他一些小的调整，例如 保存游戏现在可以记住您打开了哪个选项卡以及指定的Shift键种植。',
    'Added "a" keyboard shortcut for abilities.': '为功能添加了“ a”键盘快捷键。',
    'Added "choice" upgrades': '添加了“选择”升级',
    'Bugfixes': '修复Bug',
    'Changed the savegame format internally to be more compatible with future updates.': '内部更改了存档的格式，使其与将来的更新更加兼容。',
    'Fixed a minor exploit with ferns.': '修复了蕨类的小漏洞。',
    'Improve UI of "choice" upgrades to be single upgrade with a choice dialog': '使用选择对话框将“选择”升级的用户界面改进为单一升级',
    'Fixed bugs related to leeching and transcension II.': '修复了与盗取和超越II相关的错误。',
    'Renamed "fog ability" to "mist ability".': '将“雾能力”更名为“雾能力”。',
    'Only one weather ability can be active at the same time now.': '现在只能同时启用一个天气能力。',
    'Swapped fog and sun ability (sun is now unlocked first).': '交换了雾和太阳的能力（现在首先解锁了太阳）。',
    'UI tweaks and fixes.': 'UI调整和修复。',
    'Unused resin also gives a small boost now.': '现在，未使用的树脂也有小幅提升。',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',
    '': '',

    //原样
    'watercress': '西洋菜',
    'watercress.': '西洋菜.',
    'Watercress': '西洋菜',
    'blueberry': '蓝莓',
    'Blueberry': '蓝莓',
    'blackberry': '黑莓',
    'Blackberry': '黑莓',
    'blackberry. Base production: 4 seeds/s. Crop type:': '黑莓。 基本产量：4种子/秒。 作物类型：',
    'blueberry. Base production: 1.4K seeds/s. Crop type:': '蓝莓。 基本产量：1.4K种子/秒。 作物类型：',
    '': '',
    '': '',

}


//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "Season change in: ": "季节变化：",
    "• ": "• ",
    "notation: ": "符号：",
    "Welcome to Ethereal Farm ": "欢迎来到空灵农场",
    "This game requires JavaScript. The game runs fully locally.": "该游戏需要JavaScript。 游戏完全在本地运行。",
    "Game version: Ethereal Farm ": "游戏版本：空灵农场 ",
    "Buy: ": "购买: ",
    "Cost: ": "成本: ",
    "That fern gave": "蕨类植物给予",
    "available: \"": "可用: “",
    "Upgrade ": "升级 ",
    "Upgraded: Unlock ": "升级: 解锁 ",
    "Not enough resources to plant blackberry: need ": "没有足够的资源来种植黑莓：需要",
    'Copies neighbors': '复制邻居',
    "achievements: ": "成就: ",
    "Base planting cost": "基础种植成本",
    "Crop type: ": "农作物类型: ",
    "Growing time: ": "生长时间: ",
    'Last planting cost': '上次种植成本',
    "Unlock ": "解锁 ",
    "watercress ": "西洋菜 ",
    "Plant ": "种植 ",
    "Upgraded: Upgrade ": "升级: 升级 ",
    "Not enough resources for upgrade: need ": "没有足够的资源进行升级：需要",
    "Living time: ": "生存时间: ",
    "Planting cost: ": "种植成本: ",
    "Short-lived plant. Time left: ": "寿命短的植物。 剩下的时间：",
    "Unlocks new crop: ": "解锁新作物: ",
    "blackberry ": "黑莓 ",
    "Tier ": "层 ",
    "Have over ": "有超过 ",
    "Achievement Unlocked": "成就解锁",
    " upgrades (10): ": " 升级 (10): ",
    "no neighbors, not copying: none": "无邻居，不复制：无",
    "Deleted blackberry, got back": "删除黑莓，回收",
    "shift + click ": "shift + 左键点击 ",
    "ctrl + click ": "ctrl + 左键点击 ",
    "Not enough resources to plant blueberry: need ": "没有足够的资源来种植蓝莓：需要",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "Next planting cost: ": "下一个种植成本: ",
    "Recoup on delete: ": "删除后收回：",
    "Production/sec:": "产量/秒:",
    "Production per second": "每秒产量",
    "Produces a small amount of seeds on its own, but can produce much more resources by copying from berry and mushroom neighbors once you have those": "自己产生少量种子，但是一旦有了这些种子，可以通过从浆果和蘑菇邻居那里复制而产生更多的资源",
    "Planted watercress. Consumed: 10 seeds. Next costs: 10 seeds (": "种植西洋菜。 消耗：10种子。 下一个成本：10种子（",
    "Next planting cost: 10 seeds (": "下次种植成本:10粒种子 (",
}

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    " ": "",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    "\n": "",
    "\"": "\”",
    " seeds": " 种子",
    " seeds.": " 种子.",
    " I": " I",
    " bonus to flower boost": "加成给花提升",
    " seeds (": " 种子 (",
    " minute": " 分钟",
    " minute.": " 分钟.",
    " berry": " 浆果",
    " seeds, have": " 种子, 有",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    ", consumed": ", 消耗",
    ": Zinc": ": 锌",
    ": Bronze": ": 铜",
    " of stacks": " 堆叠",
    " of stacks) (": " 堆叠) (",
    " of stacks).": " 堆叠).",
}

//需排除的，正则匹配
var cnExcludeWhole = [
    /^x?\d+(\.\d+)?[A-Za-z%]{0,2}(\s.C)?\s*$/, //12.34K,23.4 °C
    /^x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /^\s*$/, //纯空格
    /^\d+(\.\d+)?[A-Za-z]{0,2}.?\(?([+\-]?(\d+(\.\d+)?[A-Za-z]{0,2})?)?$/, //12.34M (+34.34K
    /^(\d+(\.\d+)?[A-Za-z]{0,2}\/s)?.?\(?([+\-]?\d+(\.\d+)?[A-Za-z]{0,2})?\/s\stot$/, //2.74M/s (112.4K/s tot
    /^\d+(\.\d+)?(e[+\-]?\d+)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?$/, //2.177e+6 (+4.01+4
    /^(\d+(\.\d+)?(e[+\-]?\d+)?\/s)?.?\(?([+\-]?(\d+(\.\d+)?(e[+\-]?\d+)?)?)?\/s\stot$/, //2.177e+6/s (+4.01+4/s tot
];
var cnExcludePostfix = [
    /:?\s*x?\d+(\.\d+)?(e[+\-]?\d+)?\s*$/, //12.34e+4
    /:?\s*x?\d+(\.\d+)?[A-Za-z]{0,2}$/, //: 12.34K, x1.5
]

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
var cnRegReplace = new Map([
    [/^requires ([\d\.]+) more research points$/, '需要$1个研究点'],
    [/^(\d+) Royal points$/, '$1 皇家点数'],
    [/^(.+) seeds, have: (.+) seeds \($/, '$1 种子, 拥有: $2 种子 \('],
    [/^(.+) seeds, have$/, '$1 种子, 拥有'],
    [/^Planted blackberry. Consumed: (.+) seeds. Next costs: (.+) 种子(.+)$/, '种植黑莓。 消耗：$1 种子。 下一个成本：$2 种子$3'],
    [/^(.+) seeds \((.+)$/, '$1 种子 \($2'],
    [/^(.+) seeds \($/, '$1 种子 \('],
    [/^([\d\.]+) hours ([\d\.]+) minutes ([\d\.]+) seconds$/, '$1 小时 $2 分钟 $3 秒'],
    [/^([\d\.]+) minutes ([\d\.]+) seconds.$/, '$1 分钟 $2 秒.'],
    [/^([\d\.]+)h ([\d\.]+)m ([\d\.]+)s.$/, '$1 小时 $2 分钟 $3 秒.'],
    [/^blackberry (.+), consumed$/, '黑莓 $1, 消耗'],
    [/^watercress (.+), consumed$/, '西洋菜 $1, 消耗'],
    [/^(.+) seeds \((.+)\%$/, '$1 种子 \($2\%'],
    [/^Usages: (\d+)\/$/, '用途：$1\/'],
    [/^workers: (\d+)\/$/, '工人：$1\/'],

]);
