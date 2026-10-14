// DATA PRODUK
const products = [
    {
        id: 1,
        name: "Risol Mayo Original",
        price: 3000
    },
    {
        id: 2,
        name: "Risol Mayo Keju",
        price: 3500
    },
    {
        id: 3,
        name: "Risol Mayo Spesial",
        price: 4000
    }
];

// DATA KERANJANG
let cart = [];

// FORMAT RUPIAH
function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

// TOMBOL TAMBAH KE KERANJANG
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
        const id = Number(this.dataset.id);
        const product = products.find(item => item.id === id);

        if (!product) return;

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        renderCart();
    });
});

// MENAMPILKAN KERANJANG
function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">Keranjang masih kosong.</p>';
    }

    let total = 0;
    let jumlah = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;

        total += subtotal;
        jumlah += item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        const name = document.createElement("span");
        name.textContent =
            `${item.name} x ${item.quantity}`;

        const price = document.createElement("strong");
        price.textContent = formatRupiah(subtotal);

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Hapus";

        removeButton.addEventListener("click", () => {
            cart = cart.filter(product => product.id !== item.id);
            renderCart();
        });

        div.append(name, price, removeButton);
        cartItems.appendChild(div);
    });

    cartCount.textContent = jumlah;
    cartTotal.textContent = formatRupiah(total);
}

// PESAN VIA WHATSAPP
document.getElementById("checkout-btn")
    .addEventListener("click", function () {

        const nama = document.getElementById("customer-name")
            .value.trim();

        const alamat = document.getElementById("customer-address")
            .value.trim();

        if (cart.length === 0) {
            alert("Keranjang kamu masih kosong!");
            return;
        }

        if (!nama || !alamat) {
            alert("Silakan isi nama dan alamat pengiriman!");
            return;
        }

        let total = 0;

        let pesan = "Halo Risolicious, saya ingin memesan:\n\n";
        pesan += "Nama: " + nama + "\n";
        pesan += "Alamat: " + alamat + "\n\n";
        pesan += "Detail pesanan:\n";

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            pesan +=
                `- ${item.name} x ${item.quantity} = ${formatRupiah(subtotal)}\n`;
        });

        pesan += "\nTotal pembayaran: " + formatRupiah(total);
        pesan += "\n\nMohon konfirmasi pesanan saya. Terima kasih.";

        // GANTI DENGAN NOMOR WHATSAPP PENJUAL
        const nomorWhatsApp = "6281234567890";

        const url =
            "https://wa.me/" + nomorWhatsApp +
            "?text=" + encodeURIComponent(pesan);

        window.open(url, "_blank");
    });
