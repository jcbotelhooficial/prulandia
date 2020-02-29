var memory = {
  persons: [],
  objects: [],
  score: 0,
  move: 25,
  sizePersons: 65,
  screen: {
    width: parseInt($(document).width()),
    height: parseInt($(document).height())
  }
};

$('#play').click(function() {
  $('#controller').hide();
  $('#screen').show();

  loadPerson();
  loadEnemy();

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

    personleft = parseInt($person.css('left'));
    persontop = parseInt($person.css('top'));

    switch (e.which) {
      case bright:
        $person.css({
          'left': `${personleft + memory.move}px`,
          'background-position': '0 0'
        });
        break;
    
      case bleft:
        if (personleft > 0) {
          $person.css({
            'left': `${personleft - memory.move}px`,
            'background-position': '-130px 0'
          });
        }
        break;
      
      case bbottom:
        $person.css({
          'top': `${persontop + memory.move}px`,
          'background-position': '-65px 0'
        });
        break;
      
      case btop:
        if (persontop > 0) {
          $person.css({
            'top': `${persontop - memory.move}px`,
            'background-position': '0 -65px'
          });
        }
        break;
      
      case bspace:
        track('effects', 'pru.m4a');
        break;
    }
  }
});

function searchEnemyPosition() {
  return false;
}

function loadEnemy(quantity = 20) {
  width = memory.screen.width - memory.sizePersons;
  height = memory.screen.height - memory.sizePersons;

  for (let i = 0; i < quantity; i++) {

    var positionx = getRandomArbitrary(width),
        positiony = getRandomArbitrary(height),
        enemyid = positionx + positiony;

    memory.persons.push({
      id: enemyid,
      x: positionx,
      y: positiony
    });

    $enemy = $(`<div></div>`);
    $enemy.addClass('enemy');
    $enemy.attr({'data-id': enemyid});
    $enemy.css({
      left: positionx,
      top: positiony,
      width: `${memory.sizePersons}px`,
      height: `${memory.sizePersons}px`
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
  var x = parseInt($person.css('left')),
      y = parseInt($person.css('top')),
      width = parseInt($person.css('width')),
      height = parseInt($person.css('height')),
      minx = x + width,
      miny = y + height;

  return Math.random() * (max - minx) + minx;
}