// Login demonstrativo. Em produção, valide as credenciais em um backend seguro.
const DEMO_CREDENTIALS = { username: "professora", password: "123456" };

const body = document.body;
const views = {
  login: document.getElementById("loginView"),
  error: document.getElementById("errorView"),
  success: document.getElementById("successView"),
  welcome: document.getElementById("welcomeView"),
  dashboard: document.getElementById("dashboardView")
};
const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const feedback = document.getElementById("feedback");
let redirectTimer;

function showView(name) {
  Object.entries(views).forEach(([key, element]) => element.hidden = key !== name);
}
function resetLogin() {
  clearTimeout(redirectTimer);
  body.classList.remove("state-error", "state-success");
  feedback.textContent = "";
  form.querySelectorAll(".field").forEach(field => field.classList.remove("field-error"));
  password.value = "";
  showView("login");
  username.focus();
}
function showError() {
  body.classList.remove("state-success");
  body.classList.add("state-error");
  showView("error");
}
function showSuccess() {
  body.classList.remove("state-error");
  body.classList.add("state-success");
  showView("success");
  redirectTimer = setTimeout(() => {
    body.classList.remove("state-success");
    showView("welcome");
  }, 1500);
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const typedName = username.value.trim();
  const typedPassword = password.value;
  feedback.textContent = "";
  if (!typedName || !typedPassword) {
    feedback.textContent = "Preencha seu nome e sua senha para continuar.";
    (!typedName ? username : password).focus();
    return;
  }
  if (typedName.toLowerCase() === DEMO_CREDENTIALS.username && typedPassword === DEMO_CREDENTIALS.password) {
    showSuccess();
  } else {
    showError();
  }
});

document.getElementById("tryAgain").addEventListener("click", resetLogin);
document.getElementById("enterPanel").addEventListener("click", () => showView("dashboard"));
document.getElementById("backLogin").addEventListener("click", resetLogin);

document.getElementById("togglePassword").addEventListener("click", event => {
  const isVisible = password.type === "text";
  password.type = isVisible ? "password" : "text";
  event.currentTarget.setAttribute("aria-label", isVisible ? "Mostrar senha" : "Ocultar senha");
});

[username, password].forEach(input => input.addEventListener("input", () => {
  feedback.textContent = "";
  form.querySelectorAll(".field").forEach(field => field.classList.remove("field-error"));
}));
