$(document).ready(function() {
  $('a[href="#posQ1"]').click(function(){
  	$('.layout_q1').css('display', 'inline');
  	$('.row').css('display', 'none');
  });
  $('a[href="#posQ2"]').click(function(){
    $('.layout_q2').css('display', 'inline');
    $('.row').css('display', 'none');
  });
  $(".layout_q1 [href='#top']").click(function(){
  	$('.layout_q1').css('display', 'none');
  	$('.row').css('display', 'inline');
  });
  $(".layout_q2 [href='#top']").click(function(){
    $('.layout_q2').css('display', 'none');
    $('.row').css('display', 'inline');
  });
  $("#btn-scoreboard").click(function(){
 	$('#scorepage').toggle();
  });
  $("#btn-reset").click(function(){

  });
});