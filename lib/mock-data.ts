export type NavItem = {
  id: string;
  label: string;
  href: string;
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "bookshelf", label: "Bookshelf", href: "#" },
  { id: "book", label: "Book", href: "#" },
  { id: "trophy", label: "Trophy", href: "#" },
  { id: "calendar", label: "Calendar", href: "#" },
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

export const recentlyAdded = [
  {
    id: "1",
    title: "Pachinko",
    author: "Min Jin Lee",
    rating: 5,
  },
  {
    id: "2",
    title: "Educated",
    author: "Tara Westover",
    rating: 4,
  },
  {
    id: "3",
    title: "Circe",
    author: "Madeline Miller",
    rating: 5,
  },
  {
    id: "4",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    rating: 4,
  },
];
