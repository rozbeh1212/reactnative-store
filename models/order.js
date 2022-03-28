class Order  {
    constructor(id, items, totalAmount, date) {
        this.id = id; // this is the id of the order  (this is the primary key)
        this.items = items; // this is the array of items in the order 
        this.totalAmount = totalAmount; // this is the total amount of the order items 
        this.date = date; // this is the date of the order items 
    }
    
    }



export default Order;