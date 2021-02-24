//On a besoin de trois variables pour stocker les données de la calculatrice :
//le premier membre de l'opération, l'opérateur de l'opération et le second membre de l'opération
//Running total = résultat en cours (c'est ici qu'on stocke la valeur avant l'opération)

let runningTotal = 0;
//Mémorisation de ce qui est en train d'être tappé
let buffer = "0";
//Mémorisation du précédent opérateur
let previousOperator;
//Appel de l'élément d'affichage du résultat
const screen = document.querySelector("#resultat");

//On récupère ce qui a été tapé sur la calculatrice
document
  .querySelector(".coque_calculatrice")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

//On divise le code en petites fonctions

//Fonction qui analyse ce qui est tapé sur la calc : nombres ou symboles
function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
  console.log(buffer);
}

//Fonction appelée si on a entré un nombre
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

//Fonction appelée si on a entré un nombre
function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = "null"; //Null et non 0, il faut qu'il n'existe plus
      break;

    case "=":
      if (previousOperator === null) {
        return;
      } else {
        flushOperation(parseInt(buffer));
        previousOperator = null;
        buffer = "" + runningTotal; // Pour laisser buffer en type string on concataine avec une chaine vide
        runningTotal = 0;
        break;
      }

    case "←": // Cas du backspace -> si dernière valeur un chiffle, on pop dernière lettre
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;

    default:
      handleMath(value);
      break;
  }
}

//Fonction qui met à jour ce qui est inscrit dans l'écran de la calculatrice
function rerender() {
  screen.innerText = buffer;
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  console.log("flushoperation");
  console.log(runningTotal);
  console.log(intBuffer);
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  } else {
    runningTotal *= intBuffer;
  }
}
