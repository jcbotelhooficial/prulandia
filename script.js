var memory = {
  persons: [],
  objects: [],
  score: 0,
  move: 50,
  sizePerson: 120,
  quantityStartEnemy: 20
};

$('#play').click(function() {
  $('#controller').hide();
  $('#screen').show();

  loadPerson();
  loadEnemy(memory.quantityStartEnemy);

  //track('soundtrack', 'track.mp3');
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
            'background-position': '0 -120px'
          });
        }
        break;
      
      case bbottom:
        $person.css({
          'top': `${persontop + memory.move}px`,
          'background-position': '-240px 0'
        });
        break;
      
      case btop:
        $person.css({
          'top': `${personleft - memory.move}px`
        });
        break;
      
      case bspace:
        track('effects', 'pru.m4a');
        break;
    }
  }
});

function loadEnemy(quantity) {
  width = parseInt($(document).width()) - 120;
  height = parseInt($(document).height()) - 120;

  console.log('>>>', width, height);

  for (let i = 0; i < quantity; i++) {
    $enemy = $(`<div></div>`);
    $enemy.addClass('enemy');
    $enemy.css({
      'left': getRandomArbitrary(width),
      'top': getRandomArbitrary(height)
    });

    $enemy.appendTo('#screen');
  }
}

function loadPerson() {
  $person = $('<div></div>');
  $person.addClass('person');
  $person.css({
    width: `${memory.sizePerson}px`,
    height: `${memory.sizePerson}px`,
    top: '0px',
    left: '0px'
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

  console.log(max, x, y);

  return Math.random() * (max - minx) + minx;
}