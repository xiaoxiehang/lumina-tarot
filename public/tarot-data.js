// 22 Major Arcana - full data
const MAJOR_ARCANA = [
  { n: 0, en: "The Fool", zh: "愚者", up: "新的开始、冒险、天真、自发性", rev: "鲁莽、犹豫、错失机会", kw: ["开始", "冒险", "纯真"] },
  { n: 1, en: "The Magician", zh: "魔术师", up: "意志力、创造力、行动力、资源", rev: "操纵、欺骗、犹豫不决", kw: ["创造", "行动", "掌控"] },
  { n: 2, en: "The High Priestess", zh: "女祭司", up: "直觉、神秘、内在智慧、静观", rev: "压抑直觉、表浅、忽视内心", kw: ["直觉", "神秘", "内省"] },
  { n: 3, en: "The Empress", zh: "女皇", up: "丰盛、母性、自然、感官之美", rev: "创造力受阻、依赖、忽视自我", kw: ["丰盛", "滋养", "美"] },
  { n: 4, en: "The Emperor", zh: "皇帝", up: "权威、结构、掌控、父亲形象", rev: "专制、僵化、失控", kw: ["权威", "秩序", "稳定"] },
  { n: 5, en: "The Hierophant", zh: "教皇", up: "传统、信仰、师者、精神指引", rev: "教条、反叛、非常规", kw: ["传统", "信仰", "指引"] },
  { n: 6, en: "The Lovers", zh: "恋人", up: "爱情、结合、选择、价值观一致", rev: "失衡、错误选择、关系紧张", kw: ["爱情", "选择", "和谐"] },
  { n: 7, en: "The Chariot", zh: "战车", up: "胜利、意志、自律、前进", rev: "失控、方向迷失、急躁", kw: ["胜利", "意志", "前进"] },
  { n: 8, en: "Strength", zh: "力量", up: "勇气、耐心、柔克刚、内在力量", rev: "自我怀疑、软弱、情绪失控", kw: ["勇气", "耐心", "韧性"] },
  { n: 9, en: "The Hermit", zh: "隐者", up: "独处、内省、寻找真理、指引", rev: "孤立、迷失、拒绝帮助", kw: ["独处", "智慧", "探索"] },
  { n: 10, en: "Wheel of Fortune", zh: "命运之轮", up: "转机、命运、循环、好运", rev: "厄运、抗拒改变、循环卡住", kw: ["转机", "命运", "循环"] },
  { n: 11, en: "Justice", zh: "正义", up: "公正、真相、因果、责任", rev: "不公、偏见、逃避责任", kw: ["公正", "真相", "平衡"] },
  { n: 12, en: "The Hanged Man", zh: "倒吊人", up: "换位思考、牺牲、等待、新视角", rev: "拖延、 martyrdom、无谓牺牲", kw: ["等待", "牺牲", "新视角"] },
  { n: 13, en: "Death", zh: "死神", up: "结束、蜕变、重生、放下", rev: "抗拒改变、停滞、恐惧", kw: ["结束", "蜕变", "重生"] },
  { n: 14, en: "Temperance", zh: "节制", up: "平衡、节制、调和、耐心", rev: "失衡、极端、急功近利", kw: ["平衡", "调和", "耐心"] },
  { n: 15, en: "The Devil", zh: "恶魔", up: "执念、束缚、欲望、阴影", rev: "解脱、打破束缚、觉醒", kw: ["执念", "欲望", "阴影"] },
  { n: 16, en: "The Tower", zh: "高塔", up: "剧变、崩塌、真相揭露、重建", rev: "逃避灾难、延迟的剧变", kw: ["剧变", "真相", "重建"] },
  { n: 17, en: "The Star", zh: "星星", up: "希望、治愈、灵感、平静", rev: "失望、迷茫、希望渺茫", kw: ["希望", "治愈", "灵感"] },
  { n: 18, en: "The Moon", zh: "月亮", up: "幻象、不安、潜意识、迷惑", rev: "拨云见日、真相浮现", kw: ["幻象", "潜意识", "不安"] },
  { n: 19, en: "The Sun", zh: "太阳", up: "喜悦、成功、活力、光明", rev: "短暂阴霾、过度乐观", kw: ["喜悦", "成功", "活力"] },
  { n: 20, en: "Judgement", zh: "审判", up: "觉醒、召唤、宽恕、重生", rev: "自我怀疑、拒绝召唤", kw: ["觉醒", "召唤", "宽恕"] },
  { n: 21, en: "The World", zh: "世界", up: "圆满、完成、整合、庆祝", rev: "未完成、停滞、缺一角", kw: ["圆满", "完成", "整合"] },
];

const ZODIAC = [
  { en: "Aries", zh: "白羊座", dates: "3.21–4.19", icon: "♈" },
  { en: "Taurus", zh: "金牛座", dates: "4.20–5.20", icon: "♉" },
  { en: "Gemini", zh: "双子座", dates: "5.21–6.21", icon: "♊" },
  { en: "Cancer", zh: "巨蟹座", dates: "6.22–7.22", icon: "♋" },
  { en: "Leo", zh: "狮子座", dates: "7.23–8.22", icon: "♌" },
  { en: "Virgo", zh: "处女座", dates: "8.23–9.22", icon: "♍" },
  { en: "Libra", zh: "天秤座", dates: "9.23–10.23", icon: "♎" },
  { en: "Scorpio", zh: "天蝎座", dates: "10.24–11.22", icon: "♏" },
  { en: "Sagittarius", zh: "射手座", dates: "11.23–12.21", icon: "♐" },
  { en: "Capricorn", zh: "摩羯座", dates: "12.22–1.19", icon: "♑" },
  { en: "Aquarius", zh: "水瓶座", dates: "1.20–2.18", icon: "♒" },
  { en: "Pisces", zh: "双鱼座", dates: "2.19–3.20", icon: "♓" },
];

const SPREADS = {
  single: { name: "每日一牌", name_en: "Daily Card", count: 1, desc: "抽一张牌，看今天的能量指引" },
  three: { name: "三牌阵", name_en: "Past · Present · Future", count: 3, positions: ["过去", "现在", "未来"], desc: "过去 · 现在 · 未来，看事情的发展脉络" },
  celtic: { name: "凯尔特十字", name_en: "Celtic Cross", count: 10, positions: ["现状", "挑战", "过去", "未来", "目标", "潜意识", "自我", "环境", "希望/恐惧", "结果"], desc: "十张牌深度解读，适合重要抉择" },
  love: { name: "爱情十字", name_en: "Love Spread", count: 5, positions: ["你", "对方", "关系现状", "阻碍", "发展"], desc: "五张牌看清感情的走向" },
  career: { name: "事业三牌", name_en: "Career Spread", count: 3, positions: ["现状", "机遇", "建议"], desc: "事业方向的三张牌指引" },
};
