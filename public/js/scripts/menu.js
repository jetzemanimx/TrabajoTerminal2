// $(document).ready(function() {
// 	$('.boton-menu').click(function() {
//   	$('.nav-menu').slideToggle();
// 	});
// });
$(document).ready(main);
var contador = 1;
function main(){
	$('.nav-menu').click(function(){
		// $('nav').toggle(); 
		if(contador == 1){
			$('.panel-aside').animate({
				left: '0'
			});
			$('.label').css('display', 'block');
			contador = 0;
		} else {
			contador = 1;
			$('.panel-aside').animate({
				left: '-100%'
			});
			$('.label').css('display', 'none');
		}
	});
}