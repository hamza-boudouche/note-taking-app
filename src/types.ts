export interface Category {
  title: string;
  subject: string;
}

export interface Note {
  id: number;
  category: Category;
  title: string;
  body?: string;
  date: Date;
}
