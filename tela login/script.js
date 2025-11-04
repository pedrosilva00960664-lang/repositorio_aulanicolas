function cadastrar(){
    const usuario = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value
    const confirmarSenha = document.getElementById('confirmarSenha').value
     
    if(usuario && senha === confirmarSenha){
        localStorage.setItem(usuario,senha)
        return alert(`Usuário ${usuario} confirmado com sucesso!`)
    }
    else{
        return alert("Usuario e/ou senha incorretos")
    }
}

function login(){
    const usuario = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value

    let usuariExistente = localStorage.getItem(usuario)

    if(!usuariExistente){
        return alert("Usuário não existe!!!")
    }

    if(usuario && senha === usuariExistente){
        localStorage.setItem(usuario,senha)
        alert(`Usuário ${usuario} logado com sucesso`)
        window.location.href = "./home.html"
    }

    else{
        return alert ("Erro !!!")
    }
}