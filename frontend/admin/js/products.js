// ==============================
// ADMIN PRODUCT MANAGEMENT
// ==============================

document.addEventListener("DOMContentLoaded", function () {

    const addProductBtn = document.getElementById("addProductBtn");
    const productModal = document.getElementById("productModal");
    const closeModal = document.getElementById("closeModal");
    const productForm = document.getElementById("productForm");
    const productTable = document.getElementById("productTable");
    const searchProduct = document.getElementById("searchProduct");

    let products = JSON.parse(localStorage.getItem("adminProducts")) || [];

    let editProductId = null;


    // ==============================
    // OPEN ADD PRODUCT
    // ==============================

    addProductBtn.addEventListener("click", function () {

        editProductId = null;

        productForm.reset();

        document.querySelector("#productModal h2").textContent =
            "Add Product";

        productModal.style.display = "block";

    });


    // ==============================
    // CLOSE MODAL
    // ==============================

    closeModal.addEventListener("click", function () {

        productModal.style.display = "none";

    });


    // ==============================
    // CLOSE WHEN CLICK OUTSIDE
    // ==============================

    window.addEventListener("click", function (event) {

        if (event.target === productModal) {

            productModal.style.display = "none";

        }

    });


    // ==============================
    // ADD / EDIT PRODUCT
    // ==============================

    productForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const category =
            document.getElementById("category").value.trim();

        const price =
            Number(document.getElementById("price").value);

        const stock =
            Number(document.getElementById("stock").value);

        const description =
            document.getElementById("description").value.trim();

        const imageInput =
            document.getElementById("image");


        // ==============================
        // VALIDATION
        // ==============================

        if (!name || !category || price <= 0 || stock < 0) {

            alert("Please enter valid product details.");

            return;

        }


        // ==============================
        // IMAGE
        // ==============================

        let image = "";

        if (imageInput.files.length > 0) {

            image = URL.createObjectURL(
                imageInput.files[0]
            );

        }


        // ==============================
        // EDIT PRODUCT
        // ==============================

        if (editProductId !== null) {

            const index = products.findIndex(
                product => product.id === editProductId
            );

            if (index !== -1) {

                products[index].name = name;
                products[index].category = category;
                products[index].price = price;
                products[index].stock = stock;
                products[index].description = description;

                // Only replace image if a new image was selected
                if (image) {
                    products[index].image = image;
                }

            }

            alert("Product updated successfully!");

        }


        // ==============================
        // ADD NEW PRODUCT
        // ==============================

        else {

            const newProduct = {

                id: Date.now(),

                name: name,

                category: category,

                price: price,

                stock: stock,

                description: description,

                image: image

            };

            products.push(newProduct);

            alert("Product added successfully!");

        }


        // ==============================
        // SAVE
        // ==============================

        localStorage.setItem(
            "adminProducts",
            JSON.stringify(products)
        );


        // ==============================
        // CLOSE
        // ==============================

        productModal.style.display = "none";

        productForm.reset();

        editProductId = null;


        // ==============================
        // DISPLAY
        // ==============================

        displayProducts(products);

    });


    // ==============================
    // DISPLAY PRODUCTS
    // ==============================

    function displayProducts(productList) {

        // IMPORTANT:
        // Clear old rows first
        productTable.innerHTML = "";


        if (productList.length === 0) {

            productTable.innerHTML = `
                <tr>
                    <td colspan="7">
                        No products found
                    </td>
                </tr>
            `;

            return;

        }


        productList.forEach(function (product) {

            productTable.innerHTML += `

                <tr>

                    <td>
                        ${product.id}
                    </td>

                    <td>

                        ${
                            product.image
                            ?
                            `<img
                                src="${product.image}"
                                width="60"
                                height="60"
                                style="object-fit:cover;"
                            >`
                            :
                            "No Image"
                        }

                    </td>

                    <td>
                        ${product.name}
                    </td>

                    <td>
                        ${product.category}
                    </td>

                    <td>
                        ₹${product.price.toLocaleString("en-IN")}
                    </td>

                    <td>
                        ${product.stock}
                    </td>

                    <td>

                        <button
                            class="edit-btn"
                            onclick="editProduct(${product.id})"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteProduct(${product.id})"
                        >
                            🗑️ Delete
                        </button>

                    </td>

                </tr>

            `;

        });

    }


    // ==============================
    // EDIT PRODUCT
    // ==============================

    window.editProduct = function (id) {

        const product = products.find(
            product => product.id === id
        );

        if (!product) {

            alert("Product not found!");

            return;

        }


        editProductId = id;


        document.getElementById("name").value =
            product.name;

        document.getElementById("category").value =
            product.category;

        document.getElementById("price").value =
            product.price;

        document.getElementById("stock").value =
            product.stock;

        document.getElementById("description").value =
            product.description;


        document.querySelector("#productModal h2").textContent =
            "Edit Product";


        productModal.style.display = "block";

    };


    // ==============================
    // DELETE PRODUCT
    // ==============================

    window.deleteProduct = function (id) {

        const confirmDelete = confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }


        products = products.filter(
            product => product.id !== id
        );


        localStorage.setItem(
            "adminProducts",
            JSON.stringify(products)
        );


        displayProducts(products);


        alert("Product deleted successfully!");

    };


    // ==============================
    // SEARCH PRODUCT
    // ==============================

    searchProduct.addEventListener("input", function () {

        const searchText =
            this.value.toLowerCase().trim();


        const filteredProducts = products.filter(
            product =>

                product.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchText)
        );


        displayProducts(filteredProducts);

    });


    // ==============================
    // INITIAL LOAD
    // ==============================

    displayProducts(products);

});