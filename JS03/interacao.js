let numeroSecreto;
let vidas;

let txtstatus = document.getElementById("status");
let btnIniciar = document.getElementById("btnIniciar");
let numeroChute = document.getElementById("num1");
let btnChutar = document.getElementById("btChutar");
let resultado = document.getElementById("resultados");


btnIniciar.addEventListener("click", novoJogo);
btnChutar.addEventListener("click", chuta);

numeroChute.disabled = true;
btnChutar.disabled = true;
function novoJogo() {
    numeroChute.disabled = false;
    btnChutar.disabled = false
 numeroSecreto = parseInt(Math.random()*100+1);
 (numeroSecreto);
    vidas = 10;
    numVidas();
    numeroChute.value = "";
    resultado.innerHTML = "";
    numeroChute.focus();
    
}
function numVidas() {
    txtstatus.innerHTML = "";
    for (let i = 1; i <= vidas; i++) {
        txtstatus.innerHTML += '+ ';
    }
    if(
        vidas === 0){
     resultado.innerHTML = "Você perdeu!";
     numeroChute.disabled = true;
    btnChutar.disabled = true;
     
    }

}
function chuta(){
    let num = numeroChute.value;
    if (num < 1 || num > 100) {
        alert("O número tem que ser entre 1 e 100! Perdeu uma vida!");
        vidas--;
    } else if (num == numeroSecreto) {
        resultado.innerHTML += "Parabéns! Você acertou!";
        numeroChute.disabled = true;

        btnChutar.disabled = true;

    }else if(num > numeroSecreto){
        resultado.innerHTML += "Palpite: ="+ num;
        resultado.innerHTML += " - O número é Menor!<br>";
        vidas--;
    }else if(num < numeroSecreto){
        resultado.innerHTML += "Palpite: ="+ num;
        resultado.innerHTML += " - O número é Maior!<br>";
        vidas--;
    }
    numeroChute.value = "";
    numeroChute.focus();
    numVidas();
}