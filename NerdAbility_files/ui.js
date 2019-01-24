function UI(target) {
	var ui = {
		showboxComponent : function(divId) {
			$(target).live('click', function() {

				if ($(divId).is(":visible")) {
					$(divId).hide('fast');
				} else {
					$(divId).show('fast', function(){
					    $(this).trigger('aftershow');
					});
				}
				return false;
			});

		},
		addLoadingMask : function(maskedDivId, overlayId, iconId) {
			var maskedDiv = $(maskedDivId);
			$(overlayId).css({
			  opacity : 0.5,
			  top     : maskedDiv.position().top,
			  width   : maskedDiv.width(),
			  height  : maskedDiv.height()
			});
			$(iconId).css({
			  top  : (maskedDiv.height() / 2),
			  left : (maskedDiv.width() / 2)
			});
			$(overlayId).show();
		},
		removeLoadingMask : function(overlayId) {
			$(overlayId).fadeOut();
		},
		bindDraggable: function(){
			var dragItems = document.querySelectorAll('[draggable=true]');
			for (var i = 0; i < dragItems.length; i++) {
			  addEvent(dragItems[i], 'dragstart', function (event) {
			    // store the element, and collect it on the drop later on
			    event.dataTransfer.setData('Text', this.id);
			  });
			}
		},
		bindDrop: function(domId,dropFunction)
		{
			var drop = document.querySelector(domId);
			addEvent(drop, 'dragover', ui.cancel);
			addEvent(drop, 'dragenter', ui.cancel);
			addEvent(drop, 'drop', dropFunction);
		},
		cancel: function(e) {
			  if (e.preventDefault) {
				    e.preventDefault();
				  }
				  return false;
		}
	};

	return ui;

}



