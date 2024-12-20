

async function loadProducts() {
    try {
      const products = JSON.parse(localStorage.getItem('data'));
      
      const container = document.getElementById('product-listing');
      
      products.forEach(product => {
        
        const card = document.createElement('div');
        card.className = "flex flex-col md:flex-row justify-center items-center gap-4 p-4";
        
        card.innerHTML = `
        <div class="bg-white shadow-lg rounded-lg p-4 w-80 relative">
        <!-- Favorite Icon -->
        <button class="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition duration-300 m-2">
            <i class="fas fa-heart"><img src="/frontend/src/assets/images/icons/favorite.png" alt=""></i>
        </button>
        <!-- Product Image -->
        <img src="../../assets/images/${product.img}" alt="${product.name}" class="rounded-lg w-full h-40 object-cover">
        <!-- Product Info -->
        <div class="mt-4">
            <h2 class="text-lg font-semibold">${product.name}</h2>
            <p class="text-gray-600 mt-1">$${product.price}</p>
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
        
  
        
      });
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadProducts());
