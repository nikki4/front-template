var InterfaceScript = function () {

	this.addActive = function(e) {
		e.preventDefault();
		return $(this)
			.addClass("active");
	}

	this.addSiblingsActive = function(e) {
		e.preventDefault();
		return $(this)
			.siblings()
				.removeClass("active")
		.prevObject
			.addClass("active");
	}

	this.toggleActive = function(e) {
		e.preventDefault();
		return $(this)
			.toggleClass("active");
	}

	this.toggleSiblingsActive = function(e) {
		e.preventDefault();
		return $(this)
			.siblings()
				.removeClass("active")
		.prevObject
			.toggleClass("active");
	}

	this.toggleTabs = function(e) {
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

	this.setInputValue = function() {
		return $(this)[0].setAttribute("value", this.value);
	}

}

function setModal() {
	var open_modal = $(".js-modal-open");
	var close = $('.js-modal-close');
	var close_wrap = $('.overlay');

	open_modal.on("click", function (event) {
		event.preventDefault();
		
		var div = $(this).attr('data-href');
		var divM = $(div).find('.g-modal');

		$('body').css("overflow-y", "hidden");
		$(div).fadeIn(200,
			function () {
				divM.animate({opacity: 1, top: '5%'}, 300);
			}
		);
	});

	close.on("click", function (event) {
		event.preventDefault();
		var div = $(this).closest('.g-modal');
		var overlay = $(div).closest('.overlay');
		
		div.animate({opacity: 0, top: '0'}, 300,
			function () {
				overlay.fadeOut(200);
				$('body').css("overflow-y", "auto");
			}
		);
		
	});
	
	close_wrap.on("click", function (event) {
		if (!event.target) {
		  event.target = event.srcElement
		}
		if ($(event.target).closest(".g-modal").length){
			return false;
		} 
		event.preventDefault();
		var div = $(this).find('.g-modal');
		var overlay = $(this);
		
		div.animate({opacity: 0, top: '0'}, 300,
			function () {
				overlay.fadeOut(200);
				$('body').css("overflow-y", "auto");
			}
		);
	});
}

var interfaceScript = new InterfaceScript();

$(document)
	.on("click", ".js-add-active", interfaceScript.addActive)
	.on("click", ".js-add-siblings-active", interfaceScript.addSiblingsActive)
	.on("click", ".js-toggle-active", interfaceScript.toggleActive)
	.on("click", ".js-toggle-siblings-active", interfaceScript.toggleSiblingsActive)
	.on("click", ".js-tabs", interfaceScript.toggleTabs)
	.on("input", ".js-input", interfaceScript.setInputValue)
	.ready(setModal());
