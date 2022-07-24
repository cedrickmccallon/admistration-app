export class Product {
  id: string;
  name: string;
  productType: string;
  images: Map<string, string>[];
  attributes: Map<string, string>[];
  prices: Map<string, number>[];

  constructor(id: string, name: string, productType: string, attributes: Map<string, string>[],
              images: Map<string, string>[], prices: Map<string, number>[]) {
    this.id = id;
    this.name = name;
    this.productType = productType;
    this.attributes = attributes;
    this.images = images;
    this.prices = prices;
  }
}
