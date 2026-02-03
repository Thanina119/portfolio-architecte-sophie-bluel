console.log("JS bien chargé")

let allWorks = [];

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
        console.log(works);

        allWorks = works;


        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";

        works.forEach(work => {
            const figure = document.createElement("figure");

            const img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            const figcaption = document.createElement("figcaption");
            figcaption.textContent = work.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            gallery.appendChild(figure);

        });


        getCategories().then(categories => {
            displayFilters(categories);
        });
    });

function getCategories() {
    return fetch("http://localhost:5678/api/categories")
        .then(response => response.json());
}
function displayFilters(categories) {
    const portfolio = document.querySelector("#portfolio");
    const gallery = document.querySelector(".gallery");

    const filtersDiv = document.createElement("div");
    filtersDiv.classList.add("filters");

    portfolio.insertBefore(filtersDiv, gallery);

    const btnAll = document.createElement("button");
    btnAll.textContent = "Tous";
    btnAll.classList.add("filter-btn", "active");
    filtersDiv.appendChild(btnAll);

    btnAll.addEventListener("click", () => {

        showWorks(allWorks);
    });

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.classList.add("filter-btn");
        filtersDiv.appendChild(btn);

        btn.addEventListener("click", () => {
            console.log("click", category.name, category.id);
            const filteredWorks = allWorks.filter(work => work.categoryId === category.id);
            showWorks(filteredWorks);
        });
    });
}

function showWorks(WorksToShow) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";

    WorksToShow.forEach(work => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;

        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}


