// 🔁 Alternância entre login e cadastro (usado se login e cadastro estiverem na mesma página)
const loginContainer = document.getElementById('login-container');
const registerContainer = document.getElementById('register-container');
const toRegister = document.getElementById('toRegister');
const toLogin = document.getElementById('toLogin');

if (toRegister && toLogin) {
  toRegister.addEventListener('click', () => {
    loginContainer.classList.add('hidden');
    registerContainer.classList.remove('hidden');
  });

  toLogin.addEventListener('click', () => {
    registerContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
  });
}

// 📝 Cadastro com perfil
const perfilSelect = document.getElementById("perfil");
const camposMedico = document.getElementById("camposMedico");
const camposAdmin = document.getElementById("camposAdmin");

if (perfilSelect) {
  perfilSelect.addEventListener("change", () => {
    camposMedico?.classList.add("hidden");
    camposAdmin?.classList.add("hidden");

    if (perfilSelect.value === "medico") {
      camposMedico?.classList.remove("hidden");
    } else if (perfilSelect.value === "admin") {
      camposAdmin?.classList.remove("hidden");
    }
  });
}

// ✅ Função de cadastro
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('regNome').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const senha = document.getElementById('regSenha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
    const perfil = perfilSelect?.value || "paciente";
    const codigoAdmin = document.getElementById("codigoAdmin")?.value;

    if (!nome || !email || !senha || !confirmarSenha || !perfil) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    if (senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if (perfil === "admin" && codigoAdmin !== "ADMIN2024") {
      alert('Código de acesso administrativo inválido!');
      return;
    }

    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (users.find(u => u.email === email)) {
      alert('Este e-mail já está cadastrado!');
      return;
    }

    users.push({ nome, email, senha, perfil });
    localStorage.setItem('usuarios', JSON.stringify(users));

    alert('Cadastro realizado com sucesso!');
    registerForm.reset();
    camposAdmin?.classList.add("hidden");
    camposMedico?.classList.add("hidden");

    registerContainer?.classList.add('hidden');
    loginContainer?.classList.remove('hidden');
  });
}

// 🔐 Função de login
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value.trim();

    const users = JSON.parse(localStorage.getItem('usuarios')) || [];
    const validUser = users.find(u => u.email === email && u.senha === senha);

    if (validUser) {
      alert(`Bem-vindo(a), ${validUser.nome}!`);
      if (validUser.perfil === "medico") {
        window.location.href = "./paciente.html";
      } else if (validUser.perfil === "admin") {
        window.location.href = "./paciente.html";
      } else {
        window.location.href = "./paciente.html";
      }
    } else {
      alert('Email ou senha incorretos!');
    }
  });
}

// 📅 Eventos simulados para o calendário
const events = [
  { title: "Dr. Rojelio", date: "2025-11-07", time: "10:00", color: "blue" },
  { title: "Dr. Rafael", date: "2025-11-08", time: "11:00", color: "green" },
  { title: "Dr. Fernando", date: "2025-11-09", time: "08:00", color: "yellow" }
];

// 📆 Estado do calendário
let state = {
  view: "month",
  date: new Date(2025, 10, 1) // Novembro 2025
};

// 🔧 Elementos do DOM do calendário
const calendarEl = document.getElementById("calendar");
const label = document.getElementById("current-label");

// 📌 Utilitário para formatar data como yyyy-mm-dd
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// 🚀 Renderiza o calendário
function renderCalendar() {
  if (!calendarEl || !label) return;

  label.textContent = state.date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
  calendarEl.innerHTML = "";

  switch (state.view) {
    case "month":
      renderMonthView();
      break;
    case "week":
      renderWeekView();
      break;
    case "day":
      renderDayView();
      break;
  }
}

// 📆 Visualização mensal
function renderMonthView() {
  const grid = document.createElement("div");
  grid.className = "month-grid";

  const start = new Date(state.date.getFullYear(), state.date.getMonth(), 1);
  const startDay = new Date(start);
  startDay.setDate(startDay.getDate() - startDay.getDay());

  for (let i = 0; i < 42; i++) {
    const day = new Date(startDay.getTime());
    day.setDate(day.getDate() + i);

    const cell = document.createElement("div");
    cell.className = "day-cell";
    if (formatDate(day) === formatDate(new Date())) {
      cell.classList.add("today");
    }

    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = day.getDate();
    cell.appendChild(dayNumber);

    const dayEvents = events.filter(e => e.date === formatDate(day));
    const eventContainer = document.createElement("div");
    eventContainer.className = "events";

    dayEvents.forEach(e => {
      const eventEl = document.createElement("div");
      eventEl.className = `event ${e.color}`;
      eventEl.textContent = `${e.time} - ${e.title}`;
      eventContainer.appendChild(eventEl);
    });

    cell.appendChild(eventContainer);
    grid.appendChild(cell);
  }

  calendarEl.appendChild(grid);
}

// 📆 Visualizações futuras
function renderWeekView() {
  calendarEl.innerHTML = "<p style='text-align:center;'>Visualização semanal em breve.</p>";
}

function renderDayView() {
  calendarEl.innerHTML = "<p style='text-align:center;'>Visualização diária em breve.</p>";
}

// ⏮ Navegação entre meses
document.getElementById("prev")?.addEventListener("click", () => {
  state.date.setMonth(state.date.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next")?.addEventListener("click", () => {
  state.date.setMonth(state.date.getMonth() + 1);
  renderCalendar();
});

document.getElementById("today")?.addEventListener("click", () => {
  state.date = new Date();
  renderCalendar();
});

// 🔀 Troca de visualização
document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    state.view = btn.dataset.view;
    renderCalendar();
  });
});

// ✅ Inicializa o calendário se existir
if (calendarEl) renderCalendar();
