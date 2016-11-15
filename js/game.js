// figure's types
var fTypes = ['Q', 'L', 'J', 'I', 'S', 'Z', 'T'];

//bg cube matrix
var cubeBg = [];

//cell matrix
var cubeM = [];

//active figure
var activeFigure = null;

//figures stack
var stack = [];

//game speed
var speed = 1000;

//points
var points = 0;

//point per line;
var ppl = 100;

//speed increased
var inc = 1;

//field initialization
initField('field', 20, 10);

//initializtion of cell matrix
initMatrix();

//init figures stack
initStack();

//show next figure field init
initField('place', 4, 4);

//активная фигура
activeFigure = stack.shift();
activeFigure.addToField('field');
activeFigure.calcCords();

setPoints(0);

showNext();

//move loop
var game = setInterval(function () {
  activeFigure.chekcCords();

  if (!activeFigure.checkGround(cubeM)) {

    putCubes(activeFigure.cubes, cubeM);

    checkLines(cubeM);

    activeFigure = null;

    activeFigure = stack.shift();

    activeFigure.addToField('field');

    stack.push(createFigure());

    activeFigure.resetCords();

    showNext();

    // console.log(stack);
  }

  activeFigure.moveFigure();
  activeFigure.calcCords();
}, speed);

//game loop
// setInterval(function () {
//   activeFigure.calcCords();
//   // activeFigure.getProjection(cubeBg, cubeM);
//     if (!activeFigure.checkGround(cubeM)) {

//     putCubes(activeFigure.cubes, cubeM);

//     checkLines(cubeM);

//     activeFigure = null;

//     activeFigure = createFigure();

//   }
// }, 20);

