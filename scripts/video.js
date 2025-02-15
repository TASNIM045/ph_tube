function getTimeString(time) {
    let hour = parseInt(time/3600);
    let sec = parseInt(time%3600);
    let min = parseInt(sec/60);
    sec = sec%60;

    return `${hour} hours ${min} minute ${sec} secound ago`;
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons) {
        btn.classList.remove("active");
    }
}

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(response => response.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

const loadCategoriesVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(response => response.json())
        .then(data => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add("active");
            displayVideos(data.category)
        })
        .catch(error => console.log(error))
}

const loadDetails = async(videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const response = await fetch(url);
    const data = await response.json();
    displayDetails(data.video);
}

const displayDetails = (video) => {
    console.log(video);
}

const loadVideos = (searchText = "") => {
    fetch(`http://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    const cateforyContainer = document.getElementById('categories');
    categories.forEach(item => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id})" class="btn rounded-sm category-btn">${item.category}</button>
        `
        cateforyContainer.append(buttonContainer);
    })
}

const displayVideos = (videos) => {
    const videosContaienr = document.getElementById('videos');
    videosContaienr.innerHTML = "";
    if(videos.length==0) {
        videosContaienr.classList.remove('grid');
        videosContaienr.innerHTML = `
            <div class="min-h-[500px] flex flex-col justify-center items-center">
                <img src="images/Icon.png"/>
                <h3 class="font-bold text-4xl text-center my-3">Oops!! Sorry, There is no <br> content here</h3>
            </div>
        `;
        return;
    }
    else {
        videosContaienr.classList.add('grid');
    }
    videos.forEach(item => {
        const video = document.createElement('div');
        video.classList = 'card card-compact';
        video.innerHTML = `
        <figure class="relative h-[200px]">
        <img
          src=${item.thumbnail}
          class="h-full w-full object-cover rounded-xl"
          alt="Picture"/>
          ${item.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(item.others.posted_date)}</span>`}
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src="${item.authors[0].profile_picture}"/>
            </div>
            <div>
                <h2 class="font-bold">${item.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${item.authors[0].profile_name}</p>
                    ${item.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ''}
                </div>
            </div>
        </div>
        `
        videosContaienr.append(video);
    })
}

document.getElementById('search-input').addEventListener("keyup",(event)=>{
    loadVideos(event.target.value);
})

loadCategories();
loadVideos();