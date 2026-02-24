
console.log("modale.js chargé");
function openModale() {
    if (document.querySelector(".modale")) return;
    const modale = document.createElement("div");
    modale.classList.add("modale");

    const contenu = document.createElement("div");
    contenu.classList.add("contenu-modale");

    const boutonFermerGalerie = document.createElement("button");
    boutonFermerGalerie.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    boutonFermerGalerie.classList.add("btn-fermer");

    contenu.appendChild(boutonFermerGalerie);
    modale.appendChild(contenu);

    document.body.appendChild(modale);

    modale.addEventListener("click", function (event) {
        if (event.target === modale) {
            modale.remove();
        }
    });


    boutonFermerGalerie.addEventListener("click", function () {
        modale.remove();
    });


    createGalleryContent(contenu);
    fetchWorksModal();
}

function createGalleryContent(contenu) {

    const titre = document.createElement("h2");
    titre.textContent = "Galerie photo";
    titre.classList.add("titre-h2");

    const galerie = document.createElement("div");
    galerie.classList.add("galerie-modale");

    const barre = document.createElement("div");
    barre.classList.add("separateur");

    const boutonAjouter = document.createElement("button");
    boutonAjouter.textContent = "Ajouter une photo";
    boutonAjouter.classList.add("bouton-ajouter-photo");
    boutonAjouter.addEventListener("click", showAddPhotoModale);

    contenu.appendChild(titre);
    contenu.appendChild(galerie);
    contenu.appendChild(barre);
    contenu.appendChild(boutonAjouter);


    boutonAjouter.addEventListener("click", () => {
        contenu.innerHTML = "";
        createAddPhotoHeader(contenu);
        createAddPhotoForm(contenu);
    });


}



function fetchWorksModal() {
    fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(works => {
            displayModalPhotos(works);
        });

}

function displayModalPhotos(works) {
    const galerie = document.querySelector(".galerie-modale");
    galerie.innerHTML = "";

    works.forEach(work => {
        const container = document.createElement("div");
        container.classList.add("photo-container");

        const img = document.createElement("img");
        img.src = work.imageUrl;

        const icone = document.createElement("span");
        icone.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        icone.classList.add("icone-poubelle");

        icone.addEventListener("click", function () {
            const token = localStorage.getItem("token");

            fetch("http://localhost:5678/api/works/" + work.id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
                .then(function (response) {
                    if (response.ok) {
                        container.remove();


                        const figureToRemove = document.querySelector(`.gallery figure[data-id="${work.id}"]`);
                        if (figureToRemove) {
                            figureToRemove.remove();
                        }


                    } else {
                        alert("Erreur suppression");
                    }
                });
        });


        container.appendChild(img);
        container.appendChild(icone);
        galerie.appendChild(container);

    });


}



function showAddPhotoModale() {
    const contenu = document.querySelector(".modale .contenu-modale");
    if (!contenu) return;

    contenu.innerHtTML = "";

    createAddPhotoHeader(contenu);
    createAddPhotoForm(contenu);
}



function createAddPhotoHeader(contenu) {
    const header = document.createElement("div");
    header.classList.add("header-ajout-photo");

    const btnRetour = document.createElement("button");
    btnRetour.classList.add("btn-retour");
    btnRetour.innerHTML = '<i class= "fa-solid fa-arrow-left"></i>';

    btnRetour.addEventListener("click", () => {
        contenu.innerHTML = "";
        createGalleryContent(contenu);
        fetchWorksModal();
    });


    const titre = document.createElement("h2");
    titre.textContent = "Ajout photo";
    titre.classList.add("titre-ajout-photo");


    const boutonFermerForm = document.createElement("button");
    boutonFermerForm.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    boutonFermerForm.classList.add("btn-fermer-fenetre");


    const modale = document.querySelector(".modale");

    boutonFermerForm.addEventListener("click", () => {
        modale.remove();
    });

    header.appendChild(btnRetour);
    header.appendChild(titre);
    header.appendChild(boutonFermerForm);

    contenu.appendChild(header);


}

function createAddPhotoForm(contenu) {


    const form = document.createElement("form");
    form.classList.add("form-ajout-photo");

    const blocGris = document.createElement("div");
    blocGris.classList.add("bloc-gris");

    const iconeImage = document.createElement("span");
    iconeImage.innerHTML = '<i class="fa-regular  fa-image"></i>';
    iconeImage.classList.add("icone-img");

    const boutonAjoutBloc = document.createElement("button");
    boutonAjoutBloc.type = "button";
    boutonAjoutBloc.textContent = "+ Ajouter photo";
    boutonAjoutBloc.classList.add("btn-ajout-plus");

    const texteInfo = document.createElement('p');
    texteInfo.textContent = "jpg, png : 4mo max";
    texteInfo.classList.add("texte-info");

    const inputImage = document.createElement("input");
    inputImage.type = "file";
    inputImage.classList.add("input-file");

    const labelTitre = document.createElement("label");
    labelTitre.textContent = "Titre";
    labelTitre.classList.add("label-form");

    const inputTitre = document.createElement("input");
    inputTitre.type = "text";
    inputTitre.name = "titre";
    inputTitre.classList.add("input-form");


    const labelCategorie = document.createElement("label");
    labelCategorie.textContent = "catégorie";
    labelCategorie.classList.add("label-form-cat");

    const selectCategorie = document.createElement("select");
    selectCategorie.name = "categorie";
    selectCategorie.classList.add("select-form");

    const barreSeparatrice = document.createElement("div");
    barreSeparatrice.classList.add("barre-sep");

    const boutonValider = document.createElement("button");
    boutonValider.type = "submit";
    boutonValider.textContent = "Valider";
    boutonValider.classList.add("btn-valider");

    const messageErreur = document.createElement("p");
    messageErreur.textContent = "Veuillez remplir tous les champs";
    messageErreur.classList.add("message-erreur");

    const messageSucces = document.createElement("p");
    messageSucces.textContent = "Projet ajouté avec succès";
    messageSucces.classList.add("message-succes");



    form.appendChild(blocGris);
    blocGris.appendChild(iconeImage);
    blocGris.appendChild(boutonAjoutBloc);
    blocGris.appendChild(texteInfo);
    blocGris.appendChild(inputImage);
    form.appendChild(labelTitre);
    form.appendChild(inputTitre);
    form.appendChild(labelCategorie);
    form.appendChild(selectCategorie);
    form.appendChild(barreSeparatrice);
    form.appendChild(boutonValider);
    form.appendChild(messageErreur);
    form.appendChild(messageSucces);


    contenu.appendChild(form);

    loadCategories();
    setupAddPhotoForm();

}





function setupAddPhotoForm() {


    const inputImage = document.querySelector(".input-file");
    const btnAdd = document.querySelector(".btn-ajout-plus");
    const blocGris = document.querySelector(".bloc-gris");


    btnAdd.addEventListener("click", () => {
        inputImage.click();
    });



    inputImage.addEventListener("change", () => {

        const fichier = inputImage.files[0];

        if (!fichier) return;

        const image = document.createElement("img");
        image.src = URL.createObjectURL(fichier);
        image.classList.add("bloc-gris-img");

        blocGris.innerHTML = "";
        blocGris.appendChild(image);


    });


    const boutonValider = document.querySelector(".btn-valider");
    const messageErreur = document.querySelector(".message-erreur");
    const titreInput = document.querySelector(".input-form");
    const messageSucces = document.querySelector(".message-succes");
    const selectCategorie = document.querySelector(".select-form");

    boutonValider.addEventListener("click", function (e) {

        e.preventDefault();
        console.log("CLICK VALIDER");

        if (titreInput.value === "" || inputImage.files.length === 0) {
            messageErreur.textContent = "Veuillez remplir tous les champs";
            messageErreur.style.display = "block";


        } else {
            messageErreur.textContent = "";
            messageErreur.style.display = "none";

            const formData = new FormData();
            formData.append("title", titreInput.value);
            formData.append("image", inputImage.files[0]);
            formData.append("category", selectCategorie.value);


            const token = localStorage.getItem("token");

            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + token
                },
                body: formData
            })
                .then(response => {
                    console.log("STATUS", response.status);
                    if (response.ok) {
                        messageSucces.textContent = "Projet ajouté avec succès";
                        messageSucces.style.display = "block";

                        titreInput.value = "";
                        selectCategorie.value = "";
                        inputImage.value = "";
                        document.querySelector(".bloc-gris-img").src = "";


                    }


                    return response.json();
                })
                .then(nouveauProjet => {

                    const galerie = document.querySelector(".gallery");
                    const figure = document.createElement("figure");
                    figure.dataset.id = nouveauProjet.id;
                    const image = document.createElement("img");
                    image.src = nouveauProjet.imageUrl;
                    image.alt = nouveauProjet.title;

                    const figcaption = document.createElement("figcaption");
                    figcaption.textContent = nouveauProjet.title;


                    const galerieModale = document.querySelector(".galerie-modale");
                    const figureModale = document.createElement("figure");
                    const imageModale = document.createElement("img");
                    imageModale.src = nouveauProjet.imageUrl;
                    image.alt = nouveauProjet.title;


                    figure.appendChild(image);
                    figure.appendChild(figcaption);
                    galerie.appendChild(figure);
                    figureModale.appendChild(imageModale);
                    galerieModale.appendChild(figureModale);
                })


        }



    });
}








function loadCategories() {
    const select = document.querySelector(".select-form");

    fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(categories => {

            select.innerHTML = "";

            categories.forEach(category => {

                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;

                select.appendChild(option);

            });
        });
}


























