export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export type BookQuote = {
  id: string;
  text: string;
  page: number;
};

export type BookDetail = {
  id: string;
  title: string;
  author: string;
  year: number;
  genres: string[];
  rating: number;
  startedReading?: string;
  finishedReading?: string;
  thoughts?: string;
  quotes: BookQuote[];
  coverUrl?: string;
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "bookshelf", label: "Bookshelf", href: "#" },
  { id: "book", label: "Book", href: "#" },
  { id: "trophy", label: "Reading Challenge", href: "/challenge" },
  { id: "calendar", label: "Reading Tracker", href: "/tracker" },
];

export const dashboardStats = [
  { value: "12", label: "books read this year" },
  { value: "2", label: "currently reading" },
  { value: "24%", label: "of 50 book goal" },
];

export const currentlyReading = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    progress: 68,
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    progress: 42,
  },
];

export const books: BookDetail[] = [
  {
    id: "1",
    title: "Pachinko",
    author: "Min Jin Lee",
    year: 2017,
    genres: ["Historical fiction", "Family saga", "Literary fiction"],
    rating: 5,
    quotes: [],
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    genres: ["Self-help", "Psychology", "Non-fiction"],
    rating: 4,
    startedReading: "10 Jan 2024",
    finishedReading: "28 Jan 2024",
    thoughts:
      "A practical and motivating read. Clear breaks down habit formation into simple, actionable steps. The idea that small changes compound over time really stuck with me — I have already started applying the 1% improvement mindset to my morning routine.",
    quotes: [
      {
        id: "q1",
        text: "You do not rise to the level of your goals. You fall to the level of your systems.",
        page: 27,
      },
      {
        id: "q2",
        text: "Every action you take is a vote for the type of person you wish to become.",
        page: 38,
      },
    ],
  },
  {
    id: "3",
    title: "Circe",
    author: "Madeline Miller",
    year: 2018,
    genres: ["Fantasy", "Mythology", "Historical fiction"],
    rating: 5,
    startedReading: "15 Mar 2024",
    finishedReading: "2 Apr 2024",
    thoughts:
      "Beautifully written and deeply immersive. Miller gives Circe a voice that feels both ancient and startlingly modern.",
    quotes: [
      {
        id: "q1",
        text: "But in a solitary life, there are rare moments when another soul dips near yours, as stars once a year brush the earth.",
        page: 112,
      },
    ],
  },
  {
    id: "4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    year: 2011,
    genres: ["Fantasy", "Mythology", "Romance"],
    rating: 4,
    quotes: [],
  },
];

export const recentlyAdded = books.map(({ id, title, author, rating }) => ({
  id,
  title,
  author,
  rating,
}));

export function getBookById(id: string): BookDetail | undefined {
  return books.find((book) => book.id === id);
}
