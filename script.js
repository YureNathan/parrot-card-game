const imgaesParrot = [
  "bobrossparrot.gif",
  "explodyparrot.gif",
  "fiestaparrot.gif",
  "metalparrot.gif",
  "revertitparrot.gif",
  "tripletsparrot.gif",
  "unicornparrot.gif",
];

function comparador() {
  return Math.random() - 0.5;
}

function iniciarJogo() {
  let numeroCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  while (numeroCartas < 4 || numeroCartas > 14 || numeroCartas % 2 !== 0) {
    numeroCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  }
  gerarCartas(numeroCartas);
}

function gerarCartas(numeroCartas) {
  let deckCartas = imgaesParrot
    .slice(0, numeroCartas / 2)
    .concat(imgaesParrot.slice(0, numeroCartas / 2));
  
  deckCartas.sort(comparador); 

  const listarCartas = document.querySelector(".CardsContainer");
  let elementoNovo = "";

  for (let i = 0; i < numeroCartas; i++) {
    elementoNovo += `<div class="card" onclick="virarCarta(this)">
                    <div class="front-face face">
                      <img src="./images/back.png" alt="parrot">
                    </div>
                    <div class="back-face face">
                      <img src="./images/${deckCartas[i]}" alt="parrot">
                    </div>
                 </div>`;
  }

  listarCartas.innerHTML = elementoNovo;
}


function virarCarta(elemento) {
  elemento.classList.toggle("virar"); 
}

iniciarJogo();
