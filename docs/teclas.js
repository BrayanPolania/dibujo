/*-----------------------VARIABLES---------------------------*/
const
  containerCanvas= document.getElementById("containerCanvas"),
  sizeCanvas = containerCanvas.offsetWidth,
  canvas = document.getElementById("Canvas"),
  alto = document.getElementById("Alto"),
  ancho = document.getElementById("Ancho"),
  type16_9 = document.getElementById("type16_9"),
  value16_9 = document.getElementById("value16_9"),
  color_1 = document.getElementById("Color1"),
  colorMarco = document.getElementById("ColorMarco"),
  botonDibujar = document.getElementById("BotonDibujar"),
  botonLimpiar = document.getElementById("BotonLimpiar"),
  botonDibujarMarco = document.getElementById("BotonDibujarMarco"),
  botonGenerar16_9 = document.getElementById("BotonGenerar16_9"),
  botonAplicar16_9 = document.getElementById("BotonAplicar16_9"),
  pGenerador = document.getElementById("Generador16_9"),
  sizeBrush = document.getElementById("SizeBrush"),
  sizeOutline = document.getElementById("SizeOutline"),
  borrar = document.getElementById("Borrar"),
  btnPng = document.getElementById("btnPng"),
  btnJpg = document.getElementById("btnJpg"),
  canvasImg = document.getElementById("canvasImg"),
  lienzo = canvas.getContext("2d"),
  teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
  };
let 
  x, y, estado, color1, alto9, ancho16;

/*-----------------------FUNCIONES---------------------------*/

const primerCanvas = () => {
  let anchof =  sizeCanvas*0.965;
  let altof = (anchof*9)/16;
  canvas.width = anchof;
  canvas.height = altof;
  dibujarLimpiar();
}

function aplicar16_9() {
  alto.value = alto9;
  ancho.value = ancho16;
}

function dibujarMarco() {
  let anchof = canvas.width;
  let altof = canvas.height;
  let colorM = colorMarco.value;
  let grosorMarco = sizeOutline.value;

  dibujarLineaGrosor(colorM, grosorMarco, 1, 1, 1, altof - 1);
  dibujarLineaGrosor(colorM, grosorMarco, 1, altof - 1, anchof - 1, altof - 1);
  dibujarLineaGrosor(colorM, grosorMarco, anchof - 1, altof - 1, anchof - 1, 1);
  dibujarLineaGrosor(colorM, grosorMarco, anchof - 1, 1, 1, 1);
}

function generador16_9() {
  if (type16_9.value) {
    alto9 = value16_9.value;
    if (alto9==""){alto9="0";}//alto9 = 0, si no tine valor
    ancho16 = (alto9*16)/9;
    pGenerador.innerHTML = `El ancho es: ${ancho16}<br />Las dimensiones son ${ancho16} x ${alto9}<br />`;
  }
  else {
    ancho16 = value16_9.value;
    if (ancho16==""){ancho16="0";}//alto9 = 0, si no tine valor
    alto9 = (ancho16*9)/16;
    pGenerador.innerHTML = `El alto es: ${alto9}<br />Las dimensiones son ${ancho16} x ${alto9}<br />`;
  }  
}

//dibujar una linea con cierto grosor
function dibujarLineaGrosor(color, grosor, x_inicial, y_inicial, x_final, y_final) {
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = grosor;
  lienzo.lineCap = "round";
  lienzo.moveTo(x_inicial, y_inicial);
  lienzo.lineTo(x_final, y_final);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarBorrar() {
  if (borrar.checked == false) {
    color1 = color_1.value;
  }
  else {
    color1 = "white";
  }
}

function dibujarLimpiar() {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
  
  lienzo.fillStyle = "white";
  lienzo.fillRect(0, 0, canvas.width, canvas.height);
}

function dibujarCanvas() {
  let anchof = ancho.value;
  let altof = alto.value;
  x = anchof / 2;
  y = altof / 2;

  canvas.width = anchof;
  canvas.height = altof;
  dibujarLimpiar();
}

function dibujarMouseDown() {
  estado = 1;
}

function pararMouse() { /*cuando se levanta el click*/ 
  estado = 0;
}

function dibujarMouseMove(evento) {
  if (estado == 1) {
    x = evento.layerX;
    y = evento.layerY;
    dibujarBorrar();
    dibujarLinea(color1, x, y, x, y);
  }
}

function dibujarTeclas(evento) /*UP, DOWN, RIGHT, LEFT*/ {
  dibujarBorrar()
  let movimiento = 1;
  switch (evento.keyCode) {
    case teclas.UP:
      //console.log(evento.code);
      dibujarLinea(color1, x, y, x, y - movimiento);
      y = y - movimiento;
      break;
    case teclas.DOWN:
      //console.log(evento.code);
      dibujarLinea(color1, x, y, x, y + movimiento);
      y = y + movimiento;
      break;
    case teclas.RIGHT:
      console.log(evento.code);
      dibujarLinea(color1, x, y, x + movimiento, y);
      x = x + movimiento;
      break;
    case teclas.LEFT:
      //console.log(evento.code);
      dibujarLinea(color1, x, y, x - movimiento, y);
      x = x - movimiento;
      break;
    default:
      //console.log("otra");
  }
}

function dibujarLinea(color, x_inicial, y_inicial, x_final, y_final) {
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = sizeBrush.value;
  lienzo.lineCap = "round";
  lienzo.moveTo(x_inicial, y_inicial);
  lienzo.lineTo(x_final, y_final);
  lienzo.stroke();
  lienzo.closePath();
}

function guardarCanvas(sourceUrl) {
  //canvasImg.textContent = "";
  canvasImg.innerHTML = `
  <a href=${sourceUrl} download>
  <img src=${sourceUrl} alt="Imagen">
  </a>`;
}

/*------------------------CODIGO-----------------------------*/

btnJpg.addEventListener("click", () => {
  canvasImg.style.transform= "translateY(150%)";
  guardarCanvas(canvas.toDataURL("image/jpeg"))
})
btnPng.addEventListener("click", () => {
  canvasImg.style.transform= "translateY(150%)";
  guardarCanvas(canvas.toDataURL("image/png"))
})
canvasImg.addEventListener("click", () => {
  canvasImg.style.transform= "translateY(0)";
})
/* function displayRules () {
  rules.style.transform= "translateY(100vh)";
}
function closeRules () {
  rules.style.transform= "translateY(0)";
}
*/
document.addEventListener("keydown", dibujarTeclas);
canvas.addEventListener("mousedown", dibujarMouseDown);
canvas.addEventListener("mousemove", dibujarMouseMove);
document.addEventListener("mouseup", pararMouse);
botonDibujar.addEventListener("click", dibujarCanvas);
botonLimpiar.addEventListener("click", dibujarLimpiar);
botonDibujarMarco.addEventListener("click", dibujarMarco);
botonGenerar16_9.addEventListener("click", generador16_9);
botonAplicar16_9.addEventListener("click", aplicar16_9);

type16_9.addEventListener("change", () =>{(type16_9.value) ? value16_9.placeholder = "1080" : value16_9.placeholder = "1920";
});

console.log(sizeCanvas);
primerCanvas();



//TODO: Comentar - depurar?, agregar el tamaño y los demas apartados en el loval estorage.
//FIXME: borrador(colorear blanco a colorear transparente o borrar)