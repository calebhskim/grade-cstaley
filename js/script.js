function play(id) {
   var path = "sounds/" + id + ".wav";
   var sound = new Audio(path);
   sound.play();
}

function soundbuttons(directory){
   $.ajax({
      url: 'script.php',
      type: 'POST',
      data: {
         path: directory,
         type: "sounds",
      },
      success: function(msg) {
         $('#buttons').html(msg).show();
      }
   });
}

$(function(){
   soundbuttons('sounds');
   $('body').on('click', '[class^="staley"]', function() {
      play($(this).attr('id'));
   });
});
