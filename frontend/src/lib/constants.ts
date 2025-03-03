import { Feed } from "@/types";

export const samplePosts: Feed = {
  Discover: [
    {
      id: 1,
      username: "Jane Doe",
      handle: "janedoe",
      avatarSrc: "",
      content:
        "Just launched my new project! Check it out and let me know what you think. #NewProject #Excited",
      timeAgo: "2h",
      likes: 24,
      comments: 5,
      shares: 3,
    },
    {
      id: 2,
      username: "John Smith",
      handle: "johnsmith",
      avatarSrc: "",
      imageSrc: "/placeholder.jpg",

      content:
        "Had an amazing time at the tech conference today. So many inspiring talks and great networking opportunities!",
      timeAgo: "5h",
      likes: 42,
      comments: 8,
      shares: 2,
    },
    {
      id: 3,
      username: "Alice Johnson",
      handle: "alicej",
      avatarSrc: "",
      content:
        "Just finished reading an incredible book on AI and its impact on society. Highly recommend it to everyone interested in tech and ethics!",
      timeAgo: "1d",
      likes: 56,
      comments: 12,
      shares: 7,
    },
  ],
  Following: [
    {
      id: 4,
      username: "Tech News",
      handle: "technews",
      avatarSrc: "",
      content:
        "Breaking: Major breakthrough in quantum computing announced! This could revolutionize the tech industry. #QuantumComputing #TechNews",
      timeAgo: "3h",
      likes: 1024,
      comments: 302,
      shares: 576,
    },
  ],
  Trending: [
    {
      id: 5,
      username: "Climate Action",
      handle: "climateaction",
      avatarSrc: "",
      content:
        "Global leaders commit to ambitious climate goals at the latest summit. What are your thoughts on the proposed measures? #ClimateAction #Sustainability",
      timeAgo: "6h",
      likes: 3420,
      comments: 892,
      shares: 1205,
    },
  ],
  "Hot Topics": [
    {
      id: 6,
      username: "Health & Wellness",
      handle: "healthwellness",
      avatarSrc: "",
      content:
        "New study shows the benefits of mindfulness and meditation on mental health. Have you tried these practices? #MentalHealth #Wellness",
      timeAgo: "1d",
      likes: 156,
      comments: 48,
      shares: 23,
    },
  ],
};

export const trendingTopics = [
  "#AI",
  "#ClimateAction",
  "#TechInnovation",
  "#HealthTech",
  "#SustainableLiving",
];

export const discoverUsers = [
  { name: "Tech Enthusiast", handle: "@techenthusiast" },
  { name: "Green Living", handle: "@greenliving" },
  { name: "Future Thinker", handle: "@futurethinker" },
];
