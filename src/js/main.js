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
		_setEvents();
	};
};

var interfaceScript = new InterfaceScript();

$(document).ready(interfaceScript.init.bind(interfaceScript));