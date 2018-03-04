var InterfaceScript = function () {

	self = this;

	self._states = {};

	var _addActive = function(e) {
		e.preventDefault();
		return $(this).addClass("active");
	};

	var _addSiblingsActive = function(e) {
		e.preventDefault();
		return $(this).siblings().removeClass("active").prevObject.addClass("active");
	};

	var _toggleActive = function(e) {
		e.preventDefault();
		return $(this).toggleClass("active");
	};

	var _toggleSiblingsActive = function(e) {
		e.preventDefault();
		return $(this).siblings().removeClass("active").prevObject.toggleClass("active");
	};

	var _toggleTabs = function(e) {
		if ($(this).hasClass("active")) {
			return false;
		}

		e.preventDefault();

		return $(this)
			.addClass("active")
			.siblings()
				.removeClass("active")
		.prevObject
			.closest(".js-tabs-line")
				.siblings(".js-tab-group")
					.children(".js-tab-content")
						.hide()
		.prevObject
			.find("#" + $(this).attr("rel"))
				.show();
	};

	var _setInputValue = function() {
		return $(this)[0].setAttribute("value", this.value);
	};

	var _setModal = function () {
		var open_modal = $(".js-modal-open");
		var close = $(".js-modal-close");
		var close_wrap = $(".overlay");

		open_modal.on("click", function (event) {
			event.preventDefault();
			
			var div = $(this).attr("data-href");
			var divM = $(div).find(".g-modal");

			$("body").css("overflow-y", "hidden");

			$(div).fadeIn(200, function () {
				divM.animate({opacity: 1, top: "5%"}, 300);
			});
		});

		close.on("click", function (event) {
			event.preventDefault();
			var div = $(this).closest(".g-modal");
			var overlay = $(div).closest(".overlay");
			
			div.animate({
				opacity: 0,
				top: "0"
			}, 300, function () {
				overlay.fadeOut(200);
				$("body").css("overflow-y", "auto");
			});
		});
		
		close_wrap.on("click", function (event) {
			if (!event.target) {
				event.target = event.srcElement
			}

			if ($(event.target).closest(".g-modal").length) {
				return false;
			} 

			event.preventDefault();

			var div = $(this).find(".g-modal");
			var overlay = $(this);
			
			div.animate({
				opacity: 0,
				top: "0"
			}, 300, function () {
				overlay.fadeOut(200);
				$("body").css("overflow-y", "auto");
			});
		});
	};

	var _detectPlatform = function () {
		var platform = "";

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			platform = "mobile";
		} else {
			platform = "desktop";
		}

		document.cookie = "platform=" + platform;
		sessionStorage.setItem("platform", platform);
		self._states.platform = platform;
	};

	var _detectPlatformEvent = function () {
		self._states.eventListener = (self._states.platform === "desktop" ? "click" : "touchend");
	};

	var _setEvents = function () {
		$(".js-add-active").on(self._states.eventListener, _addActive);
		$(".js-add-siblings-active").on(self._states.eventListener, _addSiblingsActive);
		$(".js-toggle-active").on(self._states.eventListener, _toggleActive);
		$(".js-toggle-siblings-active").on(self._states.eventListener, _toggleSiblingsActive);
		$(".js-tabs").on(self._states.eventListener, _toggleTabs);
		$(".js-input").on(self._states.eventListener, _setInputValue);
	};

	this.init = function () {
		_detectPlatform();
		_detectPlatformEvent();
		_setModal();
		_setEvents();
	};
};

var interfaceScript = new InterfaceScript();

$(document).ready(interfaceScript.init.bind(interfaceScript));