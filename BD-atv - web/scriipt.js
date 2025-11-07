let etapa = "idade";
let idade = null;
let isPCD = false;
let nome = "";
let telefone = "";
let email = "";

document.getElementById("send-button").addEventListener("click", sendMessage);

function sendMessage() {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) {
    input.style.border = "1px solid red";
    return;
  }
  input.style.border = "none";

  if (etapa === "idade") {
    const idadeNum = parseInt(msg);
    if (isNaN(idadeNum)) {
      showHistorico(msg, "Por favor, informe sua idade em números.");
      return;
    }
    idade = idadeNum;
    showHistorico(msg, `Idade registrada: ${idade} anos.`);
    if (idade <= 3 || idade >= 60) {
      showHistorico("Sistema", "Você tem direito a agendamento prioritário.");
      etapa = "nome";
      showHistorico("Sistema", "Informe seu nome completo.");
    } else {
      etapa = "pcd";
      showHistorico("Sistema", "Você é PCD (Pessoa com Deficiência)? Responda com 'sim' ou 'não'.");
    }
    input.value = "";
    return;
  }

  if (etapa === "pcd") {
    const resposta = msg.toLowerCase();
    if (resposta === "sim") {
      isPCD = true;
      showHistorico(msg, "Entendido. Você tem direito a agendamento prioritário.");
      etapa = "nome";
      showHistorico("Sistema", "Informe seu nome completo.");
    } else if (resposta === "não") {
      isPCD = false;
      showHistorico(msg, "Certo! Vamos continuar com seu cadastro.");
      etapa = "nome";
      showHistorico("Sistema", "Informe seu nome completo.");
    } else {
      showHistorico(msg, "Responda apenas com 'sim' ou 'não'. Você é PCD?");
    }
    input.value = "";
    return;
  }

  if (etapa === "nome") {
    nome = msg;
    showHistorico(msg, `Nome registrado: ${nome}`);
    etapa = "telefone";
    showHistorico("Sistema", "Informe seu telefone com DDD.");
    input.value = "";
    return;
  }

  if (etapa === "telefone") {
    telefone = msg;
    showHistorico(msg, `Telefone registrado: ${telefone}`);
    etapa = "email";
    showHistorico("Sistema", "Informe seu e-mail.");
    input.value = "";
    return;
  }

  if (etapa === "email") {
    email = msg;
    showHistorico(msg, `E-mail registrado: ${email}`);
    etapa = "finalizado";
    showHistorico("Sistema", "Cadastro concluído! Pode fazer sua pergunta sobre agendamento médico.");
    input.value = "";
    return;
  }

  showHistorico(msg, getBotResponse(msg));
  input.value