window.onload = () => {
  // Récupérer la chaîne de requête de l'URL
  const paramsString = document.location.search;

  // Créer un objet URLSearchParams
  const searchParams = new URLSearchParams(paramsString);

  // Boucle sur tous les paramètres
  for (const param of searchParams) {
    const elementId = param[0];      // identifiant du champ (ex: name)
    const elementValue = decodeURIComponent(param[1]); // valeur du champ
    const element = document.getElementById(elementId);

    if (element !== null) {
      // Mettre à jour le texte
      if (elementId !== "address" && elementId !== "email") {
        element.textContent = elementValue;
      }
    }

    // Cas particulier : adresse -> lien Google Maps
    if (elementId === "address" && element !== null) {
      element.href = `https://www.google.com/maps/search/?api=1&query=${elementValue}`;
      element.textContent = elementValue;
    }

    // Cas particulier : email -> lien mailto
    if (elementId === "email" && element !== null) {
      element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
      element.textContent = elementValue;
    }

    // Débogage dans la console
    console.log(param);
  }
};
