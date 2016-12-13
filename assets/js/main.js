
// Hi sneaky code-sniffer :)
console.image('http://andrejcibik.6f.sk/assets/images/console-logo.png');


// RESPONSIVE +
	if (typeof $.responsive == 'function') {
		$.responsive({
					width: [400, 640, 980, 1280],
					prefix: 'width',
					viewport: 'width=device-width',
				afterResize: function(opt) {
				}
			});
		};
// RESPONSIVE -


// global scroll var +
	var wScroll = $(this).scrollTop();

	$(window).scroll(function(){
		wScroll = $(this).scrollTop();
	});
// global scroll var -


var default_content="";

$(document).ready(function(){

	checkURL();

	var ajaxLink = $('.ajaxLink');

	ajaxLink.click(function (e){
		checkURL(this.hash);
	});

	default_content = $('.body-content').html();

	setInterval("checkURL()",250);

});

var lasturl="";

function checkURL(hash) {
	if (!hash) hash = window.location.hash;

	if (hash != lasturl) {

		lasturl=hash;

		if(hash=="")
			$('.body-content').html(default_content);

		else {
			loadPage(hash);
		}

	}
}

var loadCont = $('.load-cont');

function loadPage(url) {
	url=url.replace('#','');

	loadCont.addClass('show');
	$('body').removeClass('loaded');

	$.ajax({
		type: "POST",
		url: "load_page.php",
		data: 'page='+url,
		dataType: "html",

		success: function(msg){

			if(parseInt(msg)!=0) {

				setTimeout(function(){
					loadCont.removeClass('show');
					$('body').addClass('loaded');
					$('.body-content').html(msg);

					setTimeout(function(){
						loadCont.removeClass('initial')
					}, 1000);

				}, 1200);

				setTimeout(function(){
					$("html, body").animate({ scrollTop: 0 }, 0);
				}, 800);

				// Clear bgColor
				$('.page-bg').css('background', 'none');
			}
		} // Success msg -

	});

	// MAIN MENU INDICATOR +

		setTimeout(function(){

			var menuItem = $('.menu .item');

			var hash = window.location.hash;

			var indexOfSlash = hash.indexOf("/");

			if (indexOfSlash < 0)
				indexOfSlash = hash.length;

			var firstHash = hash.substring(0,indexOfSlash);

			menuItem.each(function(){

				menuItem.removeClass('active');

				var thisHref = $(this).attr('href');

				if (thisHref == firstHash) {
					$(this).addClass('active');
					return false;

				} else if (firstHash == "") {
					$('.menu .item:first-child').addClass('active');
					return false;
				}
			});

		},10);

	// MAIN MENU INDICATOR -
}


$(document).ready(function() {

// INACTIVE TAB TITLE +
		var message = "I miss you :(";
		var original;

		$(window).focus(function() {
			if (original) {
				document.title = original;
			}
		}).blur(function() {
			var title = $('title').text();
			if (title != message) {
				original = title;
			}
			document.title = message;
		});
// INACTIVE TAB TITLE -


// MOBILE MENU +
	var header = $('.header'),
			mobileMenuToggle = header.find('.mobile-menu-toggle');

	mobileMenuToggle.click(function(){
		$('body').toggleClass('open-menu');
	});

	$('.navigation .item').click(function(){
		setTimeout(function(){
			$('body').removeClass('open-menu');
		}, 500);
	});
// MOBILE MENU -


// SMOOTH SCROLL +
	// docs https://greensock.com/docs/#/HTML5/GSAP/Plugins/ScrollToPlugin/
	// Init here: smoothScroll Init
	function smoothScroll() {

		var $window = $(window);

		var scrollTime = .5;
		var scrollDistance = 280;

		$(window).on("mousewheel DOMMouseScroll touchstart", function(event){

			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $window.scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($window, scrollTime, {
				scrollTo : { y: finalScroll, autoKill:false },
					ease: Power1.easeOut,
					autoKill: false,
					overwrite: 5
				});
		});
	}
// SMOOTH SCROLL -


// FOOTER REAVEAL START +

var footer = $('.footer'),
		footerHeight = footer.height(),
		contentWrapper = $('.content-wrapper');

	function fHeight() {
		footerHeight = footer.height();
		contentWrapper.css('margin-bottom', footerHeight);
	}
	fHeight();

	$(window).resize(function(){
		fHeight();
	});

// FOOTER REAVEAL START -


// IE and EDGE DETECTION +
	var version = detectIE();

	if (version === false && $(window).width() >= 980) {

		// smoothScroll Init
			smoothScroll();

	} else if (version >= 12) {
		$('body').addClass('edge');
	} else {
		$('body').addClass('ie');
	}

	/**
	* detect IE
	* returns version of IE or false, if browser is not Internet Explorer
	*/
	function detectIE() {
		var ua = window.navigator.userAgent;

		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			// IE 10 or older => return version number
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}

		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			// IE 11 => return version number
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}

		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			// Edge (IE 12+) => return version number
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}

		// other browser
		return false;
	}
// IE and EDGE DETECTION +

});
