const jogo = {
  numeroCartas: 0,
  cartasViradas: 0,
  primeiraCarta: null,
  segundaCarta: null,
  contadorJogadas: 0,
  cartaCorreta: 0,
  imgaesParrot: [
    "bobrossparrot.gif",
    "explodyparrot.gif",
    "fiestaparrot.gif",
    "metalparrot.gif",
    "revertitparrot.gif",
    "tripletsparrot.gif",
    "unicornparrot.gif",
  ],
};

function comparador() {
  return Math.random() - 0.5;
}

function iniciarJogo() {
  jogo.numeroCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  while (
    jogo.numeroCartas < 4 ||
    jogo.numeroCartas > 14 ||
    jogo.numeroCartas % 2 !== 0
  ) {
    jogo.numeroCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  }

  gerarCartas(jogo.numeroCartas);
}

function gerarCartas(numeroCartas) {
  const todasImagens = jogo.imgaesParrot;
  const quantidadeDePares = numeroCartas / 2;
  const primeiraMetade = todasImagens.slice(0, quantidadeDePares);
  const deckCartas = primeiraMetade.concat(primeiraMetade);

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

function compararImagens(cartaP, cartaS) {
  const img1 = cartaP.querySelector(".back-face img").src;
  const img2 = cartaS.querySelector(".back-face img").src;
  return img1 === img2;
}

function virarCarta(carta) {
  if (carta.classList.contains("virar") || jogo.cartasViradas === 2) {
    return;
  }
  carta.classList.add("virar");
  jogo.cartasViradas++;
  jogo.contadorJogadas++;

  if (jogo.cartasViradas === 1) {
    jogo.primeiraCarta = carta;
  } else {
    jogo.segundaCarta = carta;

    if (compararImagens(jogo.primeiraCarta, jogo.segundaCarta)) {
      jogo.primeiraCarta.classList.add("aberta");
      jogo.segundaCarta.classList.add("aberta");
      jogo.cartaCorreta += 2;
      jogo.cartasViradas = 0;
      jogo.primeiraCarta = null;
      jogo.segundaCarta = null;

      if (verificarCartas()) {
        alert(`Você ganhou em ${jogo.contadorJogadas} jogadas.`);
      }
    } else {
      setTimeout(() => {
        jogo.primeiraCarta.classList.remove("virar");
        jogo.segundaCarta.classList.remove("virar");
        jogo.cartasViradas = 0;
        jogo.primeiraCarta = null;
        jogo.segundaCarta = null;
      }, 1000);
    }
  }
}

function verificarCartas() {
  return jogo.cartaCorreta === jogo.numeroCartas;
}
iniciarJogo();
