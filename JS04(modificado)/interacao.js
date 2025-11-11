let vidas;
let categorias;
let categoriaAtual;
let palavraAtual;
let exibicao;

let btnIniciar = document.getElementById("btn_iniciar");
let imagem = document.getElementById("img-menina");
let palavraDisplay = document.getElementById("palavra");
let categoriaNome = document.getElementById("categoria-nome");
let modal = document.getElementById("modal-resultado");
let modalTitulo = document.getElementById("modal-titulo");
let modalPalavra = document.getElementById("modal-palavra");
let btnModalNovoJogo = document.getElementById("modal-novo-jogo");

btnIniciar.addEventListener("click", novoJogo);
btnModalNovoJogo.addEventListener("click", novoJogo);

iniciar();

async function iniciar() {
    await carregarFase();
    categoriaNome.textContent = "Clique em INICIAR para começar!";
    desativarTeclado();
}

function novoJogo() {
    modal.style.display = "none";
    vidas = 6;
    carregarPalavraAleatoria();
    imagem.src = "assets/menina1.png";
    btnIniciar.style.display = "block";
}

function carregarPalavraAleatoria() {
    let chaves = Object.keys(categorias);
    categoriaAtual = chaves[Math.floor(Math.random() * chaves.length)];
    
    let palavrasLista = categorias[categoriaAtual];
    let indiceAleatorio = Math.floor(Math.random() * palavrasLista.length);
    palavraAtual = String(palavrasLista[indiceAleatorio]).toUpperCase();

    categoriaNome.textContent = `Categoria: ${categoriaAtual.toUpperCase()}`;
    
    exibicao = [];
    for (let i = 0; i < palavraAtual.length; i++) {
        exibicao[i] = '_';
    }
    palavraDisplay.textContent = exibicao.join(" ");
    carregarTeclado();
}

function carregarTeclado() {
    let boxTeclado = document.getElementById("box-teclado");
    boxTeclado.innerHTML = "";
    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < letras.length; i++) {
        let botao = document.createElement("button");
        botao.textContent = letras[i];
        botao.classList.add("tecla");

        botao.addEventListener("click", function () {
            verificarLetra(letras[i], botao);
        });
        boxTeclado.appendChild(botao);
    }
}

function verificarLetra(letra, botao) {
    botao.disabled = true;
    let acertou = false;

    for (let i = 0; i < palavraAtual.length; i++) {
        if (palavraAtual[i] === letra) {
            exibicao[i] = letra;
            acertou = true;
        }
    }
    
    palavraDisplay.textContent = exibicao.join(" ");

    if (acertou) {
        botao.classList.add("correta");
    } else {
        botao.classList.add("errada");
        vidas--;
        if (vidas >= 0) {
            imagem.src = "assets/menina" + (7 - vidas) + ".png";
        }
    }

    if (vidas === 0) {
        mostrarResultado(false);
    } else if (!exibicao.includes("_")) {
        mostrarResultado(true);
    }
}

function mostrarResultado(vitoria) {
    desativarTeclado();
    if (vitoria) {
        modalTitulo.textContent = "🎉 PARABÉNS! VOCÊ ACERTOU!";
        modalTitulo.style.color = "#4CAF50";
    } else {
        modalTitulo.textContent = "😢 FIM DE JOGO! VOCÊ PERDEU.";
        modalTitulo.style.color = "#f85149";
    }
    modalPalavra.textContent = "A palavra era: " + palavraAtual;
    modal.style.display = "block";
    btnIniciar.style.display = "block";
}

function desativarTeclado() {
    const botoes = document.querySelectorAll("#box-teclado button");
    botoes.forEach(botao => botao.disabled = true);
}

async function carregarFase() {
    try {
        const response = await fetch("fases.json");
        const data = await response.json();
        categorias = data;
    } catch (error) {
        console.error("Erro ao carregar fases.json:", error);
    }
}