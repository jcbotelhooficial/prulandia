var memory = {
  persons: [],
  objects: [],
  score: 0,
  move: 50
};

$('#play').click(function() {
  $('#controller').hide();
  $('#screen').show();

  $('#screen').append('<div class="person"></div>');
  loadEnemy(20);

  setInterval(function() {
    loadEnemy(5);
  }, 3000)
});

function track(filename) {
  var player = document.getElementById('player');
  player.src = 'assets/sounds/' + filename + '.m4a';
  player.play();
}

$(document).bind({
  keyup: function(e) {

    var bleft = 37;
    var btop = 38;
    var bright = 39;
    var bbottom = 40;
    var bspace = 32;

    var key = e.which;

    if (key == bright) {
      track('pru2');
      left = parseInt($('.person').css('left'));

      $('.person').css({'left': left + memory.move})
    }

    if (key == bleft) {
      left = parseInt($('.person').css('left'));
      if (left > 0) {
        $('.person').css({'left': left - memory.move});
      }
    }
    
    if (key == bbottom) {
      top = parseInt($('.person').css('top'));
      $('.person').css({'top': top + memory.move});
    }

    if (key == bspace) {
      track('pru');
    }
  }
});

function loadEnemy(quantity) {
  width = parseInt($(document).width()) - 100;
  height = parseInt($(document).height()) - 100;

  for (let i = 0; i < quantity; i++) {
    $('#screen').append('<div class="enemy" style="left: ' + getRandomArbitrary(width) + 'px; top: ' 
    + getRandomArbitrary(height) + 'px;"></div>');
  }
}

function getRandomArbitrary(max) {
  return Math.random() * (max - 0) + 0;
}