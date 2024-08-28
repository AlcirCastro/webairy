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
    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    const check = document.getElementById('check').checked;
    let confirm = "";
    if (!check){
        confirm = "false"
    }else{
        confirm = "true"
    }
    
    const captchaResponse = grecaptcha.getResponse();
    if (!captchaResponse.length > 0){
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
        body: JSON.stringify({name, email, message, confirm}),
    }).then(() => removeLoading());
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
