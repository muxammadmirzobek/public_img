// // Elements from document
// const searchForm = document.querySelector(".main__form");
// const searchInput = document.querySelector(".searchInput");
// const photoWrapper = document.querySelector(".photo__wrapper");
// // unsplash data
// const API = "https://api.unsplash.com";
// const version = "Accept-Version: v1";
// const auth = "Authorization: Client-ID YOUR_ACCESS_KEY";
// const x = "https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY";
// const ACCESSKEY = "2FNq_PiqOdncogEEoBJ819usLlnrMKUGcDr_VfIR8pc";

// searchForm.addEventListener(`submit`, (e) => {
//     e.preventDefault();

//     const query = searchInput.value;

//     getPhotos(query).then(displayPhotos);
// });

// async function getPhotos(query) {
//     const response = await fetch(`${API}/search/photos?page=1&query=${query}`, {
//         method: "get",
//         headers: {
//             "Accept-Version": "v1",
//             Authorization: `Client-ID ${ACCESSKEY}`,
//         },
//     });

//     if (!response.ok) {
//         console.error("Error:qandaydir hatolik yuz berdi");
//         return null;
//     }

//     const data = await response.json();

//     console.log(data.results);
//     return data.results;
// }

// function displayPhotos(photos) {
//     photoWrapper.innerHTML = "";
//     photos.forEach((photo) => {
//         console.log(photo);
//         const imgContainer = document.createElement("div");

//         imgContainer.innerHTML = `
//         <img src="${photo.urls.small}"
//         alt= "${photo.alt_description}"
//         title = "${photo.user.name}"
//           />
//         `;
//         photoWrapper.append(imgContainer);
//     });
// }
const searchForm = document.querySelector(".main__form");
const searchInput = document.querySelector(".searchInput");
const photoWrapper = document.querySelector(".photo__wrapper");

const API = "https://api.unsplash.com";
const ACCESSKEY = "2FNq_PiqOdncogEEoBJ819usLlnrMKUGcDr_VfIR8pc";

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    if (!query) {
        alert("Iltimos, qidiruv so'zini kiriting");
        return;
    }

    getPhotos(query).then(displayPhotos);
});

async function getPhotos(query) {
    const response = await fetch(`${API}/search/photos?page=1&query=${query}`, {
        method: "GET",
        headers: {
            "Accept-Version": "v1",
            Authorization: `Client-ID ${ACCESSKEY}`,
        },
    });

    if (!response.ok) {
        console.error("API so'rovi bajarilmadi");
        alert("Biror xatolik yuz berdi, iltimos, qayta urinib ko'ring!");
        return null;
    }

    const data = await response.json();
    return data.results;
}

function displayPhotos(photos) {
    photoWrapper.innerHTML = "";
    photos.forEach((photo) => {
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("photo-container");

        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = photo.alt_description || "Untitled";
        img.title = photo.user.name;

        imgContainer.appendChild(img);
        photoWrapper.appendChild(imgContainer);
    });
}
