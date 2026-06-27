export type BuyLinkStore = "amazon" | "flipkart" | "audible";

export type BuyLink = {
  store: BuyLinkStore;
  label: string;
  url: string;
};

export type WishlistBook = {
  id: string;
  title: string;
  author: string;
  year?: number;
  genres: string[];
  rating: number;
  coverUrl?: string;
  description?: string;
  buyLinks: BuyLink[];
  addedAt: string;
};

export const WISHLIST_STORAGE_KEY = "bookstagram-wishlist";

const MOCK_CATALOG: Omit<WishlistBook, "id" | "addedAt">[] = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    year: 2020,
    genres: ["Fiction", "Fantasy", "Philosophy"],
    rating: 4,
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    buyLinks: [
      {
        store: "amazon",
        label: "Amazon",
        url: "https://www.amazon.in/s?k=The+Midnight+Library+Matt+Haig",
      },
      {
        store: "flipkart",
        label: "Flipkart",
        url: "https://www.flipkart.com/search?q=The+Midnight+Library+Matt+Haig",
      },
      {
        store: "audible",
        label: "Audible",
        url: "https://www.audible.in/search?keywords=The+Midnight+Library+Matt+Haig",
      },
    ],
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    year: 2021,
    genres: ["Science fiction", "Adventure", "Space opera"],
    rating: 5,
    description:
      "Ryland Grace is the sole survivor on a desperate, last-chance mission — and if he fails, humanity and Earth itself will perish.",
    buyLinks: [
      {
        store: "amazon",
        label: "Amazon",
        url: "https://www.amazon.in/s?k=Project+Hail+Mary+Andy+Weir",
      },
      {
        store: "flipkart",
        label: "Flipkart",
        url: "https://www.flipkart.com/search?q=Project+Hail+Mary+Andy+Weir",
      },
      {
        store: "audible",
        label: "Audible",
        url: "https://www.audible.in/search?keywords=Project+Hail+Mary+Andy+Weir",
      },
    ],
  },
  {
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    year: 2023,
    genres: ["Fantasy", "Romance", "Young adult"],
    rating: 4,
    description:
      "Enter the brutal and elite world of a war college for dragon riders, where twenty-year-olds compete for glory in a deadly contest.",
    buyLinks: [
      {
        store: "amazon",
        label: "Amazon",
        url: "https://www.amazon.in/s?k=Fourth+Wing+Rebecca+Yarros",
      },
      {
        store: "flipkart",
        label: "Flipkart",
        url: "https://www.flipkart.com/search?q=Fourth+Wing+Rebecca+Yarros",
      },
      {
        store: "audible",
        label: "Audible",
        url: "https://www.audible.in/search?keywords=Fourth+Wing+Rebecca+Yarros",
      },
    ],
  },
  {
    title: "The Name of the Wind",
    author: "Patrick Rothfuss",
    year: 2007,
    genres: ["Fantasy", "Epic fantasy", "Adventure"],
    rating: 5,
    description:
      "The tale of Kvothe, from his childhood in a troupe of traveling players to years spent as a near-feral orphan in a crime-ridden city.",
    buyLinks: [
      {
        store: "amazon",
        label: "Amazon",
        url: "https://www.amazon.in/s?k=The+Name+of+the+Wind+Patrick+Rothfuss",
      },
      {
        store: "flipkart",
        label: "Flipkart",
        url: "https://www.flipkart.com/search?q=The+Name+of+the+Wind+Patrick+Rothfuss",
      },
      {
        store: "audible",
        label: "Audible",
        url: "https://www.audible.in/search?keywords=The+Name+of+the+Wind+Patrick+Rothfuss",
      },
    ],
  },
];

export const seedWishlistBooks: WishlistBook[] = MOCK_CATALOG.slice(0, 2).map(
  (book, index) => ({
    ...book,
    id: `wishlist-seed-${index + 1}`,
    addedAt: new Date().toISOString(),
  })
);

function createId(): string {
  return `wishlist-${Date.now()}`;
}

function buildBuyLinks(title: string, author: string): BuyLink[] {
  const query = encodeURIComponent(`${title} ${author}`);
  return [
    {
      store: "amazon",
      label: "Amazon",
      url: `https://www.amazon.in/s?k=${query}`,
    },
    {
      store: "flipkart",
      label: "Flipkart",
      url: `https://www.flipkart.com/search?q=${query}`,
    },
    {
      store: "audible",
      label: "Audible",
      url: `https://www.audible.in/search?keywords=${query}`,
    },
  ];
}

export function loadWishlistBooks(): WishlistBook[] {
  if (typeof window === "undefined") {
    return seedWishlistBooks;
  }

  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!stored) {
      return seedWishlistBooks;
    }

    return JSON.parse(stored) as WishlistBook[];
  } catch {
    return seedWishlistBooks;
  }
}

export function saveWishlistBooks(books: WishlistBook[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(books));
}

export function getWishlistBookById(id: string): WishlistBook | undefined {
  return loadWishlistBooks().find((book) => book.id === id);
}

export function addWishlistBook(book: WishlistBook): void {
  const books = loadWishlistBooks();
  books.unshift(book);
  saveWishlistBooks(books);
}

function findCatalogMatch(query: string) {
  const normalized = query.toLowerCase().trim();
  return MOCK_CATALOG.find(
    (book) =>
      book.title.toLowerCase().includes(normalized) ||
      book.author.toLowerCase().includes(normalized) ||
      normalized.includes(book.title.toLowerCase())
  );
}

/** Simulates AI lookup by title — replace with real API later. */
export async function mockFetchBookByTitle(
  title: string
): Promise<WishlistBook> {
  await delay(1200);

  const match = findCatalogMatch(title);

  if (match) {
    return {
      ...match,
      id: createId(),
      addedAt: new Date().toISOString(),
    };
  }

  const author = "Unknown author";
  return {
    id: createId(),
    title: title.trim(),
    author,
    year: new Date().getFullYear(),
    genres: ["Fiction"],
    rating: 4,
    description: `We found "${title.trim()}" online. Full details will be enriched when the AI backend is connected.`,
    buyLinks: buildBuyLinks(title.trim(), author),
    addedAt: new Date().toISOString(),
  };
}

/** Simulates AI poster recognition — replace with real API later. */
export async function mockFetchBookFromPoster(
  coverUrl: string
): Promise<WishlistBook> {
  await delay(1500);

  const match =
    MOCK_CATALOG[Math.floor(Math.random() * MOCK_CATALOG.length)] ??
    MOCK_CATALOG[0];

  return {
    ...match,
    id: createId(),
    coverUrl,
    addedAt: new Date().toISOString(),
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const STORE_LABELS: Record<BuyLinkStore, string> = {
  amazon: "Amazon",
  flipkart: "Flipkart",
  audible: "Audible",
};
