//Eléments du DOM
const message = document.querySelector("#message");
let total = document.querySelector("#total");
let pourcentage = document.querySelector("#pourcentage");
let net = document.querySelector("#net");

//Fonctions pour vérifier si les entrées du formulaire sont bonnes
const verifRevenu = (num) => {
  if (num < 0) {
    message.innerText += " Quel est votre revenu?";
    return false;
  } else if (num > 10064) {
    message.innerText = "";
    return true;
  } else {
    message.innerText = " Vous n'êtes pas imposable!";
    return false;
  }
};

//Fonction pour le calcul de l'impot
const calculImpots = (revenu, pacs, enfant) => {
  let n = 1 + parseInt(enfant);
  let vPourcentage = 0;
  let vTotal = 0;
  let vNet = 0;
  console.log("revenu" + revenu + " pacs" + pacs + "enfant" + enfant);
  if (pacs == true) {
    n++;
  }
  if (revenu >= 10084 && revenu < 25710) {
    vTotal = Math.round(revenu * 0.11 - 1109.24 * n);
  }
  if (revenu >= 25710 && revenu < 73516) {
    vTotal = Math.round(revenu * 0.3 - 5994.14 * n);
  }
  if (revenu >= 73516 && revenu < 158122) {
    vTotal = Math.round(revenu * 0.41 - 14080.9 * n);
  }
  if (revenu >= 158122) {
    vTotal = Math.round(revenu * 0.45 - 20405.78 * n);
  }
  console.log(vTotal);
  if (vTotal <= 0) {
    vTotal = 0;
  }
  vNet = Math.round(revenu - vTotal);
  vPourcentage = Math.round((vTotal / revenu) * 100);
  return [vTotal, vPourcentage, vNet];
};

document.querySelector("#submit").addEventListener("click", (event) => {
  event.preventDefault();
  message.innerText = "";
  //On récupère les valeurs du formulaires
  let revenu = document.querySelector("#revenu").value;
  let pacs = "";
  if (document.querySelector("#pacs").checked) {
    pacs = true;
  } else {
    pacs = false;
  }
  let enfant = document.querySelector("#enfants").value;
  //Si le revenu correspond à quelquechose, on lance le calcul
  if (verifRevenu(document.querySelector("#revenu").value)) {
    let result = calculImpots(revenu, pacs, enfant);
    console.log(result);
    total.innerHTML = result[0];
    pourcentage.innerHTML = result[1];
    net.innerHTML = result[2];
  }
});
