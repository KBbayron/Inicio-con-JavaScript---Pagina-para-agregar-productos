class Product {
    constructor(name, price, cnt) {
        this.name = name;
        this.price = price;
        this.cnt = cnt;
        this.sub = cnt * price;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('table-bill');
        const element = document.createElement('tr');
        element.innerHTML = `
            <td>${product.name}</td>
            <td>${parseFloat(product.price).toFixed(2)}</td>
            <td>${product.cnt}</td>
            <td>${parseFloat(product.sub).toFixed(2)}</td>
        `;
        productList.appendChild(element);
    }
    

    updateTotals(subtotal, iva, total) {
        document.getElementById('subtotal').value = subtotal.toFixed(2);
        document.getElementById('iva').value = iva.toFixed(2);
        document.getElementById('total').value = total.toFixed(2);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }
}

let subtotal = 0.00;
const ivaRate = 0.13;

document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const cnt = parseInt(document.getElementById('cnt').value);
    const sub = cnt * price;

    const product = new Product(name, price, cnt, sub);

    const ui = new UI();

    if (name === '' || isNaN(price) || isNaN(cnt)) {
        return ui.showMessage('Llena los tres campos', 'info');
    }

    subtotal += sub;
    const iva = subtotal * ivaRate;
    const total = subtotal + iva;

    ui.addProduct(product);
    ui.resetForm();
    ui.updateTotals(subtotal, iva, total);
});
