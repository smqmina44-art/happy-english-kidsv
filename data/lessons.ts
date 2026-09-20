import type { CategoryId, Lesson, WordItem } from "@/types";

const makeWords = (category: CategoryId, rows: [string, string, string, string, string][]): WordItem[] =>
  rows.map(([word, pronunciation, chinese, emoji, example]) => ({ word, pronunciation, chinese, emoji, example, category }));

export const lessons: Lesson[] = [
  { id: "animals", name: "Animals", emoji: "🐶", color: "#42A5F5", description: "Meet furry and wild friends", words: makeWords("animals", [
    ["dog", "/dɔɡ/", "狗", "🐶", "This is a dog."], ["cat", "/kæt/", "猫", "🐱", "The cat is soft."], ["bird", "/bɜːrd/", "鸟", "🐦", "The bird can fly."], ["fish", "/fɪʃ/", "鱼", "🐟", "The fish can swim."], ["lion", "/ˈlaɪən/", "狮子", "🦁", "The lion is strong."], ["tiger", "/ˈtaɪɡər/", "老虎", "🐯", "The tiger has stripes."], ["elephant", "/ˈelɪfənt/", "大象", "🐘", "The elephant is big."], ["monkey", "/ˈmʌŋki/", "猴子", "🐵", "The monkey can climb."], ["rabbit", "/ˈræbɪt/", "兔子", "🐰", "The rabbit can hop."], ["bear", "/ber/", "熊", "🐻", "The bear likes honey."]]) },
  { id: "food", name: "Food", emoji: "🍎", color: "#FFB43B", description: "Tasty words for every day", words: makeWords("food", [
    ["apple", "/ˈæpəl/", "苹果", "🍎", "I like this apple."], ["banana", "/bəˈnænə/", "香蕉", "🍌", "The banana is yellow."], ["orange", "/ˈɔːrɪndʒ/", "橙子", "🍊", "This orange is sweet."], ["milk", "/mɪlk/", "牛奶", "🥛", "I drink milk."], ["bread", "/bred/", "面包", "🍞", "The bread is warm."], ["egg", "/eɡ/", "鸡蛋", "🥚", "This is an egg."], ["rice", "/raɪs/", "米饭", "🍚", "I eat rice."], ["cake", "/keɪk/", "蛋糕", "🍰", "The cake is yummy."], ["water", "/ˈwɔːtər/", "水", "💧", "Please drink water."], ["juice", "/dʒuːs/", "果汁", "🧃", "I like apple juice."]]) },
  { id: "colors", name: "Colors", emoji: "🌈", color: "#9B6DFF", description: "Paint the world with words", words: makeWords("colors", [
    ["red", "/red/", "红色", "🔴", "The apple is red."], ["blue", "/bluː/", "蓝色", "🔵", "The sky is blue."], ["yellow", "/ˈjeloʊ/", "黄色", "🟡", "The sun is yellow."], ["green", "/ɡriːn/", "绿色", "🟢", "The leaf is green."], ["orange", "/ˈɔːrɪndʒ/", "橙色", "🟠", "The ball is orange."], ["purple", "/ˈpɜːrpəl/", "紫色", "🟣", "I see purple."], ["pink", "/pɪŋk/", "粉色", "🩷", "The flower is pink."], ["black", "/blæk/", "黑色", "⚫", "The hat is black."], ["white", "/waɪt/", "白色", "⚪", "The snow is white."], ["brown", "/braʊn/", "棕色", "🟤", "The bear is brown."]]) },
  { id: "numbers", name: "Numbers", emoji: "🔢", color: "#28C39B", description: "Count from one to ten", words: makeWords("numbers", [
    ["one", "/wʌn/", "一", "1️⃣", "I have one sun."], ["two", "/tuː/", "二", "2️⃣", "I see two cats."], ["three", "/θriː/", "三", "3️⃣", "Three birds can fly."], ["four", "/fɔːr/", "四", "4️⃣", "I have four toys."], ["five", "/faɪv/", "五", "5️⃣", "Give me five!"], ["six", "/sɪks/", "六", "6️⃣", "There are six fish."], ["seven", "/ˈsevən/", "七", "7️⃣", "I see seven stars."], ["eight", "/eɪt/", "八", "8️⃣", "Eight is a number."], ["nine", "/naɪn/", "九", "9️⃣", "There are nine balls."], ["ten", "/ten/", "十", "🔟", "I can count to ten."]]) },
  { id: "family", name: "Family", emoji: "👨‍👩‍👧", color: "#FF7E91", description: "Words for the people we love", words: makeWords("family", [
    ["mom", "/mɑːm/", "妈妈", "👩", "This is my mom."], ["dad", "/dæd/", "爸爸", "👨", "This is my dad."], ["brother", "/ˈbrʌðər/", "兄弟", "👦", "He is my brother."], ["sister", "/ˈsɪstər/", "姐妹", "👧", "She is my sister."], ["baby", "/ˈbeɪbi/", "宝宝", "👶", "The baby is happy."], ["grandma", "/ˈɡrænmɑː/", "奶奶/外婆", "👵", "I love my grandma."], ["grandpa", "/ˈɡrænpɑː/", "爷爷/外公", "👴", "I love my grandpa."], ["family", "/ˈfæməli/", "家庭", "👨‍👩‍👧‍👦", "We are a family."]]) },
  { id: "vehicles", name: "Vehicles", emoji: "🚗", color: "#4A7FF7", description: "Zoom, sail and fly", words: makeWords("vehicles", [
    ["car", "/kɑːr/", "汽车", "🚗", "The car is fast."], ["bus", "/bʌs/", "公交车", "🚌", "I ride the bus."], ["train", "/treɪn/", "火车", "🚆", "The train is long."], ["plane", "/pleɪn/", "飞机", "✈️", "The plane can fly."], ["bike", "/baɪk/", "自行车", "🚲", "I ride my bike."], ["boat", "/boʊt/", "船", "⛵", "The boat is on water."]]) },
];

export const lessonMap = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson])) as Record<CategoryId, Lesson>;
export const allWords = lessons.flatMap((lesson) => lesson.words);
