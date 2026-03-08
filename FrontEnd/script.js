document.addEventListener("DOMContentLoaded", function () {


    let allWorks = [];


    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {


            allWorks = works;


            afficherTravaux(allWorks);


            recupererCategories().then(categories => {
                afficherFiltres(categories);
                masquerFiltresSiToken();
            });
        });




    function recupererCategories() {

        return fetch("http://localhost:5678/api/categories")
            .then(response => response.json());
    }

    function afficherFiltres(categories) {
        const portfolio = document.querySelector("#portfolio");
        const gallery = document.querySelector(".gallery");

        const filtersDiv = document.createElement("div");
        filtersDiv.classList.add("filters");

        portfolio.insertBefore(filtersDiv, gallery);

        const btnTous = document.createElement("button");
        btnTous.textContent = "Tous";
        btnTous.classList.add("filter-btn", "active");
        filtersDiv.appendChild(btnTous);

        btnTous.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn")
                .forEach(b => b.classList.remove("active"));


            btnTous.classList.add("active");

            afficherTravaux(allWorks);
        });

        categories.forEach(category => {
            const btn = document.createElement("button");
            btn.textContent = category.name;
            btn.classList.add("filter-btn");
            filtersDiv.appendChild(btn);

            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn")
                    .forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const travauxFiltres = allWorks.filter(work => work.categoryId === category.id);
                afficherTravaux(travauxFiltres);
            });
        });
    }

    function afficherTravaux(travauxAAfficher) {
        const gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";

        travauxAAfficher.forEach(work => {
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






    function creerBandeauEdition() {

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

    function basculerVersDeconnexion() {

        const token = localStorage.getItem("token");
        const boutonLogin = document.getElementById("logout-link");

        if (!boutonLogin) return;

        if (!token) {
            boutonLogin.textContent = "login";
            boutonLogin.addEventListener("click", function () {
                window.location.href = "login.html";
            });



        } else {

            boutonLogin.textContent = "logout";

            boutonLogin.addEventListener("click", function () {
                localStorage.removeItem("token");
                window.location.href = "index.html";
            });
        }
    }

    creerBandeauEdition();
    basculerVersDeconnexion();


    function masquerFiltresSiToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;

        }

        const filters = document.querySelector(".filters");
        if (filters) {
            filters.remove();
        }




    }

    function afficherBoutonEdition() {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }

        const title = document.querySelector("#portfolio h2");
        const bouton = document.createElement("span");
        bouton.classList.add("edit-button");
        bouton.addEventListener("click", function () {
            console.log("clic sur modifier");
            ouvrirModale();

        });



        const icon = document.createElement("i");
        icon.classList.add("fa-regular", "fa-pen-to-square");

        const text = document.createElement("span");
        text.textContent = "modifier";

        bouton.appendChild(icon);
        bouton.appendChild(text);

        title.appendChild(bouton);

    }

    afficherBoutonEdition();




});

