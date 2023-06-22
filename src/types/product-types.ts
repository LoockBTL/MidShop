export interface ProductInterface {
  id: string;
  title: string;
  price: string;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: CategoryInterface;
}

export interface CategoryInterface {
  id: string;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface CommentsInterface {
  postId: string;
  id: string | number;
  name: string;
  email?: string;
  body: string;
}
export interface ProductBasketInterface {
  id: string;
  title: string;
  price: number;
  images: string;
  count: number;
}

export interface SummaryOrder {
  name: string;
  adress: string;
  number: string;
  email: string;
  pay: string;
  delivary: string;
  basket: ProductBasketInterface[];
}
