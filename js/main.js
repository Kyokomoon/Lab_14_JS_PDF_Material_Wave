import '../css/style.css';
//import { setupDownloadCounter } from './counter.js';

// Сохранение данных в localStorage
document.querySelectorAll('.editable').forEach(element => {
  element.addEventListener('input', () => {
    localStorage.setItem(element.id, element.innerHTML);
  });

  const savedContent = localStorage.getItem(element.id);
  if (savedContent) {
    element.innerHTML = savedContent;
  }
});

// Функция для скачивания резюме в PDF
function downloadResumeAsPDF() {
  const element = document.querySelector('.resume-container');
  const opt = {
    margin: 10,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().from(element).set(opt).save();
}

// Инициализация счетчика
let counter = 0;
const downloadCountElement = document.querySelector('#download-count');

// Обработчик кнопки скачивания
document.querySelector('#download-btn').addEventListener('click', (event) => {
  counter += 1;
  downloadCountElement.innerHTML = `Кнопка нажата ${counter} раз`;
  downloadResumeAsPDF();
  createRipple(event);
});

// Функция для создания ripple-эффекта
function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement("span");

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add("ripple");

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}