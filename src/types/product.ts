export interface Product {
  id: number;
  name: string;
  category: 'Niños' | 'Adolescentes' | 'Adultos';
  target: string;
  ageGroup: string;
  duration: string;
  modality: string;
  price: number;
  description: string;
  features: string[];
  image: string;
}
