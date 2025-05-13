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
