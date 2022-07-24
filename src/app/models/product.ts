export class Product {
  id!: string;
  name!: string;
  productType!: string;
  images!: Map<string, string>;
  attributes!: Map<string, string>;
  prices!: Map<string, number>;

  constructor() { }
}
