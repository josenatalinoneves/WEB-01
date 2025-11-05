function calcular() {
  
    let n1 = Number(document.getElementById("num1").value);
    let n2 = Number(document.getElementById("num2").value);
    
    
    let resultados = document.getElementById("resultados");
    
   
    let textoResultado = "Soma: " + (n1 + n2) + "<br>";
    textoResultado += "Subtração: " + (n1 - n2) + "<br>";
    textoResultado += "Multiplicação: " + (n1 * n2) + "<br>";
    textoResultado += "Divisão: " + (n1 / n2) + "<br>";
    textoResultado += "Potência: " + (n1 ** n2) + "<br>";
    textoResultado += "Resto da divisão: " + (n1 % n2);
    
    resultados.innerHTML = textoResultado;
}