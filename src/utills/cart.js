export function getCart() {
  let cart = localStorage.getItem("cart");

  if (cart == null) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  }

  const cartInJson = JSON.parse(cart);

  return cartInJson;
}

export function addToCart(product, qty) {
  const cart = getCart();

  const productIndex = cart.findIndex(
    (item) => item.productId == product.productId
  );
  if (productIndex == -1) {
    const newProduct = {
      productId: product.productId,
      name: product.name,
      altNames: product.altNames,
      price: product.price,
      image: product.images[0],
      labelPrice: product.labelPrice,
      quantity: qty,
    };

    cart.push(newProduct);
  } else {
    cart[productIndex].quantity += qty;
    if (cart[productIndex].quantity <= 0) {
      cart.splice(productIndex, 1);
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export function removeFromCart(productId) {
  const cart = getCart();
  const productIndex = cart.findIndex(
    (product) => product.productId == productId
  );
  if (productIndex != -1) {
    cart.splice(productIndex, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export function getTotal() {
  let cart = getCart();
  let total = 0;

  cart.forEach((item) => {
    total += item.quantity * item.price;
  });
  return total;
}

export function getTotalForLabelPrice(){
  let cart = getCart();
  let totalForLabelPrice = 0;

  cart.forEach((item) => {
    totalForLabelPrice += item.quantity * item.labelPrice;
  });
  return totalForLabelPrice;
}

