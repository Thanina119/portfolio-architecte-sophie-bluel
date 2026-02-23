document.addEventListener("DOMContentLoaded", function () {
    console.log("JS bien chargé")

    let allWorks = [];


    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {


            allWorks = works;


            showWorks(allWorks);


            getCategories().then(categories => {
                displayFilters(categories);
                hideFiltersIfToken();
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
            figure.dataset.id = work.id;

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






    function createEditBanner() {

        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const banner = document.createElement("div");
        banner.classList.add("edit-banner");
        const icon = document.createElement("i");
        icon.classList.add("fa-regular", "fa-pen-to-square", "edit-icon");
        const text = document.createElement("span");
        text.textContent = "Mode édition";
        text.classList.add("edit-text");

        banner.appendChild(icon);
        banner.appendChild(text);

        document.body.prepend(banner);
    }

    function switchToLogout() {

        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        const menuItem = document.getElementById("logout-link");
        menuItem.textContent = "logout";

        menuItem.addEventListener("click", function () {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        });
    }

    createEditBanner();
    switchToLogout();


    function hideFiltersIfToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;

        }

        const filters = document.querySelector(".filters");
        if (filters) {
            filters.remove();
        }


    }

    function showEditButton() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        const title = document.querySelector("#portfolio h2");
        const bouton = document.createElement("span");
        bouton.classList.add("edit-button");
        bouton.addEventListener("click", function () {
            console.log("clic sur modifier");
            openModale();

        });



        const icon = document.createElement("i");
        icon.classList.add("fa-regular", "fa-pen-to-square");

        const text = document.createElement("span");
        text.textContent = "modifier";

        bouton.appendChild(icon);
        bouton.appendChild(text);

        title.appendChild(bouton);

    }

    showEditButton();




});

