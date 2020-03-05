var memory = {
  persons: [],
  objects: [],
  score: 0,
  move: 25,
  sizePersons: 65,
  sizeEnemy: 45,
  screen: {
    width: $(document).width(),
    height: $(document).height()
  }
};

function pxToInt(str) {
  return parseInt(str.replace('px', ''));
}

$('#play').click(function() {
  $('#controller').hide();
  $('#screen').show();

  loadPerson();
  loadObstacles();

  track('soundtrack', 'track.mp3');
});

function track(target, filename) {
  var player = document.getElementById(target);
  player.src = 'assets/sounds/' + filename;
  player.play();
}

$(window).bind({
  keydown: function(e) {

    var bleft = 37;
    var btop = 38;
    var bright = 39;
    var bbottom = 40;
    var bspace = 32;

    $person = $('.person');

    personleft = pxToInt($person.css('left'));
    persontop = pxToInt($person.css('top'));

    switch (e.which) {
      case bright:
        $person.css({'background-position': '0 0'});
        if (personleft + memory.sizePersons + memory.move < memory.screen.width) {
          personleft += memory.move;
          $person.css({'left': `${personleft}px`});
        } else {
          personleft = memory.screen.width - memory.sizePersons;
          $person.css({'left': `${personleft}px`});
        }
        break;
    
      case bleft:
        $person.css({'background-position': '-130px 0'});
        if (personleft - memory.move > 0) {
          personleft -= memory.move;
          $person.css({'left': `${personleft}px`});
        } else {
          personleft = 0
          $person.css({'left': `${personleft}px`});
        }
        break;
      
      case bbottom:
        $person.css({'background-position': '-65px 0'});
        if (persontop + memory.sizePersons + memory.move < memory.screen.height) {
          persontop += memory.move; 
          $person.css({'top': `${persontop}px`});
        } else {
          persontop = memory.screen.height - memory.sizePersons;
          $person.css({'top': `${persontop}px`});
        }
        break;
      
      case btop:
        if (persontop > 0) {
          $person.css({
            'top': `${persontop - memory.move}px`,
            'background-position': '0 -65px'
          });
          persontop -= memory.move;
        }
        break;
      
      case bspace:
        track('effects', 'pru.m4a');
        break;
    }

    searchEnemyPosition(personleft, persontop);
  }
});

function searchEnemyPosition(x1, y1) {
  var px = x1 + memory.sizePersons,
      py = y1 + memory.sizePersons;

  memory.persons.forEach(function(enemy) {

    var x2 = enemy.x,
        y2 = enemy.y,
        ex = enemy.x + memory.sizeEnemy,
        ey = enemy.y + memory.sizeEnemy;

    if (
      (py > y2 && py < ey) && (px > x2 && px < ex) ||
      (px > x2 && px < ex) && (y1 > y2 && y1 < ey) ||
      (py > y2 && py < ey) && (x1 > x2 && x1 < ex) ||
      (x1 > x2 && x1 < ex) && (y1 > y2 && y1 < ey)
    ) {
      alert('Enemy ' + enemy.id);
    }
  });

  return false;
}

function loadObstacles(enemy = 25) {
  width = memory.screen.width - memory.sizeEnemy;
  height = memory.screen.height - memory.sizeEnemy;

  for (let i = 0; i < enemy; i++) {

    var x = getRandomArbitrary(width),
        y = getRandomArbitrary(height),
        id = x + y;

    memory.persons.push({
      type: 'enemy',
      id: id,
      x: x,
      y: y
    });

    $enemy = $(`<div></div>`);
    $enemy.addClass('enemy');
    $enemy.attr({'data-id': id});
    $enemy.css({
      left: x,
      top: y,
      width: `${memory.sizeEnemy}px`,
      height: `${memory.sizeEnemy}px`
    });

    $enemy.appendTo('#screen');
  }
}

function loadPerson() {
  $person = $('<div></div>');
  $person.addClass('person');
  $person.css({
    top: '0px',
    left: '0px',
    width: `${memory.sizePersons}px`,
    height: `${memory.sizePersons}px`
  });
  $person.appendTo('#screen');
}

function getRandomArbitrary(max) {
  $person = $('.person');
  var x = pxToInt($person.css('left')),
      y = pxToInt($person.css('top')),
      width = pxToInt($person.css('width')),
      height = pxToInt($person.css('height')),
      minx = x + width,
      miny = y + height;

  return Math.random() * (max - minx) + minx;
}