/* ==========================================
   contato.js — Lógica da página de contato
   ========================================== */
const form       = document.getElementById('contactForm');
const formCard   = form ? form.closest('.contact-form-card') : null;
const formSuccess = document.getElementById('formSuccess');
const submitBtn  = document.getElementById('submitBtn');
const textarea   = document.getElementById('mensagem');
const charCount  = document.getElementById('charCount');
const MIN_CHARS  = 20;

/* ------------------------------------------
   Contador de caracteres no textarea
   ------------------------------------------ */
if (textarea && charCount) {
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / ${MIN_CHARS}`;
    charCount.classList.toggle('ready', len >= MIN_CHARS);
  });
}

/* ------------------------------------------
   Máscara de telefone
   ------------------------------------------ */
const telefoneInput = document.getElementById('telefone');
// if (telefoneInput) {
//   telefoneInput.addEventListener('input', e => {
//     let v = e.target.value.replace(/\D/g, '').slice(0, 11);
//     if (v.length > 6) {
//       v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
//     } else if (v.length > 2) {
//       v = `(${v.slice(0,2)}) ${v.slice(2)}`;
//     } else if (v.length > 0) {
//       v = `(${v}`;
//     }
//     e.target.value = v;
//   });
// }

/* ------------------------------------------
   Validação e envio do formulário
   ------------------------------------------ */
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });

  /* Limpar erro ao digitar */
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => clearFieldError(field));
  });
}


function validateForm() {
  let valid = true;

  const nome     = document.getElementById('nome');
  const email    = document.getElementById('email');
  const assunto  = document.getElementById('assunto');
  const mensagem = document.getElementById('mensagem');

  /* Nome */
  if (!nome.value.trim()) {
    showFieldError(nome, 'Informe seu nome completo.');
    valid = false;
  }

  /* E-mail */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    showFieldError(email, 'Informe seu e-mail.');
    valid = false;
  } else if (!emailRegex.test(email.value.trim())) {
    showFieldError(email, 'Informe um e-mail válido.');
    valid = false;
  }

  /* Assunto */
  if (!assunto.value) {
    showFieldError(assunto, 'Selecione um assunto.');
    valid = false;
  }

  /* Mensagem */
  if (!mensagem.value.trim()) {
    showFieldError(mensagem, 'Escreva sua mensagem.');
    valid = false;
  } else if (mensagem.value.trim().length < MIN_CHARS) {
    showFieldError(mensagem, `A mensagem deve ter pelo menos ${MIN_CHARS} caracteres.`);
    valid = false;
  }

  return valid;
}

function showFieldError(field, message) {
  field.classList.add('invalid');
  const errorEl = field.closest('.form-group').querySelector('.field-error');
  if (errorEl) errorEl.textContent = message;
  field.setAttribute('aria-invalid', 'true');
}

function clearFieldError(field) {
  field.classList.remove('invalid');
  const errorEl = field.closest('.form-group').querySelector('.field-error');
  if (errorEl) errorEl.textContent = '';
  field.removeAttribute('aria-invalid');
}

function submitForm() {
  /* Estado de carregamento */
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Enviando...';

  /* Simula envio (substituir pela chamada real à API) */
  setTimeout(() => {
    form.hidden = true;
    formSuccess.hidden = false;
    formSuccess.querySelector('h3').focus();
  }, 1200);
}
