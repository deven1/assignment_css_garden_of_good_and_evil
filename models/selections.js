class Selection {
  constructor(id, rb_selection) {
    this.id = id;
    this.rb_selection = rb_selection;
    //this.price = price;
  }
}

let id = 0;

const allSelections = [
  new Selection(id++, "Good or Evil", 30),
  // new Product(id++, "Medium Cookie", 25),
  // new Product(id++, "Small Cookie", 15),
  // new Product(id++, "Nano Cookie", 5),
  // new Product(id++, "Pico Cookie", 1)
];

const findProduct = id => {
  return allProducts.find(product => product.id === parseInt(id));
};

module.exports = {
  allProducts,
  findProduct
};
