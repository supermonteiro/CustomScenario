
var activity_data = null;
var data_answers = null;
var correctIcons = 0,
	passing_grade = 0,
	total_questions = 0;
var primary_color = null,
	border_color_1= null,
	border_color_2= null,
	accent_color_1 = null,
	accent_color_2 = null,
	accent_color_3 = null,
	accent_color_4 = null;

jQuery.fn.extend({
	centerLabel: function() {
		$(this).css({
			'top': 'calc(50% - '+($(this).height()/2)+'px)'
		});
	}
});

$(function ($) {		
	getData('activity_data.json');
	initListeners();
});

function initActivity() {
	var delay = .1;
	
	TweenMax.set($('.circle-ico'), {opacity: 0});
	
	/* dinamically colored buttons */
	primary_color = activity_data.primary_color;
	border_color_1 = activity_data.border_color_1;
	border_color_2 = activity_data.border_color_2;
	accent_color_1 = activity_data.accent_color_1;	
	accent_color_2 = activity_data.accent_color_2;
	accent_color_3 = activity_data.accent_color_3;
	accent_color_4 = activity_data.accent_color_4;
	
	
	/*test variables*/
	passing_grade = activity_data.passing_score;
	
	$(".btn").css({
		'background': primary_color			
	});
							
	$(".btn").bind('mouseover', function() {		
		$(this)[0].style.backgroundColor = accent_color_2;

		$(".btn").bind('mouseout', function () {
			$(this)[0].style.backgroundColor = primary_color;
        });
	});	
	
	css().bind(".title-1", {	
		"color": primary_color			
	});
	
	css().bind(".instructions", {	
		"color": accent_color_1			
	});
	
	css().bind(".left_option:hover", {	  
	  "background-color" : accent_color_1
	});
	
	css().bind(".right_option:hover", {	  
	  "background-color" : accent_color_1
	});
	
	css().bind(".color_text", {	  
	  "color" : accent_color_2
	});
	
	css().bind(".options", {	  
	  "color" : accent_color_4
	});
	
	css().bind(".circle-ico", {	  
	  "background-color" : border_color_1
	});
		
	css().bind(".circle-ico .center", {	  
	  "background-color" : border_color_1
	});	
	
	css().bind(".circle-ico .center", {	  
	  "color" : "#fff"
	});	
	
	css().bind(".circle-ico-answer:hover", {	  
	  "border-color" : accent_color_2
	});
			
	/* randomly re-order the icons and labels
	if (activity_data.randomize_options) {
		activity_data.options.sort(function(a, b){return 0.5 - Math.random()});	
	}*/	
	
	var iconsContainer = $('.icons-container'),
			initCount = 0;
	
	var carouselContainer = $('.carousel-inner'),
			initCount = 0;
	
	var resultsContainer = $('.results-inner'),
			initCount = 0;
	
	var labelsContainer = $('.icons-labels-container').empty(),
			initCount = 0;
	
	var answersContainer = $('.answers-container').empty(),
			initCount = 0;
	
	$.each(activity_data.options, function(index, obj){
		/* populate intro and question */
		//$('.intro').html(obj.intro);
		//$('.question').html(obj.question);
		
		/* populate icons */
		var answerCode = null;
		var answer = obj.answer;
		
		
		
		var icons = $('<div class="circle-ico" id="icon-'+index+'">')
			.data({index: answerCode, info: obj})
			.html('<div class="center"><i  id="dot-'+index+'" class="grade fa fa-circle-thin" aria-hidden="true"></i></div>')		
			.appendTo(iconsContainer);
		
		var icon = $('.circle-ico:eq('+index+')');				
		
		//color the first progress circle
		$('.circle-ico:eq(0)').children('.center').addClass('current');
		$('.circle-ico:eq(0)').addClass('current');
		
		
		//populate carousel
		total_questions++;
		if (index == 0) {
			var carousels = $('<div class="carousel-item active" id="slide-'+index+'">')
			.data({info: obj})
			.html('<img class="d-block w-100" src="'+obj.image+'" ">'+
				  '<div class="carousel-caption"><h5 class="intro">'+obj.intro+'</h5></div>'+
				  '<p class="question">'+obj.question+'</p>')		
			.appendTo(carouselContainer);	
		} else {
			var carousels = $('<div class="carousel-item" id="slide-'+index+'">')
			.data({info: obj})
			.html('<img class="d-block w-100" src="'+obj.image+'" ">'+
				  '<div class="carousel-caption"><h5 class="intro">'+obj.intro+'</h5></div>'+
				  '<p class="question">'+obj.question+'</p>')		
			.appendTo(carouselContainer);
		}
		
		//populate options
		if (index==0) {
			if(answer=="left") {
				var options = $('<div class="options" id="option-'+index+'">')
				.data({info: obj})
				.html('<div class="left_option" href="#carousel" role="button" data-slide="next" onClick="correctAnswer('+index+')"><span class="left_first">'+obj.left_first +'</span> <span class="left_second">'+obj.left_second+'</span></div>'+
				  '<div class="right_option" href="#carousel" role="button" data-slide="next" onClick="wrongAnswer('+index+')"><span class="right_first">'+obj.right_first +'</span> <span class="right_second">'+obj.right_second+'</span></div>')		
				.appendTo(carouselContainer);
			} else {
				var options = $('<div class="options" id="option-'+index+'">')
				.data({info: obj})
				.html('<div class="left_option" href="#carousel" role="button" data-slide="next" onClick="wrongAnswer('+index+')">'+obj.left_first +" "+obj.left_second+'</div>'+
				  '<div class="right_option" href="#carousel" role="button" data-slide="next" onClick="correctAnswer('+index+')">'+obj.right_first +" "+obj.right_second+'</div>')		
				.appendTo(carouselContainer);
			}
			
		} else {
			if (answer=="left") {
				var options = $('<div class="options hidden" id="option-'+index+'">')
				.data({info: obj})
				.html('<div class="left_option" href="#carousel" role="button" data-slide="next" onClick="correctAnswer('+index+')"><span class="left_first">'+obj.left_first +'</span> <span class="left_second">'+obj.left_second+'</span></div>'+
				'<div class="right_option" href="#carousel" role="button" data-slide="next" onClick="wrongAnswer('+index+')"><span class="right_first">'+obj.right_first +'</span> <span class="right_second">'+obj.right_second+'</span></div>')		
				.appendTo(carouselContainer);
			} else {
				var options = $('<div class="options hidden" id="option-'+index+'">')
				.data({info: obj})
				.html('<div class="left_option" href="#carousel" role="button" data-slide="next" onClick="wrongAnswer('+index+')" ><span class="left_first">'+obj.left_first +'</span> <span class="left_second">'+obj.left_second+'</span></div>'+
				'<div class="right_option" href="#carousel" role="button" data-slide="next" onClick="correctAnswer('+index+')"><span class="right_first">'+obj.right_first +'</span> <span class="right_second">'+obj.right_second+'</span></div>')		
				.appendTo(carouselContainer);
			}
			
		}
		
		$('.'+obj.color_left+'').addClass('color_text');
		$('.'+obj.color_right+'').addClass('color_text');
											
		TweenMax.fromTo(icon, .25, {opacity: 0}, {delay: (delay*index), opacity: 1, ease: Power2.easeOut});
	});	
	
	//result screens
		var aced = $('<div class="carousel-item" id="z-aced">')				
				.html('<img class="d-block w-100" src="'+activity_data.all_correct_image+'" ">'+					  
					  '<p class="question">'+activity_data.all_correct_question+'</p>')		
				.appendTo(carouselContainer);
		
		var passed = $('<div class="carousel-item" id="z-passed">')				
				.html('<img class="d-block w-100" src="'+activity_data.passing_image+'" ">'+					  
					  '<p class="question">'+activity_data.passing_question+'</p>')		
				.appendTo(carouselContainer);
		
		var failed = $('<div class="carousel-item" id="z-failed">')				
				.html('<img class="d-block w-100" src="'+activity_data.failed_image+'" ">'+					  
					  '<p class="question">'+activity_data.failed_question+'</p>')		
				.appendTo(carouselContainer);
	
	//result messages
		
		var acedMessage = $('<div class="options hidden" id="message-aced">')				
				.html('<div class="results" ><p>'+activity_data.all_correct_text+'</p></div>')		
				.appendTo(carouselContainer);
		var passedMessage = $('<div class="options hidden" id="message-passed">')				
				.html('<div class="results" ><p>'+activity_data.passing_text+'</p></div>')		
				.appendTo(carouselContainer);
		var passedMessage = $('<div class="options hidden" id="message-failed">')				
				.html('<div class="results" ><p>'+activity_data.failed_text+'</p></div>')		
				.appendTo(carouselContainer);
	
		
	$('.title-1').html(activity_data.title);	
	$('.instructions').html(activity_data.instructions);
	
	if (activity_data.allow_reset) {
		$('#resetBtn').removeClass('hidden');
		$('#resetBtnDis').addClass('hidden');
	}
	
}

function getData(call_data_file) {
	$.ajax({
		url: call_data_file,
		success: function(data) {
			activity_data = data;
			data_answers = activity_data.options.slice().sort();
			initActivity();
		}})
		.fail(function() { console.log( '*** load error: call_data.json ***'); });
}

function initListeners() {			
	$(window).on('load resize orientationchange', function (e) {					
	});
}

function correctAnswer(index) {
	correctIcons++;
	$('#option-'+index).addClass('hidden');
	if (index < total_questions) {
		var nextOption = index+1;		
		$('#option-'+nextOption).removeClass('hidden');
	}
	
	$('#dot-'+index).removeClass('fa-circle-thin');
	$('#dot-'+index).addClass('fa-check');
	css().bind('#dot-'+index, {	  
	  "color" : accent_color_3
	});	
	advanceBar(index);
}

function wrongAnswer(index) {
	var nextOption = index+1;
	$('#option-'+index).addClass('hidden');
	if (index < total_questions) {
		var nextOption = index+1;		
		$('#option-'+nextOption).removeClass('hidden');
	}	
	
	css().bind('#dot-'+index, {	  
	  "color" : accent_color_3
	});	
	$('#dot-'+index).removeClass('fa-circle-thin');
	$('#dot-'+index).addClass('fa-times');
	advanceBar(index);
}

function advanceBar(index) {
	var nextOption = index+1;
	$('#icon-'+index).removeClass('current');
	$('#icon-'+index).children('.center').removeClass('current');
	$('#icon-'+nextOption).addClass('current');
	$('#icon-'+nextOption).children('.center').addClass('current');
	isTestOver(index);
}

function isTestOver(index){
	if (index == total_questions -1){		
		$('.OR').addClass('hidden');				
		if (correctIcons == total_questions){
			$('#carousel').carousel(index+1);
			$('#message-aced').removeClass('hidden');
		}			
		else if( (correctIcons >= passing_grade) && (correctIcons < total_questions)){
			$('#carousel').carousel(index+2);
			$('#message-passed').removeClass('hidden');
		}
		else{
			$('#carousel').carousel(index+3);
			$('#message-failed').removeClass('hidden');
		}
	}
}

function retry(event, ui) {	
	location.reload();
}

function getFontColor(hex) {
	var c = c.substring(1);      // strip #
	var rgb = parseInt(c, 16);   // convert rrggbb to decimal
	var r = (rgb >> 16) & 0xff;  // extract red
	var g = (rgb >>  8) & 0xff;  // extract green
	var b = (rgb >>  0) & 0xff;  // extract blue

	var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

	if (luma < 40) {
		return '#ffffff';
	}
	else {
		return '#3d3d3d';
	}
}






	