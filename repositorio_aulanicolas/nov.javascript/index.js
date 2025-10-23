const alunos = ["bernado", "japa", "max"]

console.log("Hello Word")
console.log(alunos)

function somar(num1,num2){
     return num1 + num2
}

function BOMDIA(nome){
    return "bom dia meu querido "+ nome 
}
console.log(somar(10,5))
console.log(somar(20.320))
console.log(BOMDIA("max"))


let titulo = document.getElementById("titulo") // selecionamos o titulo

titulo.innerText = "Altera o texto pelo Javascript" // mudamos ele atravez do Javascript

console.log(titulo)

let texto = document.getElementById("texto")
console.log(texto)

function sendText(){
    let texto = document.getElementById("texto").value
    console.log(texto)
    alert(texto)
}
function somar(){
    let n1 = Number(document.getElementById("n1").value)
    let n2 = Number(document.getElementById("n2").value)
    alert(n1 + n2)
}

function subtrair(){
    let n1 = Number(document.getElementById("n1").value)
    let n2 = Number(document.getElementById("n2").value)
    alert(n1 - n2)
}

function mult(){
    let n1 = Number(document.getElementById("n1").value)
    let n2 = Number(document.getElementById("n2").value)
    alert(n1 * n2)
}

function divi(){
    let n1 = Number(document.getElementById("n1").value)
    let n2 = Number(document.getElementById("n2").value)
    alert(n1 / n2)
}