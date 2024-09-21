const products = [
    { id: 1, name: "Laptop", price: 10200, img: "./images/image copy 2.png" },
    { id: 2, name: "SmartPhone", price: 12000, img: "./images/image copy.png" },
    { id: 3, name: "BlueTooth", price: 1200, img: "./images/image.png" }
];

let cart = [];

// Search for a product by name or ID
function searchProduct() {
    const searchQuery = document.getElementById("search-input").value.toLowerCase();
    const product = products.find(p => p.name.toLowerCase() === searchQuery || p.id.toString() === searchQuery);
    const result = document.getElementById("search-result");
    result.innerHTML = '';

    if (product) {
        result.innerHTML = `
            <div class="product" id="${product.id}">
                <h3>${product.name}</h3>
                <img src="${product.img}" alt="${product.name}" class="product-img" onclick="showProductDetails(${product.id})"/>
                <p>Price: $${product.price}</p>
                <button onclick="addCart(${product.id})">Add to Cart</button>
            </div>
        `;
    } else {
        result.innerHTML = "<p>No Product Found</p>";
    }
}

// Add product to the cart
function addCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProduct = cart.find(item => item.id === productId);
    
    if (!existingProduct) {
        cart.push({ ...product });
    }
    updateCart();
}

// Remove product from the cart
function removeCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update the cart display
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item" id="${item.id}">
                <h4>${item.name}</h4>
                <p>Price: $${item.price}</p>
                <button onclick="removeCart(${item.id})">Remove</button>
            </div>
        `;
    });

    totalPrice.textContent = total;
}

// Show product details in a modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.img;
    document.getElementById('product-price').textContent = `Price: $${product.price}`;
    document.getElementById('product-description').textContent = `Description: A high-quality ${product.name}`;

    document.getElementById('add-to-cart-details').onclick = function() {
        addCart(productId);
        closeProductDetails(); // Close modal after adding to cart
    };

    // Display modal
    document.getElementById('product-details-modal').style.display = 'block';
}

// Close product details modal
function closeProductDetails() {
    document.getElementById('product-details-modal').style.display = 'none';
}
