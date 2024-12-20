async function getProducts() {
    const dataProduct = [];
    try {
        const res = await fetch('http://localhost:3000/get-products');
        if (!res.ok) {
            console.log('error connect network');
            return dataProduct;
        }
        const data = await res.json();
        data.map(item => dataProduct.push(item));

       
        localStorage.setItem('data', JSON.stringify([]))
        localStorage.setItem('data', JSON.stringify(dataProduct))
      
       
    } catch (error) {
        console.log('Error fetching data:', error);
    }
    return dataProduct;
}
setTimeout(getProducts(), 500)



function adjustImageURL(img) {
    const currentPath = window.location.pathname;
    let basePath = '';

    if (currentPath.includes('index.html')) {
        basePath = '../src/assets/images/';
    } else if (currentPath.includes('productList.html')) {
        basePath = '../images/';
    } else {
        basePath = './img/';
    }
    return `${basePath}${img}`;
}



async function loadProducts() {
    try {
        const products = JSON.parse(localStorage.getItem('data'));

        const container = document.getElementById('product-container');

        products.forEach(product => {
            let URLimage = adjustImageURL(product.img)
            if (product.newCollection) {

                const card = document.createElement('div');
                card.className = "flex flex-col md:flex-row justify-center items-center gap-4 p-4";

                card.innerHTML = `
        <div class="bg-white shadow-lg rounded-lg p-4 w-80 relative">
        <!-- Favorite Icon -->
        <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition duration-300 m-2">
            <i class="fas fa-heart"><img src="/frontend/src/assets/images/icons/favorite.png" alt=""></i>
        </button>
        <!-- Product Image -->
        <img src="${URLimage}" alt="${product.name}" class="rounded-lg w-full h-40 object-cover">
        <!-- Product Info -->
        <div class="mt-4">
            <h2 class="text-lg font-semibold">${product.name}</h2>
            <p class="text-gray-600 mt-1">$${product.price} ${URLimage}</p>
        </div>
        <!-- Add to Cart Button with Icon, Positioned to the Right -->
        <div class="mt-4 flex justify-end">
            <button class="flex items-center space-x-2 bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300 text-sm ">
                <i class="fas fa-shopping-cart w-5"><img src="/frontend/src/assets/images/icons/shopping-bag.png" alt=""></i>
                <span>Add</span>
            </button>
        </div>
        </div>
        `;

                container.appendChild(card);
            }


        });
    } catch (error) {
        console.error("Failed to load products:", error);
    }
}


async function getProductsList() {
    if (localStorage.getItem('chosenData')) {
        var products = JSON.parse(localStorage.getItem('chosenData'));
    }else{
        var products = JSON.parse(localStorage.getItem('data'));
    }

    const container = document.getElementById('product-container-filter');
    container.innerHTML = ''


    products.forEach(product => {
        let URLimage = adjustImageURL(product.img)

        const card = document.createElement('div');
        card.className = "flex flex-col md:flex-row justify-center items-center gap-4 p-4";

        card.innerHTML = `
        <div class="bg-white shadow-lg rounded-lg p-4 w-80 relative">
        <!-- Favorite Icon -->
        <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition duration-300 m-2">
            <i class="fas fa-heart"><img src="/frontend/src/assets/images/icons/favorite.png" alt=""></i>
        </button>
        <!-- Product Image -->
        <img src="${URLimage}" alt="${product.name}" class="rounded-lg w-full h-40 object-cover">
        <!-- Product Info -->
        <div class="mt-4">
            <h2 class="text-lg font-semibold">${product.name}</h2>
            <p class="text-gray-600 mt-1">$${product.price}</p>
        </div>
        <!-- Add to Cart Button with Icon, Positioned to the Right -->
        <div class="mt-4 flex justify-end ">
            <button class="flex items-center space-x-2 bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300 text-sm " onclick="addToCard(${product.id})" >
                <i class="fas fa-shopping-cart w-5"><img src="/frontend/src/assets/images/icons/shopping-bag.png" alt=""></i>
                <span>Add</span>
            </button>
        </div>
        </div>
        `;

        container.appendChild(card);

    })
}

function filterCategories() {
    const products = JSON.parse(localStorage.getItem('data'));
    let uniqueCategories = []

    products.map(item => {
        let isExist = uniqueCategories.includes(item.category)
        if (!isExist) {
            uniqueCategories.push(item.category)
        }
    })
    return uniqueCategories;
}

function appendSelects() {
    const uniqueCategories = filterCategories()
    const select = document.getElementById('optionsCategoris')

    uniqueCategories.map(item => {
        const option = document.createElement('option')
        option.textContent = item
        option.setAttribute('value', item)
        select.appendChild(option)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const products = JSON.parse(localStorage.getItem('data'));
    const select = document.getElementById('optionsCategoris')
    const selectPrice = document.getElementById('optionsPrice')
    
    select.addEventListener( 'change' , () => {
        const carrentChose = select.value
        let chosenArray = products.filter(item => item.category === carrentChose )
        console.log(chosenArray)
        localStorage.setItem('chosenData', JSON.stringify(chosenArray))
        getProductsList()
    })

    selectPrice.addEventListener('change', function() {
        const selectedPrice = this.value;
        const productsDataSelected = JSON.parse(localStorage.getItem('chosenData'));

        if(selectedPrice === 'Ascending'){
            productsDataSelected.sort((a, b) => a.price - b.price);
            localStorage.setItem('chosenData', JSON.stringify(productsDataSelected))
        }else{
            productsDataSelected.sort((a, b) => b.price - a.price);
            localStorage.setItem('chosenData', JSON.stringify(productsDataSelected))
        }
        getProductsList()
    });
    
})



document.addEventListener('DOMContentLoaded', loadProducts);
document.addEventListener('DOMContentLoaded', getProductsList);
document.addEventListener('DOMContentLoaded', appendSelects);



