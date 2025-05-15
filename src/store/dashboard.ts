import { create } from 'zustand';

import apis from '@/apis';

interface Book {
  id: number;
  title: string;
  price: number;
  poster: string;
  author: string;
}

interface DashboardStore {
  loading: boolean;
  books: Book[];
  fetchBooks: () => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  loading: false,
  books: [],
  setBooks: (books: Book[]) => set({ books }),
  fetchBooks: async () => {
    set({ loading: true });
    const { books } = await apis.dashboard.getBooks();
    set({ books, loading: false });
  },
}));
