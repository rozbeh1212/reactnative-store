class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id; // this is the id of the order  (this is the primary key)
    this.items = items; // this is the array of items in the order
    this.totalAmount = totalAmount; // this is the total amount of the order items
    this.date = date; // this is the date of the order items
  }
  get readableDate() {
    // return this.date.toLocaleDateString("en-US", { // this is the date of the order items in the order 
    //   year: "numeric", 
    //   month: "long",
    //   day: "numeric",
    //   hour: "2-digit",
    //   minume: "2-digit",
    // });
    return moment(this.date).format("MMMM Do YYYY, h:mm:ss a");
  }
}

export default Order;
