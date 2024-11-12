const formAddCattegory = document.querySelector("#categoryForm");

console.log(formAddCattegory)

formAddCattegory.addEventListener('submit', event => {

  event.preventDefault();;

  const newCategory = {
    name: document.getElementById('name').value,
    img: document.getElementById('img').value,
    price: parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value,
    category: document.getElementById('category').value
  };

  fetch('http://localhost:3000/addCategory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCategory) 
  })
  .then(response => response.json())
  .then(data => {
    getProducts()
    if (data.success) {

        alert('Category added successfully!');

        document.getElementById('categoryForm').reset();
      } else {
        alert('Error adding category!');
      }
    }

    )
    .catch(error => alert('Error adding category!'));

})

