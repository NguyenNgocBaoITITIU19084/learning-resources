// Strategy Interface
class DiscountStrategy {
  calculateDiscount(totalOrder) {
    // To be implemented by concrete strategy
  }
}

/*
Concrete Strategies: These are the individual implementations of the Strategy Interface.
 They encapsulate specific algorithmic behaviors.
*/
class NoDiscount extends DiscountStrategy {
  calculateDiscount(totalOrder) {
    return 0;
  }
}

class TenPercentDiscount extends DiscountStrategy {
  calculateDiscount(totalOrder) {
    return totalOrder * 0.1;
  }
}

class TwentyPercentDiscount extends DiscountStrategy {
  calculateDiscount(totalOrder) {
    return totalOrder * 0.2;
  }
}

/*
Context: This is the class or component that uses the Strategy.
 It maintains a reference to a Strategy object and can switch between different strategies at runtime.
*/

class ShoppingCart {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
    this.item = [];
  }

  addItem(item) {
    this.item.push(item);
  }

  calculateTotal() {
    const totalOrder = this.item.reduce((total, item) => total + item.price, 0);
    return totalOrder - this.discountStrategy.calculateDiscount(totalOrder);
  }
}

// Main for testing
const noDiscount = new NoDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const twentyPercentDiscount = new TwentyPercentDiscount();

const cart1 = new ShoppingCart(noDiscount);
cart1.addItem({ name: "Item 1", price: 50 });
console.log("Cart 1 Total:", cart1.calculateTotal());

const cart2 = new ShoppingCart(tenPercentDiscount);
cart2.addItem({ name: "Item 1", price: 50 });
console.log("Cart 2 Total:", cart2.calculateTotal());

const cart3 = new ShoppingCart(twentyPercentDiscount);
cart3.addItem({ name: "Item 1", price: 50 });
console.log("Cart 3 Total:", cart3.calculateTotal());
