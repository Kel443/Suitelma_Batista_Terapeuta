const hiddenElements = document.querySelectorAll('.hidden');
const toggle = document.getElementById('menu-toggle');
const menu = document.getElementById('nav');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

