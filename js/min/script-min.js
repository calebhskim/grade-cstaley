function play(t){var n="sounds/"+t+".wav",s=new Audio(n);s.play()}function soundbuttons(t){$.ajax({url:"script.php",type:"POST",data:{path:t,type:"sounds"},success:function(t){$("#buttons").html(t).show()}})}$(function(){soundbuttons("sounds"),$("body").on("click",'[class^="staley"]',function(){play($(this).attr("id"))})});