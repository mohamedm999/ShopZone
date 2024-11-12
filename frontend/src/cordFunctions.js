let caseO = [];
if(!localStorage.getItem('card')){
  localStorage.setItem('card', JSON.stringify(caseO));
}

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

let containerBasket = document.getElementById('containerBasket')
let fatherContainer = document.getElementById('fatherContainer')
let spanBasket = document.getElementById('spanBasket')

document.addEventListener('DOMContentLoaded', () => {
    let parentData = JSON.parse(localStorage.getItem('card'));
    console.log(parentData)
    let containerBasket = document.getElementById('containerBasket')
    let fatherContainer = document.getElementById('fatherContainer')
    const divCard = document.createElement('div');
    let numCard = parentData.length
    spanBasket.textContent = numCard 


    divCard.innerHTML = `
    <div class="flex justify-between border-b pb-8">
          <h1 class="font-semibold text-2xl">Shopping Cart</h1>
          <h2 class="font-semibold text-2xl">${numCard} Items</h2>
        </div>
    `
    fatherContainer.appendChild(divCard)

    parentData.forEach(product => {

        const card = document.createElement('div');

        card.innerHTML = `

<div class="md:flex items-stretch py-8 md:py-10 lg:py-8 border-t border-gray-50">
  <div class="md:w-4/12 2xl:w-1/4 w-full">
    <img src="../images/${product.img}" alt="Black Leather Purse"
      class="h-full object-center object-cover md:block hidden fixed-size-image" />
    <img src="https://i.ibb.co/TTnzMTf/Rectangle-21.png" alt="Black Leather Purse"
      class="md:hidden w-full h-full object-center object-cover fixed-size-image" />
  </div>
  <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
   
    <div class="flex items-center justify-between w-full">
      <p class="text-base font-black leading-none text-gray-800">${product.name}</p>
      <select aria-label="Select quantity" class="py-2 px-1 border border-gray-200 mr-6 focus:outline-none" onclick="myFunction(${product.price}, ${product.id})" id="totalPrice${product.id}">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        <option>7</option>
        <option>8</option>
        <option>9</option>
        <option>10</option>
      </select>
    </div>

    <div class="flex items-center justify-between pt-5">
      <div class="flex items-center">
        <button class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onclick="removeProduct(${product.id})">Remove</button>
      </div>
      <p class="text-base font-black leading-none text-gray-800" id="affitotal${product.id}">${product.price} $</p>
    </div>
  </div>
</div>

        `
        containerBasket.appendChild(card)

        
    });

})
function myFunction(price,id) {
  let quantity = document.getElementById("totalPrice"+ id).value;
  let itemTotal = price * quantity;
  document.getElementById("affitotal"+id).innerHTML = itemTotal + " $";
  updateTotalCost();
}

function updateTotalCost() {
  let parentData = JSON.parse(localStorage.getItem('card'));
  let totalCost = 0;

  parentData.forEach(product => {
    let quantity = document.getElementById("totalPrice" + product.id).value;
    totalCost += product.price *quantity;
  });

  document.getElementById("sumTotalCost").innerHTML = totalCost + " $";
}

document.addEventListener('DOMContentLoaded', () => {
  updateTotalCost();
});
