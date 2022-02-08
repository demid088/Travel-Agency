"use strict"
// ----------------------------------------FUNCTION-----------------------------
// плавная прокрутка до верха страницы
function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
// плавная прокрутка до элемента
function scrollToElem(elem) {
  elem.scrollIntoView({
    behavior: "smooth",
  });
}
// ----------------------------------------MENU FIX-----------------------------
// получаем header и top
const jsHeader = document.getElementById('header');
const jsTop = document.getElementById('top');

const jsHeaderHight = jsHeader.offsetHeight;
const jsTopHight = jsTop.offsetHeight;
const scrollTarget = (jsHeaderHight + jsTopHight) / 2;

let scrollSum = window.pageYOffset;
let menuFix;

// устанавливаем маркер...
if (scrollSum > scrollTarget) {
  menuFix = false;
} else {
  menuFix = true;
}

// фиксация меню
window.addEventListener('scroll', function(e) {
  scrollSum = window.pageYOffset;

  if (scrollSum > scrollTarget && !menuFix) {
    jsHeader.classList.toggle('js-fixed', true);
    jsHeader.classList.toggle('js-min-height-0', true);
    jsHeader.classList.toggle('js-bg-color-blue', true);
    jsTop.style.marginTop = jsHeaderHight + 'px';
    jsHeader.style.marginTop = -jsHeaderHight + 'px';
    menuFix = true;
  };
  
  if(scrollSum < scrollTarget && menuFix) {
    jsHeader.classList.toggle('js-fixed', false);
    jsHeader.classList.toggle('js-min-height-0', false);
    jsHeader.classList.toggle('js-bg-color-blue', false);
    jsTop.style.marginTop = 0;
    jsHeader.style.marginTop = 0;
    menuFix = false;
  }
});
// ----------------------------------------LINK-----------------------------
// обрабатываем ссылки (плавная прокрутка)
// LOGO
const logoElem = document.getElementById('logo');

logoElem.addEventListener('click', scrollToTop);

// NAV
const navLinks = document.getElementsByClassName('nav__link');

for (const navLink of navLinks) {
  navLink.addEventListener('click', (ev) => {
    ev.preventDefault();
    // получаем ссылку на элемент (его ID)
    const hrefId = navLink.getAttribute('href').substring(1);
    // если ссылка не установлена
    if (hrefId.length <= 0) {
      scrollToTop();
      return;
    }

    scrollToElem(document.getElementById(hrefId));
  });
}