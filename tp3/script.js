document.getElementById("form-inscription").addEventListener("submit", function(e) {
    e.preventDefault(); // Empêche le rechargement de la page

    let name = document.getElementById("name").value;
    let firstname = document.getElementById("firstname").value;
    let birthday = document.getElementById("birthday").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    document.getElementById("resultText").innerHTML =
    `Bonjour <b>${firstname} ${name}</b>.<br>
     Né(e) le <b>${birthday}</b>.<br>
     Adresse : <b>${address}</b>.<br>
     Email : <b>${email}</b>.`;

    let modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();
});
