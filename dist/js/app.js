// svg icons support ie11
(function () {
	svg4everybody();
})();

/**
 * Пошук
 */
var options = {
	valueNames: [{ data: ['name'] }]
};

var search1 = new List('search-1', options);
var search2 = new List('search-2', options);

$(".input-gallery-file-upload").aksFileUpload({
	fileUpload: "#uploadfile",
	input: "#galleryFiles",
	dragDrop: true,
	maxSize: "80 MB",
	multiple: true,
	maxFile: 10,
	maxFileError: "Файл превышает лимит загрузки. - Максимальный предел:",
	maxSizeError: "Файл превышает размер. - Максимальный предел:",
	fileTypeError: "Запрещенный формат файла.",
	label: "<span class='aks-file'><span class='aks-file--main'><svg class='icon icon-paperclip svg-file-label'><use xlink:href='img/sprite.svg#icon-paperclip'></use></svg>Перетащите фото сада сюда</span><span class='aks-file--or'>или</span><span class='aks-file--btn'>Выбрать файл</span></span>"
});

/**
 * Форма залити відгук потребує ховати частину контенту і показати якщо поле вводу пусте
 */
$(document).on('click', '.js-filter-form .js-filter-form-add-show', function (event) {
	$('.js-filter-form').addClass('js-filter-form--show');
});
$(document).on('click', '.js-filter-form .js-filter-form-remove-show', function (event) {
	$('.js-filter-form').removeClass('js-filter-form--show');
});

/**
 * Імітація dropdown, ці довгобогризи, які робили шаблон нічого подібного не зробили
 */
$(document).on('click', '.js-dropdown-item', function (event) {
	var el = $(this);
	el.addClass('active');
});
$(document).on('click', '.js-dropdown-item.active', function (event) {
	var el = $(this);
	el.removeClass('active');
});

/**
 * Якщо в полі форми є якесь значення
 */
$(document).on('click keyup focus focusout', '.js-watch-focus', function (event) {

	var inputEl = $(this);
	var inputElFor = inputEl.data('focus-block');
	var inputActive = inputEl.data('focus-active');

	if ($.trim(inputEl.val())) {
		inputEl.closest(inputElFor).addClass(inputActive);
	} else {
		inputEl.closest(inputElFor).removeClass(inputActive);
	}
});

/**
 * Форма залити відгук потребує ховати частину контенту і показати якщо поле вводу пусте
 */
$(document).on('click keyup focus focusout', '.chat-form-watch-focus', function (event) {
	var inputEl = $(this);
	if ($.trim(inputEl.val())) {
		inputEl.closest('form.chat-form').addClass('chat-form-has-val');
	} else {
		inputEl.closest('form.chat-form').removeClass('chat-form-has-val');
	}
});

/**
 * Рейтинг в зірках
 */
$('.select-rate').barrating({
	theme: 'css-stars'
});

// Обізка тексту
$.fn.truncate = function (options) {

	var defaults = {
		length: 300,
		minTrail: 20,
		moreText: "Читати все",
		lessText: "Сховати",
		ellipsisText: "..."
	};

	var options = $.extend(defaults, options);

	return this.each(function () {
		// элемент DOM текущей итерации  
		obj = $(this);
		// извлекаем содержимое элемента в виде HTML разметки  
		var body = obj.html();

		if (body.length > options.length + options.minTrail) {

			// возвращаем позицию, после числа (options.length), с которой начинается совпадение 
			// в нашем случае это пробел 
			var splitLocation = body.indexOf(' ', options.length);
			// если совпадение найденно то
			if (splitLocation != -1) {
				// прячем текст подсказки

				var splitLocation = body.indexOf(' ', options.length);
				var str1 = body.substring(0, splitLocation);
				var str2 = body.substring(splitLocation, body.length - 1);
				obj.html(str1 + '<span class="js-read-more__ellipsis">' + options.ellipsisText + '</span>' + '<span  class="js-read-more__trim">' + str2 + '</span>');
				obj.find('.js-read-more__trim').slideUp();

				// вставляем ссылку "читать полностью" в конец сцществующего содержимого
				obj.append('<a href="#" class="js-read-more-btn">' + options.moreText + '</a>');

				//устанавливаем событие onclick для ссылки "читать полностью"/"спрятать"
				var moreLink = $('.js-read-more-btn', obj);
				var moreContent = $('.js-read-more__trim', obj);
				//дополнительный текст за текстом, например "..."    
				var ellipsis = $('.js-read-more__ellipsis', obj);
				moreLink.click(function () {
					if (moreLink.text() == options.moreText) {
						moreContent.slideDown();
						moreContent.toggleClass('js-read-more--show');
						moreLink.text(options.lessText);
						ellipsis.css("display", "none");
					} else {
						moreContent.slideUp();
						moreContent.toggleClass('js-read-more--show');
						moreLink.text(options.moreText);
						ellipsis.css("display", "inline");
					}
					return false;
				});
			}
		} // end if
	});
};

$('.js-read-more').truncate({
	length: 100,
	minTrail: 10,
	moreText: 'Подробнее...',
	lessText: '-  Спрятать'
});

// Автоматичне збільшення textarea
autosize(document.querySelectorAll('textarea.autosize'));

// Галерея
$(".lightgallery").lightGallery({
	download: false
});

// check if touch device
function isTouchDevice() {
	var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
	var mq = function mq(query) {
		return window.matchMedia(query).matches;
	};
	if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
		return true;
	}
	var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
	return mq(query);
}

if (isTouchDevice()) {
	$('body').addClass('touch-device');
}

// page
(function () {
	var page = $('.page'),
	    sidebar = $('.sidebar'),
	    burger = sidebar.find('.sidebar__burger'),
	    close = sidebar.find('.sidebar__close'),
	    header = $('.header'),
	    burgerHeader = header.find('.header__burger'),
	    search = header.find('.header__search'),
	    openSearch = header.find('.header__item_search');
	items = header.find('.header__item'), wrap = header.find('.header__wrap');

	items.each(function () {
		var item = $(this),
		    head = item.find('.header__head'),
		    body = item.find('.header__body');

		head.on('click', function (e) {
			e.stopPropagation();
			e.preventDefault();
			burgerHeader.removeClass('active');
			sidebar.removeClass('visible');
			search.slideUp();
			if (!item.hasClass('active')) {
				items.removeClass('active');
				item.addClass('active');
			} else {
				items.removeClass('active');
			}
		});

		body.on('click', function (e) {
			e.stopPropagation();
		});

		$('body').on('click', function () {
			items.removeClass('active');
		});
	});
	burger.on('click', function () {
		page.toggleClass('toggle');
		sidebar.toggleClass('active');
		setTimeout(function () {
			$('.js-slider').slick('resize');
		}, 400);
	});
	openSearch.on('click', function (e) {
		e.preventDefault();
		burgerHeader.removeClass('active');
		search.slideToggle();
		sidebar.removeClass('visible');
		$('html').removeClass('no-scroll');
		$('body').removeClass('no-scroll');
	});
	burgerHeader.on('click', function () {
		burgerHeader.toggleClass('active');
		search.slideUp();
		sidebar.toggleClass('visible');
		$('html').toggleClass('no-scroll');
		$('body').toggleClass('no-scroll');
	});
	close.on('click', function () {
		burgerHeader.removeClass('active');
		search.slideUp();
		sidebar.removeClass('visible');
		$('html').removeClass('no-scroll');
		$('body').removeClass('no-scroll');
	});
})();

// global variables
var prevArrow = '<button type="button" class="slick-prev"><svg class="icon icon-arrow-prev"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-prev"></use></svg></button>',
    nextArrow = '<button type="button" class="slick-next"><svg class="icon icon-arrow-next"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-next"></use></svg></button>',
    leftArrow = '<button type="button" class="slick-prev"><svg class="icon icon-arrow-left"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-left"></use></svg></button>',
    rightArrow = '<button type="button" class="slick-next"><svg class="icon icon-arrow-right"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-arrow-right"></use></svg></button>';

$(document).ready(function () {

	// categories slider
	$('.js-slider-categories').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: prevArrow,
		nextArrow: nextArrow,
		speed: 700,
		fade: true
	});

	// slider main page
	(function () {
		var main = $('.js-main'),
		    sliderNav = main.find('.js-main-nav'),
		    sliderFor = main.find('.js-main-for'),
		    progressBar = main.find('.js-main-progress');

		sliderFor.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			var calc = nextSlide / (slick.slideCount - 1) * 100;

			progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc);
		});

		sliderFor.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			prevArrow: prevArrow,
			nextArrow: nextArrow,
			fade: true,
			asNavFor: sliderNav,
			speed: 700
		});

		sliderNav.slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: sliderFor,
			arrows: true,
			prevArrow: prevArrow,
			nextArrow: nextArrow,
			dots: false,
			focusOnSelect: true,
			speed: 700,
			responsive: [{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			}]
		});
	})();

	$('.js-catalog-page').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: prevArrow,
		nextArrow: nextArrow,
		dots: false,
		focusOnSelect: true,
		speed: 700,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 3
			}
		}]
	});

	// trending slider
	(function () {
		var main = $('.js-main'),
		    slider = main.find('.js-main-slider'),
		    status = main.find('.js-main-status'),
		    counter = main.find('.js-main-counter');

		slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
			//currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
			var i = (currentSlide ? currentSlide : 0) + 1;
			counter.html('0' + i);
			status.html('<span class="status__number">' + i + '</span>' + '<span class="status__sign">/</span>' + '<span class="status__all">' + slick.slideCount + '</span>');
		});

		slider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			prevArrow: prevArrow,
			nextArrow: nextArrow,
			dots: true,
			infinite: false,
			speed: 700,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 5000,
			responsive: [{
				breakpoint: 768,
				settings: {
					variableWidth: false,
					arrows: true,
					dots: false
				}
			}]
		});
	})();

	// latest video slider
	$('.js-slider-videos').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: prevArrow,
		nextArrow: nextArrow,
		speed: 700,
		fade: true
	});

	$('.js-slider-streamers').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: prevArrow,
		nextArrow: nextArrow,
		speed: 600,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 9999,
			settings: "unslick"
		}, {
			breakpoint: 1420,
			settings: ""
		}, {
			breakpoint: 1260,
			settings: {
				slidesToShow: 3
			}

		}, {
			breakpoint: 768,
			settings: "unslick"
		}]
	});

	$('.js-slider-games').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		prevArrow: prevArrow,
		nextArrow: nextArrow,
		speed: 600,
		adaptiveHeight: true,
		responsive: [{
			breakpoint: 9999,
			settings: "unslick"
		}, {
			breakpoint: 1420,
			settings: ""
		}, {
			breakpoint: 1260,
			settings: {
				slidesToShow: 2
			}

		}, {
			breakpoint: 768,
			settings: "unslick"
		}]
	});

	$('.js-slider-view').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		speed: 600,
		responsive: [{
			breakpoint: 9999,
			settings: "unslick"
		}, {
			breakpoint: 1340,
			settings: ""
		}, {
			breakpoint: 1024,
			settings: {
				slidesToShow: 2
			}

		}]
	});

	$(window).on('resize orientationchange', function () {
		$('.js-slider-resize').slick('resize');
	});
});

(function () {
	var player = $('.player'),
	    action = player.find('.player__action'),
	    toggle = player.find('.player__toggle'),
	    chat = player.find('.player__chat'),
	    messenger = $('.messenger'),
	    close = messenger.find('.messenger__close');

	action.on('click', function () {
		$(this).toggleClass('active');
	});

	toggle.on('click', function () {
		$(this).toggleClass('active');
	});

	chat.on('click', function () {
		messenger.addClass('show');
	});

	close.on('click', function () {
		messenger.removeClass('show');
	});
})();

// catalog
(function () {
	$('.catalog__view .catalog__link:first-child').on('click', function (e) {
		e.preventDefault();
		$('.catalog').addClass('view');
		$('.catalog__link').removeClass('active');
		$(this).addClass('active');
		$(this).parents('.catalog').find('.game').addClass('game_line');
	});
	$('.catalog__view .catalog__link:nth-child(2)').on('click', function (e) {
		e.preventDefault();
		$('.catalog').removeClass('view');
		$('.catalog__link').removeClass('active');
		$(this).addClass('active');
		$(this).parents('.catalog').find('.game').removeClass('game_line');
	});

	$('.catalog__nav .catalog__link').on('click', function (e) {
		$('.catalog__nav .catalog__link').removeClass('active');
		$(this).addClass('active');
	});

	$('.game .checkbox').on('change', function () {
		$(this).parents('.game').toggleClass('active');
	});

	var checkboxAll = $('.catalog__sorting .checkbox__input');
	checkboxAll.on('click', function () {
		if ($(this).is(':checked')) {
			$(this).parents('.catalog').find('.game').addClass('active');
			$(this).parents('.catalog').find('.catalog__list .checkbox__input').prop('checked', true).attr('checked', 'checked');
		} else {
			$(this).parents('.catalog').find('.game').removeClass('active');
			$(this).parents('.catalog').find('.catalog__list .checkbox__input').prop('checked', false).removeAttr('checked');
		}
	});
})();

$('.games_add .games__item').on('click', function (e) {
	e.preventDefault();
	$(this).toggleClass('active');
});

$('.player__burger').on('click', function (e) {
	$(this).parents('.player__playlist').toggleClass('show');
});

$('.trending .card__inner').on('click', function (e) {
	$(this).parents('.card').toggleClass('active');
});

// magnificPopup
(function () {
	var link = $('.js-popup-open');
	link.magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		removalDelay: 200,
		callbacks: {
			beforeOpen: function beforeOpen() {
				this.st.mainClass = this.st.el.attr('data-effect');
				var sl = $('.js-slider-stories');
				if (!sl.hasClass('init')) {
					sl.addClass('init');
					sl.slick({
						slidesToShow: 3,
						slidesToScroll: 1,
						dots: false,
						arrows: true,
						prevArrow: leftArrow,
						nextArrow: rightArrow,
						centerMode: true,
						speed: 700,
						responsive: [{
							breakpoint: 1024,
							settings: {
								slidesToShow: 1
							}
						}]
					});
				}
			}
		}
	});
})();

// chat
(function () {
	var chat = $('.chat'),
	    item = chat.find('.chat__item'),
	    head = chat.find('.chat__head'),
	    body = chat.find('.chat__body');
	head.on('click', function () {
		var thisHead = $(this);
		thisHead.parents('.chat__item').toggleClass('active');
		thisHead.parents('.chat__item').find('.chat__body').slideToggle();
	});
})();

// tabs
(function () {
	var tabs = $('.js-tabs');
	tabs.each(function () {
		var thisTabs = $(this),
		    nav = thisTabs.find('.js-tabs-link'),
		    item = thisTabs.find('.js-tabs-item');
		nav.on('click', function () {
			var thisNav = $(this),
			    indexNav = thisNav.index();
			nav.removeClass('active');
			thisNav.addClass('active');
			item.hide();
			item.eq(indexNav).fadeIn();
			return false;
		});
	});
})();

// toggle body theme
(function () {
	var switchTheme = $('.js-switch-theme'),
	    body = $('body');

	switchTheme.on('change', function () {
		if (!body.hasClass('dark')) {
			body.addClass('dark');
			localStorage.setItem('darkMode', "on");
		} else {
			body.removeClass('dark');
			localStorage.setItem('darkMode', "off");
		}
	});
})();

// $(".chat__container").scrollTop($(".chat__container")[0].scrollHeight);

$('.field__select').niceSelect();
$('.select').niceSelect();

$(document).on('click', '.phone-toggle', function (event) {
	event.preventDefault();
	var block = $(this),
	    phone = block.data('phone'),
	    phoneHref = block.data('phone-href');

	block.attr('href', 'tel:' + phoneHref).html(phone).removeClass('phone-toggle');
});