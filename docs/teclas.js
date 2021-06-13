var canvas = document.getElementById("Canvas");
var alto = document.getElementById("Alto");
var ancho = document.getElementById("Ancho");
var altoAspecto = document.getElementById("AltoAspecto");
var color_1 = document.getElementById("Color1");
var colorMarco = document.getElementById("ColorMarco");
var botonDibujar = document.getElementById("BotonDibujar");
var botonLimpiar = document.getElementById("BotonLimpiar");
var botonDibujarMarco = document.getElementById("BotonDibujarMarco");
var botonGenerar16_9 = document.getElementById("BotonGenerar16_9");
var botonAplicar16_9 = document.getElementById("BotonAplicar16_9");
var sizeBrush = document.getElementById("SizeBrush");
var sizeOutline = document.getElementById("SizeOutline");
var borrar = document.getElementById("Borrar");
var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
};
var lienzo = canvas.getContext("2d");
var x;
var y;
var estado;
var color1;
var alto9;
var ancho16;

document.addEventListener("keydown", dibujarTeclas);
canvas.addEventListener("mousedown", dibujarMouseDown);
canvas.addEventListener("mousemove", dibujarMouseMove);
document.addEventListener("mouseup", pararMouse);
botonDibujar.addEventListener("click", dibujarCanvas);
botonLimpiar.addEventListener("click", dibujarLimpiar);
botonDibujarMarco.addEventListener("click", dibujarMarco);
botonGenerar16_9.addEventListener("click", generador16_9);
botonAplicar16_9.addEventListener("click", aplicar16_9);


function aplicar16_9()
{
  alto.value = alto9;
  ancho.value = ancho16;
}

function dibujarMarco()
{
  var anchof = canvas.width;
  var altof = canvas.height;
  var colorM = colorMarco.value;
  var grosorMarco = sizeOutline.value;


  dibujarLineaGrosor(colorM, grosorMarco, 1, 1, 1, altof - 1);
  dibujarLineaGrosor(colorM, grosorMarco, 1, altof - 1, anchof - 1, altof - 1);
  dibujarLineaGrosor(colorM, grosorMarco, anchof - 1, altof - 1, anchof - 1, 1);
  dibujarLineaGrosor(colorM, grosorMarco, anchof - 1, 1, 1, 1);
}

function generador16_9() 
{
  alto9 = altoAspecto.value;
  ancho16 = (alto9*16)/9;
  var pGenerador = document.getElementById("Generador16_9");//label
  //var resultado = document.createTextNode(ancho16);
  pGenerador.innerHTML = "El ancho es: " + ancho16 + 
  "<br /> Las dimensiones son " + ancho16 + " x " + alto9 + "<br />";
}

//dibujar una linea con cierto grosor
function dibujarLineaGrosor(color, grosor, x_inicial, y_inicial, x_final, y_final)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = grosor;
  lienzo.lineCap = "round";
  lienzo.moveTo(x_inicial, y_inicial);
  lienzo.lineTo(x_final, y_final);
  lienzo.stroke();
  lienzo.closePath();
}

function dibujarBorrar()
{
  if (borrar.checked == false)
  {
    color1 = color_1.value;
  }
  else
  {
    color1 = "white";
  }
}

function dibujarLimpiar()
{
  var anchof = ancho.value;
  var altof = alto.value;
  canvas.width = anchof;
  canvas.height = altof;
}

function dibujarCanvas()
{
  var anchof = ancho.value;
  var altof = alto.value;
  x = anchof / 2;
  y = altof / 2;

  canvas.width = anchof;
  canvas.height = altof;

  dibujarLinea("red", 1, 1, 1, altof - 1);
  dibujarLinea("red", 1, altof - 1, anchof - 1, altof - 1);
  dibujarLinea("red", anchof - 1, altof - 1, anchof - 1, 1);
  dibujarLinea("red", anchof - 1, 1, 1, 1);

  dibujarLinea("red", x, y, x, y);
}

function dibujarMouseDown(evento)
{
  estado = 1;
}

function pararMouse(evento) /*cuando se levanta el click*/
{
  estado = 0;
}

function dibujarMouseMove(evento)
{
  if (estado == 1) 
  {
    x = evento.layerX;
    y = evento.layerY;
    dibujarBorrar()
    dibujarLinea(color1, x, y, x, y);
  }
}

function dibujarTeclas(evento) /*UP, DOWN, RIGHT, LEFT*/
{
  dibujarBorrar()
  var movimiento = 1;
  switch (evento.keyCode)
  {
    case teclas.UP:
      console.log(evento.code);
      dibujarLinea(color1, x, y, x, y - movimiento);
      y = y - movimiento;
      break;
    case teclas.DOWN:
      console.log(evento.code);
      dibujarLinea(color1, x, y, x, y + movimiento);
      y = y + movimiento;
      break;
    case teclas.RIGHT:
      console.log(evento.code);
      dibujarLinea(color1, x, y, x + movimiento, y);
      x = x + movimiento;
      break;
    case teclas.LEFT:
      console.log(evento.code);
      dibujarLinea(color1, x, y, x - movimiento, y);
      x = x - movimiento;
      break;
    default:
      console.log("otra");
  }
}

function dibujarLinea(color, x_inicial, y_inicial, x_final, y_final)
{
  lienzo.beginPath();
  lienzo.strokeStyle = color;
  lienzo.lineWidth = sizeBrush.value;
  lienzo.lineCap = "round";
  lienzo.moveTo(x_inicial, y_inicial);
  lienzo.lineTo(x_final, y_final);
  lienzo.stroke();
  lienzo.closePath();
}




//TODO: Comentar - depurar?
//FIXME: borrador(colorear blanco a colorear transparente o borrar)