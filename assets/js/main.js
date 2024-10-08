/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

const addLoading = () =>{
    const button = document.getElementById('button');
    button.innerHTML = '<img src="assets/img/load.png" class="loading"/>';
}

const removeLoading = () =>{
    const button = document.getElementById('button');
    button.innerHTML = 'Enviar';
}

const handleSubmit = (event) => {
    event.preventDefault();
    addLoading();
    
    const form = document.querySelector('form');
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const check = document.getElementById('check').checked;
    let confirm = "";
    if (!check){
        confirm = "false"
    }else{
        confirm = "true"
    }
    
    const captchaResponse = grecaptcha.getResponse();
    if (captchaResponse.length === 0){
        removeLoading();
        alert('Valide o captcha');
        throw new Error('Captcha is required');
    }

    fetch('https://api.sheetmonkey.io/form/4YHjCHRw4PDHPsghxpBwrt', {
        method: 'POST',
        headers: {
            'Aceppt': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, confirm}),
    })    
    .then(() => {
      showMessage('Obrigado por se inscrever! Você receberá nossas atualizações em breve.', 'sucess');
      form.reset();
      removeLoading();               
      //window.location.href = 'https://www.airyiot.com';
  })
  .catch(() => {
    showMessage('Houve um problema ao enviar o formulário.', 'error');
    removeLoading();
  });
}

function showMessage(message, type) {
  const messageBox = document.createElement('div');
  messageBox.className = `message ${type}`;  
  messageBox.textContent = message;
  document.body.appendChild(messageBox);

  setTimeout(() => {
      messageBox.remove();
  }, 5000); 
}

document.querySelector('form').addEventListener('submit', handleSubmit);



function showProject(projectId) {
    // Oculta todos os projetos antes de mostrar o específico
    var projects = document.querySelectorAll('.project-content');
    projects.forEach(function(project) {
        project.style.display = 'none';
    });

    // Ativa o overlay com transição
    var overlay = document.getElementById('projectOverlay');
    overlay.style.display = 'flex'; // Primeiro mostra o overlay
    setTimeout(function() {
        overlay.classList.add('active'); // Então aplica a classe para iniciar a animação
    }, 10); // Pequeno delay para garantir que a transição funcione

    var project = document.getElementById(projectId);
    project.style.display = 'block';
}

function goBack() {
    // Inicia a animação de fechamento removendo a classe 'active'
    var overlay = document.getElementById('projectOverlay');
    overlay.classList.remove('active');

    // Aguarda o final da transição antes de esconder o overlay
    setTimeout(function() {
        overlay.style.display = 'none';
        
        // Esconde todos os projetos
        var projects = document.querySelectorAll('.project-content');
        projects.forEach(function(project) {
            project.style.display = 'none';
        });
    }, 500); // Tempo da animação (deve coincidir com o valor da transição no CSS)
}

//Implementação pra carrossel de fotos, ou cards
const carouselContainer = document.querySelector('.carousel__container');
const prevButton = document.querySelector('.carousel__control.prev');
const nextButton = document.querySelector('.carousel__control.next');
let currentIndex = 0;
const totalItems = carouselContainer.children.length;
const itemsPerPage = 2;
const totalPages = Math.ceil(totalItems / itemsPerPage);
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let isDragging = false;
let animationID;
let startPos = 0;
let isDraggingWithMouse = false;

function updateCarousel() {
  const itemWidth = carouselContainer.children[0].clientWidth;
  currentTranslate = -currentIndex * itemWidth * itemsPerPage;
  carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function touchStart(index) {
  return function(event) {
    isDragging = true;
    startX = getPositionX(event);
    startPos = currentTranslate;
    animationID = requestAnimationFrame(animation);
    carouselContainer.classList.add('grabbing');
    isDraggingWithMouse = event.type.includes('mouse');
  };
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startX;
  }
}

function touchEnd() {
  if (!isDragging) return;
  isDragging = false;
  cancelAnimationFrame(animationID);
  const movedBy = currentTranslate - startPos;

  if (movedBy < -100 && currentIndex < totalPages - 1) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setPositionByIndex();
  carouselContainer.classList.remove('grabbing');
  prevTranslate = currentTranslate;
  isDraggingWithMouse = false;
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setCarouselPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setCarouselPosition() {
  carouselContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  const itemWidth = carouselContainer.children[0].clientWidth;
  currentTranslate = -currentIndex * itemWidth * itemsPerPage;
  prevTranslate = currentTranslate;
  setCarouselPosition();
}

// Controle de botões
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % totalPages;
  setPositionByIndex();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + totalPages) % totalPages;
  setPositionByIndex();
});

// Eventos de swipe
carouselContainer.addEventListener('touchstart', touchStart(), { passive: true });
carouselContainer.addEventListener('touchmove', touchMove, { passive: true });
carouselContainer.addEventListener('touchend', touchEnd);

carouselContainer.addEventListener('mousedown', touchStart());
carouselContainer.addEventListener('mousemove', touchMove);
carouselContainer.addEventListener('mouseup', touchEnd);
carouselContainer.addEventListener('mouseleave', () => {
  if (isDraggingWithMouse) touchEnd();
});

// Inicialize o carrossel na posição correta
updateCarousel();

// Rotação automática a cada 3 segundos (somente se não estiver interagindo com o carrossel)
setInterval(() => {
  if (!isDragging) {
    nextButton.click();
  }
}, 3000);


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    //reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
