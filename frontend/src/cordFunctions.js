function addToCard(id) {
    let parentData = JSON.parse(localStorage.getItem("card"));
    parentData.push(id)
    localStorage.setItem("card", JSON.stringify(parentData));
    console.log(parentData)
}