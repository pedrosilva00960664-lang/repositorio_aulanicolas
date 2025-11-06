// Dados de consultas
const events = [
    { title: "Dr. Rojelio", date: "2025-11-07", time: "10:00", color: "blue" },
    { title: "Dr. Rafael", date: "2025-11-08", time: "11:00", color: "green" },
    { title: "Dr. Fernando", date: "2025-11-09", time: "08:00", color: "yellow" }
  ];
  
  // Estado atual
  let state = {
    view: "month",
    date: new Date(2025, 10, 1)
  };
  
  const calendarEl = document.getElementById("calendar");
  const label = document.getElementById("current-label");
  
  // Funções auxiliares
  function formatDate(date) {
    return date.toISOString().split("T")[0];
  }
  
  function render() {
    label.textContent = state.date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
    calendarEl.innerHTML = "";
  
    if (state.view === "month") renderMonth();
    if (state.view === "week") renderWeek();
    if (state.view === "day") renderDay();
  }
  
  function renderMonth() {
    const grid = document.createElement("div");
    grid.className = "month-grid";
    const start = new Date(state.date.getFullYear(), state.date.getMonth(), 1);
    const startDay = new Date(start);
    startDay.setDate(start.getDate() - start.getDay());
  
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
  
      const cell = document.createElement("div");
      cell.className = "day-cell";
      if (day.toDateString() === new Date().toDateString()) cell.classList.add("today");
  
      const num = document.createElement("div");
      num.className = "day-number";
      num.textContent = day.getDate();
      cell.appendChild(num);
  
      const dayEvents = events.filter(e => e.date === formatDate(day));
      const evWrap = document.createElement("div");
      evWrap.className = "events";
  
      dayEvents.forEach(e => {
        const ev = document.createElement("div");
        ev.className = `event ${e.color}`;
        ev.textContent = `${e.time} - ${e.title}`;
        evWrap.appendChild(ev);
      });
  
      cell.appendChild(evWrap);
      grid.appendChild(cell);
    }
  
    calendarEl.appendChild(grid);
  }
  
  function renderWeek() {
    calendarEl.innerHTML = "<p style='text-align:center;'>Visualização semanal em breve.</p>";
  }
  
  function renderDay() {
    calendarEl.innerHTML = "<p style='text-align:center;'>Visualização diária em breve.</p>";
  }
  
  // Navegação
  document.getElementById("prev").onclick = () => {
    state.date.setMonth(state.date.getMonth() - 1);
    render();
  };
  document.getElementById("next").onclick = () => {
    state.date.setMonth(state.date.getMonth() + 1);
    render();
  };
  document.getElementById("today").onclick = () => {
    state.date = new Date();
    render();
  };
  
  // Troca de visualização
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.view = btn.dataset.view;
      render();
    };
  });
  
  // Inicializa
  render();

  const perfilSelect = document.getElementById("perfil");
const camposMedico = document.getElementById("camposMedico");
const camposAdmin = document.getElementById("camposAdmin");
const form = document.getElementById("cadastroForm");

perfilSelect.addEventListener("change", () => {
  const valor = perfilSelect.value;
  camposMedico.classList.add("hidden");
  camposAdmin.classList.add("hidden");

  if (valor === "medico") {
    camposMedico.classList.remove("hidden");
  } else if (valor === "admin") {
    camposAdmin.classList.remove("hidden");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const perfil = perfilSelect.value;
  const codigoAdmin = document.getElementById("codigoAdmin")?.value;

  if (senha.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres.");
    return;
  }

  if (senha !== confirmarSenha) {
    alert("As senhas não coincidem!");
    return;
  }

  if (perfil === "admin" && codigoAdmin !== "ADMIN2024") {
    alert("Código de acesso administrativo inválido!");
    return;
  }

  alert("Conta criada com sucesso!");
  form.reset();
  camposAdmin.classList.add("hidden");
  camposMedico.classList.add("hidden");
});
  