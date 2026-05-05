(function(){
	"use strict";

	var $origSelector = $('[data-custom-selector-id]');

	$('[data-toggle-hidden="#searchFilters"]').attr('id', 'btnSearchFilterToggler');

	$origSelector.each(function(index, elem) {
		var $thisSelectorId = $(elem).data('custom-selector-id'),
			$thisSelector = $('[data-custom-selector-id="' + $thisSelectorId + '"]'),
			$origSelectorLabel = $('[data-custom-selector-label=' + $thisSelectorId + ']'),
			$origSelectorLabelText = $.trim($origSelectorLabel.text()),
			$origSelectorLabelTextNoSpaces = $origSelectorLabelText.replace(/\s+/g, ''),
			$origSelectorOptions = $('[data-custom-selector-id="' + $thisSelectorId + '"] option'),
			$origSelectorOptionsSelected = $('[data-custom-selector-id="' + $thisSelectorId + '"] option:selected'),

			// Build custom selector elements
			$htmlCustomSelectorLabel = '<div id="label' + $origSelectorLabelTextNoSpaces + '" class="label' + ($origSelectorLabel.hasClass('visuallyhidden') ? ' visuallyhidden' : '') + '">' + $origSelectorLabelText + '</div>',
			$htmlCustomSelectorButton = '<button type="button" data-id="' + $thisSelectorId + '" id="customSelectorTrigger' + $thisSelectorId + '" data-custom-selector-trigger="' + $thisSelectorId + '" aria-labelledby="' + 'label' + $origSelectorLabelTextNoSpaces + '" aria-controls="customSelector' + $thisSelectorId + '" aria-expanded="false" class="custom-selector-trigger">' + $.trim($origSelectorOptionsSelected.text()) + '</button>',
			$htmlCustomSelectorSelect = '<ul tabindex="-1" id="customSelector' + $thisSelectorId + '" class="custom-selector-dropdown" data-custom-selector="' + $thisSelectorId + '"/>',
			$htmlCustomSelectorListItems = '',

			// Added elements variables
			dataCustomSelector = '[data-custom-selector="' + $thisSelectorId + '"]',
			dataCustomSelectorLink = '[data-custom-selector="' + $thisSelectorId + '"] a',
			dataCustomSelectorTrigger = '[data-custom-selector-trigger="' + $thisSelectorId + '"]';

		$origSelectorOptions.each(function(index, elem) {
			var isSelected = $(elem).attr('selected') === 'selected' ? true : false,
				isGroupHeader = $(elem).hasClass('group-header') ? true : false,
				isFirstInGroup = $(elem).hasClass('first-in-group') ? true : false,
				isLastInGroup = $(elem).hasClass('last-in-group') ? true : false,
				hasBorder = $(elem).hasClass('border') ? true : false,
				classes = ' class="' + (isSelected ? 'selected ' : '') + (isGroupHeader ? 'group-header ' : '') + (isFirstInGroup ? 'first-in-group ' : '') + (isLastInGroup ? 'last-in-group ' : '') + (hasBorder ? 'border ' : '') + '"';
			$htmlCustomSelectorListItems += '<li' + classes + '><a href="' + $(elem).attr('value') + '">' + $(elem).html() + '</a></li>';
		});



		// Add custom selector trigger and list items
		$thisSelector.before($htmlCustomSelectorLabel + '<div class="custom-selector-wrapper">' + $htmlCustomSelectorButton + $htmlCustomSelectorSelect + '</div>');

		// Remove HTML select element and label
		$thisSelector.remove();
		$origSelectorLabel.remove();

		// Append list elements and unwrap twice (fieldset and form elements)
		$(dataCustomSelector).append($htmlCustomSelectorListItems);

		// Set focus on last used filter
		if($origSelector.length) {
			var type = window.location.search.substr(1, window.location.search.indexOf('=') - 1);
			var $button = $("button[data-id='" + type + "']");
			if($button.length) {
				$button.focus();
			}
		}

		// Custom selector events
		var $selectedItem = $(dataCustomSelector).find('li.selected'),
			$activeItem,
			isOpening = false,
			spaceKeyClicked = false,
			nextItem = $(dataCustomSelector).find('li:first'),
			resetSelector = function(focus) {
				if ($(dataCustomSelector).hasClass('open')) {
					$(dataCustomSelectorTrigger).attr('aria-expanded','false');
					$(dataCustomSelectorTrigger).removeClass('active');
					$(dataCustomSelector).find('li').removeClass('active');
					$(dataCustomSelector).removeClass('open');
					nextItem = $(dataCustomSelector).find('li.selected');
					if (focus !== false) {
						$(dataCustomSelectorTrigger).focus();
					}
				}
			},
			resetOtherSelectors = function() {
				$('[data-custom-selector-trigger]').each(function(index, elem) {
					if ($(elem).data('custom-selector-trigger') !== $thisSelectorId && $(elem).hasClass('active')) {
						$(elem).click();
					}

					if ($('[data-language-selector-trigger]').hasClass('active')) {
						$('[data-language-selector-trigger]').trigger('click');
					}
				});
			};

		if ($selectedItem.length < 1) {
			var $selItem = $(dataCustomSelector).find('li:first-child');
			$selItem.addClass('selected');
			$selectedItem = $selItem;
		}

		// Close custom selector when clicking anywhere outside the selector
		$('html').on('click', function() {
			if ($(dataCustomSelector).hasClass('open')) {
				resetSelector(false);
			}
		});
		// ..except clicking inside related items
		$('.hygieneMenu .language, [data-custom-selector-trigger]').on('click', function(e) {
			e.stopPropagation();
		});
		$('.primaryMenuItem.hasDropdown').on('click', function() {
			resetSelector(false);
		});

		// Custom selector toggle open/close
		$(dataCustomSelectorTrigger)
			.on('click', function() {
				resetOtherSelectors();

				if ($(dataCustomSelectorTrigger).hasClass('active')) {
					$(dataCustomSelectorTrigger).attr('aria-expanded','false').removeClass('active');
					$(dataCustomSelector).removeClass('open');
					$(dataCustomSelector).find('li.active').removeClass('active');
				}
				else {
					$(dataCustomSelectorTrigger).attr('aria-expanded','true').addClass('active');
					$(dataCustomSelector).addClass('open');
					$selectedItem = $(dataCustomSelector).find('li.selected');
					$selectedItem.addClass('active');
					$selectedItem.find('>a').focus();
				}
			})
			.on('keyup', function(e) {

				// space key
				if (e.which === 32 && spaceKeyClicked === true) {
					e.preventDefault();
				}
				spaceKeyClicked = false;
			})
			.on('keydown', function(e) {

				// enter/return key
				if (e.which === 13) {
					$(this).trigger('click');
					e.preventDefault();
				}
				// down-arrow key OR up-arrow key
				else if (e.which === 40 || e.which === 38) {
					isOpening = true;
					$(dataCustomSelectorTrigger).attr('aria-expanded','true');
					$(dataCustomSelector).addClass('open');

					if (!$(dataCustomSelectorTrigger).hasClass('active')) {
						$(this).trigger('click');
						$(dataCustomSelectorTrigger).attr('aria-expanded','true');
						$(dataCustomSelector).addClass('open');

						$selectedItem = $(dataCustomSelector).find('li.selected');
						$selectedItem.addClass('active');
						$selectedItem.find('>a').focus();
					}
					else {
						nextItem.addClass('active');
						nextItem.find('>a').focus();
					}
				}
				// escape key
				else if (e.which === 27) {
					resetSelector();
					$(dataCustomSelectorTrigger).attr('aria-expanded','false');
					$(dataCustomSelector).removeClass('open');
					e.preventDefault();
				}
				// tab key
				else if (e.which === 9 && $(dataCustomSelectorTrigger).hasClass('active') && $selectedItem.find('>a:focus')) {
					return false;
				}
			});

		$(dataCustomSelectorLink)
			.on('focus', function() {
				$activeItem = $(dataCustomSelector).find('li.active');
			})
			.on('mouseover', function() {
				$activeItem = $(this);
				$(dataCustomSelector).find('li').removeClass('active');
				$activeItem.parent().addClass('active');
				$activeItem.trigger('focus');
			})
			.on('click', function() {
				resetSelector();

				$(dataCustomSelector).find('li').removeClass('selected');
				$(this).parent().addClass('selected');

				$(dataCustomSelectorTrigger).removeAttr('class').addClass('custom-selector-trigger ' + $(this).attr('class'));

				$(dataCustomSelectorTrigger).text($(this).text());
			})
			.on('keyup', function() {
				isOpening = false;
			})
			.on('keydown', function(e) {
				$activeItem = $(dataCustomSelector).find('li.active');

				if ($activeItem.length < 1) {
					var $firstItem = $(dataCustomSelector).find('li:first-child');
					$firstItem.addClass('active');
					$activeItem = $firstItem;
				}

				// down arrow
				if (e.which === 40 && $activeItem.next().length > 0) {
					if (isOpening !== true) {
						$activeItem = $activeItem.next();
						$(dataCustomSelector).find('li').removeClass('active');
						$activeItem.addClass('active');
						$activeItem.find('>a').focus();
					}
				}
				// up arrow
				else if (e.which === 38 && $activeItem.prev().length > 0) {
					if (isOpening !== true) {
						$activeItem = $activeItem.prev();
						$(dataCustomSelector).find('li').removeClass('active');
						$activeItem.addClass('active');
						$activeItem.find('>a').focus();
					}
				}
				// page up
				else if (e.which === 33) {
					if (isOpening !== true) {
						$activeItem = $(dataCustomSelector).find('li:first');
						$(dataCustomSelector).find('li').removeClass('active');
						$activeItem.addClass('active');
						$activeItem.find('>a').focus();
					}
				}
				// page down
				else if (e.which === 34) {
					if (isOpening !== true) {
						$activeItem = $(dataCustomSelector).find('li:last');
						$(dataCustomSelector).find('li').removeClass('active');
						$activeItem.addClass('active');
						$activeItem.find('>a').focus();
					}
				}
				// space key
				else if (e.which === 32) {
					window.location = window.location.pathname + $(this).attr('href');
					spaceKeyClicked = true;
					resetSelector();

					$(dataCustomSelector).find('li').removeClass('selected');
					$(this).parent().addClass('selected');

					$(dataCustomSelectorTrigger).removeAttr('class').addClass('custom-selector-trigger ' + $(this).attr('class'));

					$(dataCustomSelectorTrigger).text($(this).text());
				}
				// escape key
				else if (e.which === 27) {
					resetSelector();
				}
				// backspace key OR tab key
				else if ((e.which === 8 || e.which === 9) && $(dataCustomSelectorTrigger).hasClass('active')) {
					if ($(dataCustomSelectorLink).is(':focus')) {
						return false;
					}
				}
			});

		$(window)
			.on('keydown', function(e) {
				if ($(dataCustomSelector).hasClass('open')) {

					// Prevent scroll when pressing any arrow keys AND page/home up/down
					var keyArray = new Array(33,34,35,36,37,38,39,40),
						key = e.which;
					if ($.inArray(key,keyArray) > -1) {
						e.preventDefault();
					}
				}
			});
	});

	// Add some visually hidden help for removing filtering
	$('.custom-selector-reset').each(function(index, el) {
		var type = window.location.search.substr(1, window.location.search.indexOf('=') - 1);
		if($(this).attr("data-id") === type) {
			$(this).focus();
		}
		$(el).prepend('<span class="visuallyhidden">Fjern filtrering på </span>');
	});
})();

