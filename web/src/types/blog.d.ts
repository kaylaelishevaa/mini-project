export interface AllEvent {
  ok: boolean;
  data: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    categories: string[];
    createdAt: Date;
    updatedAt: Date;
    slug: string;
  }[];
}

export interface AllCategories {
  ok: boolean;
  data: {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
