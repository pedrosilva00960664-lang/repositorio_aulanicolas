function somar(){
    let valor_1 = Number(document.getElementById ('num1').value)
    let valor_2 = Number(document.getElementById ('num2').value)

    let soma = valor_1 + valor_2
    document.getElementById('resultado').innerText = "Resultado: " + soma
    
}
function subtracao(){
    let valor_1 = Number(document.getElementById ('num1').value)
    let valor_2 = Number(document.getElementById ('num2').value)

    let subtracao = valor_1 - valor_2
    document.getElementById('resultado').innerText = "Resultado: " + subtracao
    
}
function multi(){
    let valor_1 = Number(document.getElementById ('num1').value)
    let valor_2 = Number(document.getElementById ('num2').value)

    let multi = valor_1 * valor_2
    document.getElementById('resultado').innerText = "Resultado: " + multi
    
}
function dividir(){
    let valor_1 = Number(document.getElementById ('num1').value)
    let valor_2 = Number(document.getElementById ('num2').value)

    let dividir = valor_1 / valor_2
    document.getElementById('resultado').innerText = "Resultado: " + dividir
    
}