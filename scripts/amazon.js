
let productsHTML = "";
products.forEach(product => {
  const html = `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  productsHTML += html;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

const previousTimeouts = new Map();

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Add to Cart");
    // retrieve data-* html attributes
    // kebab-case to camelCase
    const { productId: id } = button.dataset;
    let matchingItem;

    cart.forEach((item) => {
      if (item.id === id) {
        matchingItem = item;
      }
    });

    const qtySelectorElement = document.querySelector(`.js-quantity-selector-${id}`);
    const qty = Number(qtySelectorElement.value);

    if (matchingItem) {
      matchingItem.quantity += qty;
    } else {
      cart.push({ id, quantity: qty });
    } 

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    addedToCartElement = document.querySelector(`.js-added-to-cart-${id}`)
    addedToCartElement.classList.add("added-to-cart-visible");

    // Cancel the timeout if the user clicks on the "Add to Cart" button again
    const oldTimeoutId = previousTimeouts.get(id);
    if (oldTimeoutId) {
      clearTimeout(oldTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedToCartElement.classList.remove("added-to-cart-visible");
    }, 2000);
    previousTimeouts.set(id, timeoutId);
  });
});