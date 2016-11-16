

///////////////////////////////////
// Дополгительныей функции
//////////////////////////////////

//init figures stack 
function initStack () {
  for (var i = 0; i < 5; i++) {
    stack[i] = createFigure();
  }
};


// function which initialize bg cubes
function initField (id, row, col) {
  for (var i = 0; i < row; i++) {
    cubeBg[i] = [];
    for (var j = 0; j < col; j++) {
      cubeBg[i][j] = document.createElement('div');
      cubeBg[i][j].setAttribute('class', 'cube_f');
      document.getElementById(id).appendChild(cubeBg[i][j]);
    }
  }
};

//инициалицзации матрицы кубов
function initMatrix () {
  for (var i = 0; i < 20; i++) {
    cubeM[i] = []; 
    for (var j = 0; j < 10; j++) {
      cubeM[i][j] = null;
    }
  }
};

//положиить куб в матрицу
function putCubes (cubes, m) {
  for (var i = 0; i < cubes.length; i++) {
    var y = parseInt(cubes[i].element.style.top, 10) / 20;
    var x = parseInt(cubes[i].element.style.left, 10) / 20;
    if (y <= 0) {
      clearInterval(game);
      console.log('GAME OVER');
      console.log(game);
      showGameOver();
      break;
    }
    m[y][x] = cubes[i];
  }
};

//проверка линий
function checkLines (m) {
  var count = 0;
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 10; j++) {
      if (m[i][j] == null)
        break
      else if (j == 9) {
        deleteLine(i);
        shiftLines(i);
        count++;
      }
    }
  }
  if (count != 0)
    setPoints(count);
};

//удалить линию
function deleteLine (index) {
  for (var i = 0; i < 10; i++) {
    document.getElementById('field').removeChild(cubeM[index][i].element);
    cubeM[index][i] = null;
  }
};

//сдвинуть линию
function shiftLines(index) {
  for (var i = index - 1 ; i >= 0; i--) {
    for (var j = 0; j < 10; j++) {
      if (cubeM[i][j] != null) {
        cubeM[i][j].element.style.top = parseInt(cubeM[i][j].element.style.top, 10) + 20 + "px";
        cubeM[i + 1][j] = cubeM[i][j];
        cubeM[i][j] = null;
      }
    }
  }
};

//show next figure
function showNext () {
  var miniF = document.getElementById('place');
  var cubes = document.querySelectorAll('.place .cube_g');
  for (var i = 0; i < cubes.length; i++) {
    miniF.removeChild(cubes[i]);
  }
  stack[0].cubes[1].element.style.left = "20px";
  stack[0].cubes[1].element.style.top = "20px";
  stack[0].calcCords();
  stack[0].addToField('place');
};

// создать фигуру
function createFigure () {
  var type = fTypes[Math.floor(Math.random() * 7)];
  if (type == 'Q')
    return new Q(Math.floor(Math.random() * 4) + 1);
  else if (type == 'L') 
    return new L(Math.floor(Math.random() * 4) + 1);
  else if (type == 'J') 
    return new J(Math.floor(Math.random() * 4) + 1);
  else if (type == 'S') 
    return new S(Math.floor(Math.random() * 4) + 1);
  else if (type == 'Z') 
    return new Z(Math.floor(Math.random() * 4) + 1);
  else if (type == 'I') 
    return new I(Math.floor(Math.random() * 4) + 1);
  else if (type == 'T') 
    return new T(Math.floor(Math.random() * 4) + 1);
  // return new T(1);
};

//установить очки
function setPoints (count) {
  var bonuses = 5 * count * count;
  points += ppl * count + bonuses;
  if (points / 1000 > inc) {
    inc++;
    speed -= 50;
    clearInterval(game);
    game = setInterval(function () {
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
  }
  updateView(points);
};

//update view 
function updateView (points) {
  document.getElementById('score').textContent = "Score: " + points;
  document.getElementById('speed').textContent = "Speed: " + Math.round(1000 * 100 / speed) / 100 + "x";
};

function showGameOver() {
  document.getElementById('go').classList.add('active');
};

// слушатели событий 
document.addEventListener('keyup', function (event) {
  console.log(event);
  //елси нажата стрелка влево
  if (event.keyCode == 37)
    activeFigure.moveLeft(cubeM);
  
  //елси нажата стрелка вправо
  if (event.keyCode == 39) 
    activeFigure.moveRight(cubeM);
  
  //елси нажата кнопка 'r'
  if (event.keyCode = 82) {
    activeFigure.turn();
    activeFigure.calcCords();
  }
});

document.addEventListener('keydown', function (event) {
  // есди нажата стрелка вниз
  if (event.keyCode == 40) {
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
    console.log('tut');
  }
});