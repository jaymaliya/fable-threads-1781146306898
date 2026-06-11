export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tag?: string;
}

export const PRODUCTS: Product[] = [
  {
    "id": "p1",
    "name": "Daydreamer Tee",
    "price": 400,
    "description": "Cream oversized drop with a hand-drawn forest scene screen-printed in forest green. The back says what most people only think.",
    "image": "/product-1.jpg",
    "tag": "Fan Favourite"
  },
  {
    "id": "p2",
    "name": "Midnight Drive Tee",
    "price": 100,
    "description": "Washed black with a full-back photographic cityscape print. The sedan, the rain, the glow — you know the feeling.",
    "image": "/product-2.jpg",
    "tag": ""
  },
  {
    "id": "p3",
    "name": "Grow Through Tee",
    "price": 200,
    "description": "White oversized with a botanical line-art daisy arching under the words you needed to read this week.",
    "image": "/product-3.jpg",
    "tag": ""
  },
  {
    "id": "p4",
    "name": "Own Path Tee",
    "price": 300,
    "description": "Navy with a small left-chest block-type print. Says everything. From ten feet away, it says nothing. That's the point.",
    "image": "/product-4.jpg",
    "tag": "New Drop"
  }
];

export const formatINR = (n: number) => "₹" + n.toLocaleString("en-IN");
