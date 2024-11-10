async function addToCard(itemId) {
    let itemChose ;
    const products = JSON.parse(localStorage.getItem('data'));
    itemChose = products.filter(item => {
        return item.id === itemId
    })
    let parentData = JSON.parse(localStorage.getItem('card'));
    parentData.push(itemChose[0]);
    localStorage.setItem("card", JSON.stringify(parentData));
}

document.addEventListener('DOMContentLoaded', () => {
    let parentData = JSON.parse(localStorage.getItem('card'));
    let containerBasket = document.getElementById('containerBasket')
    let fatherContainer = document.getElementById('fatherContainer')
    const divCard = document.createElement('div');

    divCard.innerHTML = `
    <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">${parentData.length} Items</h2>
        </div>
    `
    fatherContainer.appendChild(divCard)

    parentData.forEach(product => {

        const card = document.createElement('div');

        card.innerHTML = `
          <div class="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-50">
            <div class="md:w-4/12 2xl:w-1/4 w-full">
              <img src="../images/${product.img}" alt="Black Leather Purse"
                class="h-full object-center object-cover md:block hidden" />
              <img src="https://i.ibb.co/TTnzMTf/Rectangle-21.png" alt="Black Leather Purse"
                class="md:hidden w-full h-full object-center object-cover" />
            </div>
            <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
              <p class="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
              <div class="flex items-center justify-between w-full">
                <p class="text-base font-black leading-none text-gray-800"> ${product.name} </p>
                <select aria-label="Select quantity" class="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <p class="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
              <p class="text-xs leading-3 text-gray-600 py-4">Color: Black</p>
              <p class="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p>
              <div class="flex items-center justify-between pt-5">
                <div class="flex itemms-center">
                  <p class="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                  <p class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">Remove</p>
                </div>
                <p class="text-base font-black leading-none text-gray-800">$ ${product.price}</p>
              </div>
            </div>
          </div>
        `
        containerBasket.appendChild(card)

        
    });

})