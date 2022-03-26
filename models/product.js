// class of product
export class Product { 
  constructor(id,ownerId, title, imageUrl, description,price ) {
    this.id = id; // unique id for each product
    this.ownerId = ownerId; // unique id for each user
    this.title = title; // title of the product
    this.imageUrl = imageUrl; // image url of the product
    this.description = description; // description of the product
    this.price = price; // price of the product
 }
}

export default Product;