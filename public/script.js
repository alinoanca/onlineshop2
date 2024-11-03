document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartLink = document.querySelector('.cart-link');
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const checkoutForm = document.getElementById('checkout-form');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.dataset.name;
            const productPrice = parseFloat(productElement.dataset.price);
            const productImage = productElement.querySelector('.product-image').src;

            const item = { id: productId, name: productName, price: productPrice, image: productImage };
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} added to cart`);
        });
    });

    if (cartItemsElement) {
        renderCartItems();
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(`Order placed! Items will be shipped to ${checkoutForm.address.value}`);
            localStorage.removeItem('cart');
            window.location.href = '/';
        });
    }

    function renderCartItems() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <p>${item.name} - $${item.price.toFixed(2)}</p>
            `;
            cartItemsElement.appendChild(div);
            total += item.price;
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
});
