const api = "https://fakestoreapi.com/products";
const productContainer = document.getElementById("productContainer");
const loader = document.getElementById("loader");
const searchInput = document.getElementById("searchInput");
const selectType = document.getElementById("selectType");
const selectByPrice = document.getElementById("selectByPrice");

async function fetchApi() {
    try {
        loader.style.display = "block";
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        render(data);
        searchInput.addEventListener("input", () => search(data));
        selectType.addEventListener("change", () => filterByType(data));
        selectByPrice.addEventListener("change", () => filterByPrice(data));
    } catch (error) {
        console.error("Xatolik:", error);
    } finally {
        loader.style.display = "none";
    }
}

function render(data) {
    productContainer.innerHTML = "";
    data.forEach((product) => {
        const { image, title, price, category, description, id } = product;
        const productItem = document.createElement("div");
        productItem.classList.add("productCard");
        productItem.innerHTML = `
            <p class="id">${id}</p>
            <img class="img" src="${image}" alt="${title}">
            <h3>${title}</h3>   
            <p>${description.slice(0, 50)}...</p>
            <p>Price: ${price}$</p>
            <p>Category: ${category}</p>
        `;
        productContainer.appendChild(productItem);
    });
}

function search(data) {
    const searchValue = searchInput.value.toLowerCase();
    const filteredData = data.filter(product => 
        product.title.toLowerCase().includes(searchValue)
    );
    render(filteredData);
}

function filterByType(data) {
    const selectedType = selectType.value;
    const filteredData = selectedType === "all" 
        ? data 
        : data.filter(product => product.category === selectedType);
    render(filteredData);
}

function filterByPrice(data) {
    const selectedPrice = selectByPrice.value;
    let filteredData = data;
    if (selectedPrice === "from") {
        filteredData = data.sort((a, b) => a.price - b.price);
    } else if (selectedPrice === "to") {
        filteredData = data.sort((a, b) => b.price - a.price);
    }
    render(filteredData);
}

fetchApi();