// Cube constructor
function Cube () {
  var self = this;
  
  self.element = document.createElement('div');
  self.element.setAttribute('class', 'cube_g');
  self.element.style.top = "-20px";
  self.element.style.left = "0px";
}

// Figure constructore
function Figure (pos) {
  var self = this;

  //кубики бля постройки фигуры
  self.cubes = [new Cube (), new Cube (), new Cube (), new Cube ()];

  //двигается фигура или нет
  self.move = true;

  //НАЧАЛЬНОЕ ПОЛОЖЕНИЕ ФИГУРЫ
  self.pos = pos;

  //сбросить координаты
  self.resetCords = function () {
    self.cubes[1].element.style.top = -80 + "px";
    self.cubes[1].element.style.left = 80 + "px";
  };
  
  //создангие фигуры
  self.createFigure = function () {
    setColor();

    self.resetCords();
  }();

  //движение фигуры вниз фигуры
  self.moveFigure = function () {
    if (self.move) {
      self.cubes[1].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";
    };
  };

  //проверка на столкновение
  self.checkGround = function (m) {
    var x = 0;
    var y = 0;
    for (var i = 0; i < self.cubes.length; i++) {
      
      y = parseInt(self.cubes[i].element.style.top, 10) / 20;
      x = parseInt(self.cubes[i].element.style.left, 10) / 20;
      if (y > 0 || y + 1 >= 0) {
        if (y == 19) {
          self.move = false;
          break;
        } else if (m[y + 1][x] != null) {
          self.move = false;
          break;
        } else {
          self.move = true;
        }
      }
    }

    return self.move;
  };

  //движение вправо
  self.moveLeft = function (m) {
    
    for (var i = 0; i < self.cubes.length; i++) {
      
      var y = parseInt(self.cubes[i].element.style.top, 10) / 20;
      var x = parseInt(self.cubes[i].element.style.left, 10) / 20;

      if(y > 0) {
        if (x == 0) {
          return false;
        } else if (m[y][x - 1] != null) {
          return false;
        }
      }
    }

    for (var i = 0; i < self.cubes.length; i++) {
      self.cubes[i].element.style.left =  parseInt(self.cubes[i].element.style.left, 10) - 20 + "px";
    }
  };

  //движение влево
  self.moveRight = function (m) {

    for (var i = 0; i < self.cubes.length; i++) {
      
      var y = parseInt(self.cubes[i].element.style.top, 10) / 20;
      var x = parseInt(self.cubes[i].element.style.left, 10) / 20;

      if(y > 0) {
        if (x == 9) {
          return false;
        } else if (m[y][x + 1] != null) {
          return false;
        }
      }
    }

    for (var i = 0; i < self.cubes.length; i++) {
      self.cubes[i].element.style.left =  parseInt(self.cubes[i].element.style.left, 10) + 20 + "px";
    }
  };

  self.chekcCords = function () {
    for (var i = 0; i < self.cubes.length; i++) {
      if (parseInt(self.cubes[i].element.style.left) > 180) {
         self.cubes[1].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px";
      } else if (parseInt(self.cubes[i].element.style.left) < 0)  {
        self.cubes[1].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
      }
    }
  };

  // self.getProjection = function (m, m2) {
  //   var maxX = parseInt(self.cubes[0].element.style.left, 10) / 20;
  //   var minX = parseInt(self.cubes[0].element.style.left, 10) / 20;

  //   var minY = parseInt(self.cubes[0].element.style.top, 10) / 20;

  //   for (var i = 1; i < self.cubes.length; i++) {
  //     if (parseInt(self.cubes[i].element.style.left, 10) / 20 <= minX) {
  //       minX = parseInt(self.cubes[i].element.style.left, 10) / 20;
  //     }
  //     if (parseInt(self.cubes[i].element.style.left, 10) / 20 >= maxX) {
  //       maxX = parseInt(self.cubes[i].element.style.left, 10) / 20;
  //     }
  //     if (parseInt(self.cubes[i].element.style.top, 10) / 20 > minY) {
  //       minY = parseInt(self.cubes[i].element.style.top, 10) / 20;
  //     }
  //   }

  //   for (var i = 0; i < m.length; i++) {
  //     for (var j = 0; j < m[0].length; j++) {
  //       m[i][j].style.background = "#ccc";
  //     }
  //   }

  //   for (var i = 0; i < m.length; i++) {
  //     for (var j = 0; j < m[0].length; j++) {
  //       if (minY < i && j >= minX && j <= maxX) {
  //         if (m2[i][j] != null) {
  //           for (var k = 0; k < m[0].length; k++) {
  //             m[i][k].style.background = "#ccc";
  //           }
  //           return;
  //         }
  //         m[i][j].style.background = "#f00";
  //       }
  //     }
  //   }
  // };

  //установка рандомного цвета
  function setColor () {
    var str = ['f00','0f0','00f','ff0','f0f','0ff'];
    var color = "#";

    color += str[Math.floor(Math.random() * str.length)];
    
    for (var j = 0; j < self.cubes.length; j++) {
      self.cubes[j].element.style.background = color;
    }
  };

  self.turn = function () {
    self.pos++;
    if (self.pos == 5) {
      self.pos = 1;
    }
  };

  //добавление кубиков на поле
  self.addToField = function (id) {
    document.getElementById(id).appendChild(self.cubes[0].element);
    document.getElementById(id).appendChild(self.cubes[1].element);
    document.getElementById(id).appendChild(self.cubes[2].element);
    document.getElementById(id).appendChild(self.cubes[3].element);
  };
};

//cubik Q
function Q (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
    self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
    
    self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
    self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
    
    self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
    self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
  }
}

// L figure
function L (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    if (self.pos == 1) {
      
      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20  + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";

    } else if (self.pos == 2) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 3) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 4) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";

    }
  };
}

// J figure
function J (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    if (self.pos == 1) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20  + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";

    } else if (self.pos == 2) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 3) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 4) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";

    }
  };
}


// I figure
function I (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    if (self.pos == 1 || self.pos == 3) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20  + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 40 + "px";

    } else if (self.pos == 2 || self.pos == 4) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 40 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";

    }
  };
}


// S figure
function S (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    if (self.pos == 1 || self.pos == 3) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20  + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 2 || self.pos == 4) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20  + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    }
  };
}


// Z figure
function Z (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    if (self.pos == 1 || self.pos == 3) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20  + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 2 || self.pos == 4) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20  + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    }
  };
}

// T figure
function T (pos) {
  Figure.apply(this, arguments);
  
  var self = this;

  self.calcCords = function () {
    if (self.pos == 1) {
      
      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";

    } else if (self.pos == 2) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";

    } else if (self.pos == 3) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) - 20 + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";

    } else if (self.pos == 4) {

      self.cubes[0].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px"; 
      self.cubes[0].element.style.top = parseInt(self.cubes[1].element.style.top, 10) - 20 + "px";
      
      self.cubes[2].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + "px";
      self.cubes[2].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + 20 + "px";
      
      self.cubes[3].element.style.left = parseInt(self.cubes[1].element.style.left, 10) + 20 + "px"; 
      self.cubes[3].element.style.top = parseInt(self.cubes[1].element.style.top, 10) + "px";

    }
  };
}