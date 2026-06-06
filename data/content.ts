import type {
  ListeningItem,
  PracticeTask,
  ReadingArticle,
  VocabularyMap,
} from "@/data/types";

const forestWords: VocabularyMap = {
  ancient: { word: "ancient", meaning: "古老的", partOfSpeech: "adj." },
  forest: { word: "forest", meaning: "森林", partOfSpeech: "noun" },
  path: { word: "path", meaning: "小路", partOfSpeech: "noun" },
  curious: { word: "curious", meaning: "好奇的", partOfSpeech: "adj." },
  whispers: { word: "whispers", meaning: "低语声", partOfSpeech: "noun" },
  leaves: { word: "leaves", meaning: "树叶", partOfSpeech: "noun" },
  courage: { word: "courage", meaning: "勇气", partOfSpeech: "noun" },
};

const cityWords: VocabularyMap = {
  avenue: { word: "avenue", meaning: "大街", partOfSpeech: "noun" },
  commuters: { word: "commuters", meaning: "通勤者", partOfSpeech: "noun" },
  rhythm: { word: "rhythm", meaning: "节奏", partOfSpeech: "noun" },
  hurried: { word: "hurried", meaning: "匆忙的", partOfSpeech: "adj." },
  patiently: { word: "patiently", meaning: "耐心地", partOfSpeech: "adv." },
  signal: { word: "signal", meaning: "信号灯", partOfSpeech: "noun" },
};

const focusWords: VocabularyMap = {
  distraction: { word: "distraction", meaning: "分心事物", partOfSpeech: "noun" },
  environment: { word: "environment", meaning: "环境", partOfSpeech: "noun" },
  deliberate: { word: "deliberate", meaning: "刻意的", partOfSpeech: "adj." },
  routine: { word: "routine", meaning: "日常规律", partOfSpeech: "noun" },
  fluency: { word: "fluency", meaning: "流利度", partOfSpeech: "noun" },
};

const marketWords: VocabularyMap = {
  vendor: { word: "vendor", meaning: "小贩", partOfSpeech: "noun" },
  bargain: { word: "bargain", meaning: "讨价还价", partOfSpeech: "noun" },
  baskets: { word: "baskets", meaning: "篮子", partOfSpeech: "noun" },
  fragrant: { word: "fragrant", meaning: "芳香的", partOfSpeech: "adj." },
  cheerful: { word: "cheerful", meaning: "愉快的", partOfSpeech: "adj." },
};

export const practiceTasks: PracticeTask[] = [
  {
    id: "forest-journey",
    title: "A Journey to the Forest",
    level: "Beginner",
    preview: "A gentle story about walking through an old forest and finding courage.",
    focus: "Read with calm pacing and notice descriptive words.",
    estimatedMinutes: 4,
    text:
      "The ancient forest was quiet in the early morning. Emma walked along the narrow path with curious eyes and careful steps. Soft whispers moved through the leaves above her, and every sound seemed to invite her deeper inside. She felt a little nervous, but her courage grew with each step.",
    words: forestWords,
  },
  {
    id: "city-lights",
    title: "City Lights and Busy Streets",
    level: "Intermediate",
    preview: "A snapshot of urban movement, observation, and patient attention.",
    focus: "Practice linking sounds and stress in longer sentences.",
    estimatedMinutes: 5,
    text:
      "On the main avenue, commuters moved in a fast rhythm while shop windows reflected the last golden light of the day. Mia stood near the signal and watched the hurried crowd, yet she listened patiently to a street musician whose melody made the whole corner feel softer.",
    words: cityWords,
  },
  {
    id: "deep-focus",
    title: "The Silent Architecture of Focus",
    level: "Advanced",
    preview: "A reflective paragraph on building a better learning environment.",
    focus: "Follow abstract ideas and repeat difficult sentences aloud.",
    estimatedMinutes: 6,
    text:
      "A deliberate learning routine often begins with a quiet environment. When distractions are reduced, attention has room to settle, and comprehension becomes more steady. Over time, that consistency supports fluency, because the learner can return to meaningful work without rebuilding concentration from the beginning.",
    words: focusWords,
  },
  {
    id: "market-morning",
    title: "Morning at the Open Market",
    level: "Beginner",
    preview: "A lively market scene full of colors, voices, and simple details.",
    focus: "Use the paragraph for repeated shadowing practice.",
    estimatedMinutes: 4,
    text:
      "A cheerful vendor arranged bright fruit in small baskets while a fragrant wind moved through the market. Families stopped to bargain, children pointed at fresh bread, and friendly greetings floated from one corner to another. The whole street felt warm, busy, and welcoming.",
    words: marketWords,
  },
];

export const readingArticles: ReadingArticle[] = [
  {
    id: "focus-article",
    title: "The Silent Architecture of Deep Focus",
    level: "Intermediate",
    preview: "How quiet spaces and intentional habits help language learners stay with hard material.",
    text:
      "Deep focus is rarely an accident. It is usually the result of an environment that protects attention and a routine that removes small decisions. When learners know where to sit, what to read, and how long to stay with a passage, their minds spend less energy on preparation and more energy on understanding.",
    tags: ["Article of the Day", "Study Habits"],
    estimatedMinutes: 12,
    linkedTaskId: "deep-focus",
    words: focusWords,
  },
  {
    id: "forest-article",
    title: "Listening for Meaning in Nature Stories",
    level: "Beginner",
    preview: "Why simple stories with natural imagery can improve both reading and listening confidence.",
    text:
      "Nature stories are useful for early learners because they repeat concrete images and simple actions. A forest path, moving leaves, and careful steps are easy to picture, so the reader can connect sound and meaning more quickly. That clarity makes repetition less tiring and more rewarding.",
    tags: ["Beginner", "Reading Tips"],
    estimatedMinutes: 8,
    linkedTaskId: "forest-journey",
    words: forestWords,
  },
  {
    id: "city-article",
    title: "How to Read Fast Scenes Without Feeling Lost",
    level: "Advanced",
    preview: "A guide to handling movement, detail, and multiple actions in city descriptions.",
    text:
      "Fast scenes can overwhelm learners because several actions happen at once. The best strategy is to slow down and mark the anchors first: who is moving, where the movement happens, and which sound or image holds the sentence together. Once those anchors are clear, the rest of the details feel organized.",
    tags: ["Advanced", "Strategy"],
    estimatedMinutes: 10,
    linkedTaskId: "city-lights",
    words: cityWords,
  },
];

export const listeningItems: ListeningItem[] = [
  {
    id: "london-fog",
    title: "London Fog: A Short Story",
    level: "Beginner",
    preview: "A soft British-accent listening practice about a quiet morning walk.",
    text:
      "The city looked gentle beneath the fog, and every step sounded slower than usual. A young traveler crossed the square, listened to the bells in the distance, and decided to keep walking until the streets became familiar.",
    category: "Audio Stories",
    accent: "British Accent",
    durationLabel: "12:45",
    linkedTaskId: "forest-journey",
    words: forestWords,
  },
  {
    id: "cafe-podcast",
    title: "Coffee Break Conversations",
    level: "Intermediate",
    preview: "A relaxed dialogue about daily routines, work, and building study habits.",
    text:
      "During a short coffee break, two friends discussed how small routines can support language growth. One preferred early morning review, while the other studied late at night. Both agreed that consistency mattered more than a perfect schedule.",
    category: "Podcasts",
    accent: "North American Accent",
    durationLabel: "09:20",
    linkedTaskId: "deep-focus",
    words: focusWords,
  },
  {
    id: "market-report",
    title: "Morning Market Update",
    level: "Beginner",
    preview: "A news-style audio clip with practical vocabulary from daily shopping scenes.",
    text:
      "Vendors opened their stalls before sunrise, arranging vegetables, fruit, and fresh bread in neat rows. Local shoppers arrived early, hoping to find the best bargain before the market became crowded.",
    category: "Daily News",
    accent: "Neutral Accent",
    durationLabel: "07:10",
    linkedTaskId: "market-morning",
    words: marketWords,
  },
];
