let numeroSecreto;
let vidas;

let txtstatus = document.getElementById("status");
let btnIniciar = document.getElementById("btnIniciar");
let numeroChute = document.getElementById("num1");
let btnChutar = document.getElementById("btChutar");
let resultado = document.getElementById("resultados");


btnIniciar.addEventListener("click", novoJogo);
btnChutar.addEventListener("click", chuta);

numeroChute.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !numeroChute.disabled) {
        chuta();
    }
});

numeroChute.disabled = true;
btnChutar.disabled = true;

function novoJogo() {
    numeroChute.disabled = false;
    btnChutar.disabled = false;
    
    numeroSecreto = parseInt(Math.random()*100+1);
    
    vidas = 10;
    numVidas();
    numeroChute.value = "";
    resultado.innerHTML = "Aguardando seu primeiro palpite...";
    numeroChute.focus();
}

function numVidas() {
    txtstatus.innerHTML = "";
    for (let i = 1; i <= vidas; i++) {
        txtstatus.innerHTML += '❤️ ';
    }
    if (vidas <= 0) {
        resultado.innerHTML = `<p class="historico-item" style="color: red; font-weight: bold;">FIM DE JOGO! Você perdeu! O número era ${numeroSecreto}.</p>` + resultado.innerHTML;
        numeroChute.disabled = true;
        btnChutar.disabled = true;
    }
}

function chuta(){
    let num = Number(numeroChute.value); 
    let mensagem = "";
    
    if (isNaN(num) || numeroChute.value.trim() === "") {
        alert("Por favor, insira um número válido.");
        numeroChute.focus();
        return;
    }
    
    if (num < 1 || num > 100) {
        mensagem = `❌ O palpite ${num} está fora do limite (1-100)! Vida perdida!`;
        vidas--;
        
    } else if (num === numeroSecreto) {
        mensagem = `🏆 Palpite ${num}: Parabéns! Você acertou!`;
        numeroChute.disabled = true;
        btnChutar.disabled = true;
        vidas = 10;
        
    } else if(num > numeroSecreto){
        mensagem = `Palpite ${num}: O número é MENOR!`;
        vidas--;
        
    } else {
        mensagem = `Palpite ${num}: O número é MAIOR!`;
        vidas--;
    }
    
    if (resultado.innerHTML.includes("Aguardando")) {
         resultado.innerHTML = `<p class="historico-item">${mensagem}</p>`;
    } else {
         resultado.innerHTML = `<p class="historico-item">${mensagem}</p>` + resultado.innerHTML;
    }
    
    numeroChute.value = "";
    numeroChute.focus();
    numVidas();
}