export const cart = [];

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingItem = cartItem;
    }
  });

  const qtySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
  const qty = Number(qtySelectorElement.value);

  if (matchingItem) {
    matchingItem.id += qty;
  } else {
    cart.push({ productId, quantity: qty });
  } 
}