const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    const cateforyContainer = document.getElementById('categories');
    categories.forEach(item => {
        const button = document.createElement('button');
        button.classList = 'btn rounded-sm';
        button.innerText = item.category;

        cateforyContainer.append(button);
    })
}

loadCategories();