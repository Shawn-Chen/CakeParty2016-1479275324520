$(function() {
  $('a[href="#posQ1"]').click(function(){
  	$('.layout_q1').css('display', 'inline');
  	$('.row').css('display', 'none');
  });
  $(".layout_q1 [href='#top']").click(function(){
  	$('.layout_q1').css('display', 'none');
  	$('.row').css('display', 'inline');
  });
  $("#btn-scoreboard").click(function(){
 	$('#scorepage').toggle();
  });
  $("#btn-reset").click(function(){
  	
  });
});