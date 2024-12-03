class Product {
  constructor(
    public id: string,
    public name: string,
    public price: string,
    public description: string,
    public category: string,
    public image: string
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.category = category;
    this.image = image;
  }

}

export default Product;
