// Alternância entre login e cadastro
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

toRegister.addEventListener('click', () => {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
});

toLogin.addEventListener('click', () => {
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Função de cadastro
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('regNome').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const senha = document.getElementById('regSenha').value.trim();

    if (!nome || !email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    // Verifica se o usuário já existe
    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    const userExists = users.find(u => u.email === email);

    if (userExists) {
        alert('Este e-mail já está cadastrado!');
        return;
    }

    users.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    document.getElementById('register-form').reset();

    // Volta para login
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
});

// Função de login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    const validUser = users.find(u => u.email === email && u.senha === senha);

    if (validUser) {
        alert(`Bem-vindo(a), ${validUser.nome}!`);
    } else {
        alert('Email ou senha incorretos!');
    }
});