import {
  books as seedBooks,
  getReadStatus,
  type BookDetail,
  type ReadStatus,
} from "@/lib/mock-data";

export const BOOKS_STORAGE_KEY = "bookstagram-books";

export const challengeSeedBooks: BookDetail[] = [
  {
    id: "5",
    title: "Educated",
    author: "Tara Westover",
    year: 2018,
    genres: ["Memoir", "Non-fiction"],
    rating: 5,
    quotes: [],
  },
  {
    id: "6",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    genres: ["Classic", "Fiction"],
    rating: 4,
    quotes: [],
  },
  {
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    genres: ["Science fiction", "Fantasy"],
    rating: 5,
    quotes: [],
  },
  {
    id: "8",
    title: "Normal People",
    author: "Sally Rooney",
    year: 2018,
    genres: ["Literary fiction", "Romance"],
    rating: 4,
    quotes: [],
  },
  {
    id: "9",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    year: 2021,
    genres: ["Literary fiction", "Science fiction"],
    rating: 4,
    quotes: [],
  },
  {
    id: "10",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    year: 2017,
    genres: ["Historical fiction", "Romance"],
    rating: 5,
    quotes: [],
  },
  {
    id: "11",
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    year: 2022,
    genres: ["Literary fiction"],
    rating: 5,
    quotes: [],
  },
  {
    id: "12",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    year: 2022,
    genres: ["Historical fiction", "Humor"],
    rating: 4,
    quotes: [],
  },
];

function getBaseBooks(): BookDetail[] {
  return [...seedBooks, ...challengeSeedBooks];
}

export function loadUserBooks(): BookDetail[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(BOOKS_STORAGE_KEY);
    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as BookDetail[];
  } catch {
    return [];
  }
}

export function saveUserBooks(userBooks: BookDetail[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(BOOKS_STORAGE_KEY, JSON.stringify(userBooks));
}

export function getAllBooks(): BookDetail[] {
  const baseBooks = getBaseBooks();
  const userBooks = loadUserBooks();
  const bookMap = new Map(baseBooks.map((book) => [book.id, book]));

  for (const book of userBooks) {
    bookMap.set(book.id, book);
  }

  return Array.from(bookMap.values());
}

export function getBookById(id: string): BookDetail | undefined {
  return getAllBooks().find((book) => book.id === id);
}

export function getLibraryBooks(): BookDetail[] {
  return loadUserBooks();
}

export type CreateBookInput = {
  title: string;
  author: string;
  year: number;
  rating?: number;
  coverUrl?: string;
  readStatus?: ReadStatus;
  purchasedAt?: string;
};

export type CreateLibraryBookInput = {
  title: string;
  author: string;
  year: number;
  coverUrl?: string;
  readStatus?: ReadStatus;
  purchasedAt?: string;
  rating?: number;
};

export function createBook(input: CreateBookInput): BookDetail {
  const book: BookDetail = {
    id: `book-${Date.now()}`,
    title: input.title,
    author: input.author,
    year: input.year,
    rating: input.rating ?? 5,
    readStatus: input.readStatus ?? "read",
    purchasedAt: input.purchasedAt,
    coverUrl: input.coverUrl,
    genres: [],
    quotes: [],
  };

  const userBooks = loadUserBooks();
  userBooks.push(book);
  saveUserBooks(userBooks);

  return book;
}

export function createLibraryBook(input: CreateLibraryBookInput): BookDetail {
  return createBook({
    ...input,
    rating: input.rating ?? 0,
    readStatus: input.readStatus ?? "unread",
  });
}

export { getReadStatus };

export function saveBook(book: BookDetail): void {
  const baseIds = new Set(getBaseBooks().map((item) => item.id));
  const userBooks = loadUserBooks().filter((item) => item.id !== book.id);

  if (!baseIds.has(book.id)) {
    userBooks.push(book);
  } else {
    userBooks.push(book);
  }

  saveUserBooks(userBooks);
}
