document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passWordInput = document.getElementById("password");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passWordInput.value;

        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })



        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Identifiants incorrects");
                }
            })
            .then(function (data) {
                localStorage.setItem("token", data.token);
                window.location.href = "index.html";

            })
            .catch(function (error) {
                alert("E-mail ou mot de passe incorect");
            });


    });


});