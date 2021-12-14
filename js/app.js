
// Data fetch
  const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
 
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    console.log(product)
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 style=" height:150px; width:250px  ">${product.title}</h3>
      <p style=" font-weight: bold; text-align: center;   " >Category: ${product.category}</p>
      <p style=" font-weight: bold; text-align: left; padding-left:50px; "> User: <i style="color:red;" class="fa fa-user" aria-hidden="true"></i> ${product.rating.count}</p>
      <p style=" font-weight: bold; text-align: center; " >Product-rating-Rate: <i style="color:green;" class="fa fa-star" aria-hidden="true"></i> ${product.rating.rate}</p>

      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// Calculation
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = (convertedOldPrice + convertPrice).toFixed(2
    );
  document.getElementById(id).innerText = parseFloat(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  console.log(priceConverted)
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    const tax =parseFloat(priceConverted * 0.2).toFixed(2)
    //console.log(tax) 
    setInnerText("total-tax", tax);
    
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    
    setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax",parseFloat(priceConverted * 0.4).toFixed(2) );
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
