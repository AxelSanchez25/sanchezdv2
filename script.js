////slider-carrusel de imagenes 
let carrusel = document.querySelector('.carrusel-container');
if (!carrusel) {
    console.error('El contenedor del carrusel no existe en el DOM.');
} else {
    // Tu código actual aquí
    carrusel = document.querySelector('.carrusel-container');
    const slides = document.querySelectorAll('.carrusel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;
    
    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      carrusel.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;
    }
    // prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    // nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    // Cambio automático cada 5 segundos
setInterval(() => showSlide(currentIndex + 1), 7000);
}


///////fondo de luz 
//-------------------------------------------
const turnRatio = 0.1;   //how much the lines turns
const bc = '121, 0, 202' //RGB line color
const speed = 20;       //the line moving speed
const lineWidth = 2;
const backgroundColor = 'rgba(0, 0, 0, 0.31)';
//-------------------------------------------


const canvas = document.querySelector('canvas'); 
const ctx = canvas.getContext('2d');
//shortcuts
const PI = Math.PI, rand = Math.random, cos = Math.cos, sin = Math.sin;
//directions that the lines could go
const dirs = [0, PI/2, PI, PI/2*3, PI/4, PI/4*3, PI/4*5, PI/4*7]


const onResize = () =>{
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  //console.log('resized');
}
onResize();
addEventListener('resize',onResize);
const lines = [];

function screenInit(){
  const amountParticles = Math.min(canvas.width*canvas.height*0.000032, 20)
  for(let i=0;i<amountParticles;i++){
    lines.push(new RunningLine(canvas, ctx));
  }
  requestAnimationFrame(animateAll);
}
function animateAll(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0,0,canvas.width, canvas.height);
  lines.forEach(v=>v.draw(ctx));
  //console.log(lines[0].x, lines[0].y)
  ////console.log('aa');
  requestAnimationFrame(animateAll);
}


class RunningLine {
  prevTurnPoint = []
  constructor(canvas, ctx){

    this.init();
  }
  init(){
    this.prevTurnPoint = []
    const r = rand()
    if(r<0.25){
      this.x = rand()*canvas.width;
      this.dir = dirs[1];
      this.y = 0;
    }else if(r<0.5){
      this.x = rand()*canvas.width;
      this.dir = dirs[3];
      this.y = canvas.height;
    }else if(r<0.75){
      this.x = 0;
      this.dir = dirs[0];
      this.y = rand()*canvas.height;
    }else {
      this.x = canvas.width;
      this.dir = dirs[2];
      this.y = rand()*canvas.height;
    }
    //this.dir = dirs[dirs.length*rand()^0]
    this.prevTurnPoint.push({
      x:this.x,
      y:this.y,
    })
    this.width = lineWidth;

    this.v = speed;

    this.vx = this.v*cos(this.dir);
    this.vy = this.v*sin(this.dir);
    this.fadeout = false;
    this.opacity = (rand())**0.2
    this.color = `rgba(${bc}, ${this.opacity})`;
    //console.log(this.x, this.y);
  }
  draw(ctx){
    //console.log(this.opacity);
    if(this.fadeout){
      if(this.opacity<0.1){
        this.init();

      }else{
        this.opacity*=0.9;
        this.color = `rgba(${bc}, ${this.opacity})`;
        //console.log(this.opacity);
      }

    }else{
      this.outOfScreen()
      this.x+=this.vx;
      this.y+=this.vy;

      if(rand()<turnRatio)this.turn()
    }
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.width;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    //let remainL = this.length;
    //let continuous = true, lastLen=0;
    for(let i=this.prevTurnPoint.length-1;i>=0;i--){
      const p = this.prevTurnPoint[i];
      ctx.lineTo(p.x,p.y);
    }
    ctx.stroke();
    //ctx.filter = 'none';
    ctx.closePath();

  }
  turn(){
    const choice = dirs.filter(v=>{
      let a = Math.abs(this.dir-v);
      if(a>PI)a=2*PI-a;
      return a<=PI/2
    })
    //console.log(choice);
    this.dir = choice[rand()*choice.length^0]
    this.vx = this.v*cos(this.dir);
    this.vy = this.v*sin(this.dir);
    this.prevTurnPoint.push({
      x:this.x,
      y:this.y,
    })

  }
  outOfScreen(){
    if(this.x>=canvas.width&&this.vx>0||this.y>=canvas.height&&this.vy>0||this.x<=0&&this.vx<0||this.y<=0&&this.vy<0){
      this.fadeout = true;
    }
  }
}
window.onload = screenInit

//////////////////////prueba tex 
const wordWrapper = document.getElementById('word');
if (!wordWrapper) {
    console.error('El elemento con ID "word" no existe en el DOM.');
} else {
    // Tu código actual aquí
    var words = ['hola','bienvenido', 'a', 'mi', 'web'],
    wordWrapperContent = wordWrapper.innerHTML,
    addingWord = false,
    counter = 1;

setInterval(function(){

  if(wordWrapperContent.length > 0 && !addingWord ) {
    wordWrapper.innerHTML = wordWrapperContent.slice(0, -1);
    wordWrapperContent = wordWrapper.innerHTML;
  } else {
    addingWord = true;
  }

  if( addingWord ){
    if( wordWrapperContent.length < words[counter].length  ) {
      wordWrapper.innerHTML = words[counter].slice(0, wordWrapperContent.length + 1);
      wordWrapperContent = wordWrapper.innerHTML;
    } else {
      if( counter < words.length) {
        counter ++
      }
      addingWord = false;
    }
  }

  if( counter == words.length) {
    counter = 0;
  }
///ASINCRONISMO
}, 200);
}





///////////////////////////////////barra de navegacion scroll
// Seleccionamos el elemento de la barra de navegación
const nav = document.querySelector("nav");

// Escuchamos el evento de desplazamiento
window.addEventListener("scroll", () => {
  if (window.scrollY > 1100) { // Si el desplazamiento supera los 50px
    nav.style.height = "30px"; // Cambia el tamaño de la barra de navegación
    nav.style.backgroundColor = "#00000079"; // Cambia el color a rojo
  } else {
    nav.style.height = "30px"; // Tamaño original cuando estás al principio
    nav.style.backgroundColor = "black"; // Cambia el color a azul
  }
});

//////////////activar links
const links = document.querySelectorAll(".nav-link"); // Selecciona los enlaces

links.forEach(link => {
  link.addEventListener("click", () => {
    // Elimina la clase 'active' de todos los enlaces
    links.forEach(link => link.classList.remove("active"));
    // Agrega la clase 'active' al enlace seleccionado
    link.classList.add("active");
  });
});

///menu hamburguesa
// selector
var menu = document.querySelector('.hamburger');

// method
function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".nav-right" ).classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener('click', toggleMenu, false);

//Solución con jQUery
/*$(document).ready(function(){
	$('.hamburger').click(function() {
		$('.hamburger').toggleClass('is-active');
		$('.menuresponsive').toggleClass('is-active');
		return false;
	});
});*/


