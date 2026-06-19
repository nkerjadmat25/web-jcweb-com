// assets/content-map.js

const siteConfig = {
  baseUrl: "https://web-jcweb.com",
  siteName: "竞彩网",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    path: "/",
    tags: ["竞彩网", "首页", "体育", "彩票"],
    keywords: ["竞彩", "体育彩票", "足球", "篮球"]
  },
  {
    id: "football",
    title: "足球竞彩",
    path: "/football",
    tags: ["竞彩网", "足球", "竞猜", "欧洲杯"],
    keywords: ["足球", "竞彩", "比分", "赔率"]
  },
  {
    id: "basketball",
    title: "篮球竞彩",
    path: "/basketball",
    tags: ["竞彩网", "篮球", "NBA", "CBA"],
    keywords: ["篮球", "让分", "大小分", "胜分差"]
  },
  {
    id: "lottery",
    title: "数字彩",
    path: "/lottery",
    tags: ["竞彩网", "数字彩", "双色球", "大乐透"],
    keywords: ["双色球", "大乐透", "开奖", "走势图"]
  },
  {
    id: "news",
    title: "资讯",
    path: "/news",
    tags: ["竞彩网", "新闻", "分析", "推荐"],
    keywords: ["竞彩推荐", "赛事分析", "专家预测", "伤停"]
  },
  {
    id: "help",
    title: "帮助中心",
    path: "/help",
    tags: ["竞彩网", "帮助", "规则", "FAQ"],
    keywords: ["玩法说明", "规则", "常见问题", "客服"]
  }
];

const searchIndex = new Map();

function buildSearchIndex() {
  contentSections.forEach(section => {
    const combined = [...section.keywords, ...section.tags, section.title].join(" ").toLowerCase();
    const terms = combined.split(/\s+/);
    terms.forEach(term => {
      if (!searchIndex.has(term)) {
        searchIndex.set(term, []);
      }
      const list = searchIndex.get(term);
      if (!list.includes(section.id)) {
        list.push(section.id);
      }
    });
  });
}

function searchContent(query) {
  if (!query || typeof query !== "string") {
    return [];
  }
  const normalized = query.trim().toLowerCase();
  if (normalized.length === 0) {
    return [];
  }

  const matchedIds = new Set();
  const terms = normalized.split(/\s+/);

  terms.forEach(term => {
    for (const [key, ids] of searchIndex.entries()) {
      if (key.includes(term) || term.includes(key)) {
        ids.forEach(id => matchedIds.add(id));
      }
    }
  });

  return contentSections
    .filter(section => matchedIds.has(section.id))
    .map(section => ({
      id: section.id,
      title: section.title,
      url: siteConfig.baseUrl + section.path,
      tags: section.tags,
      keywords: section.keywords
    }));
}

function listAllSections() {
  return contentSections.map(section => ({
    id: section.id,
    title: section.title,
    url: siteConfig.baseUrl + section.path
  }));
}

buildSearchIndex();

export { siteConfig, contentSections, searchContent, listAllSections, buildSearchIndex };