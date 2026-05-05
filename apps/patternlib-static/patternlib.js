;(function(){
	"use strict";

	var $previewMode = 'grid';
	$('[data-toggle-backgrounds]').on('click', function() {
		var $previews = $('.pattern-preview'),
			$previewBtnText = $('[data-toggle-backgrounds] span');

		if ($previewMode === 'grid') {
			$previews.removeClass('pattern-preview-grid').addClass('pattern-preview-solid');
			$previewMode = 'solid';
		}
		else if ($previewMode === 'solid') {
			$previews.removeClass('pattern-preview-solid');
			$previewMode = 'none';
		}
		else if ($previewMode === 'none') {
			$previews.addClass('pattern-preview-grid');
			$previewMode = 'grid';
		}

		$previewBtnText.html($previewMode);
	});

	$('[data-toggle-section]').on('click', function() {
		var $trigger = $(this),
			$target = $($trigger.data('toggle-section'));

		if (!$target.hasClass('shown')) {
			$('.primaryMenuItem.current').removeClass('current').attr('aria-expanded', 'false');
			$('.sg-section').fadeOut(300);
			$trigger.addClass('current').attr('aria-expanded', 'true');
			$target.fadeIn(300);
			window.location.hash = $trigger.data('toggle-section');
			$('[data-toggle-menu].active').trigger('click');
			setTimeout(function() {
				$target.focus();
			}, 300);
		}
	});

	$('[data-in-section]').on('click', function() {
		var $trigger = $(this),
			$target = $($trigger.data('in-section'));

		if (!$target.hasClass('shown')) {
			$('.primaryMenuItem.current').removeClass('current').attr('aria-expanded', 'false');
			$('.sg-section').fadeOut(300);
			$trigger.addClass('current').attr('aria-expanded', 'true');
			$target.fadeIn(300);
			window.location.hash = $trigger.data('in-section');
		}
	});

	$(window).on('load', function() {
		var $hash = window.location.hash;
		if ($hash.length) {
			if ($('[data-toggle-section="' + $hash + '"]').length) {
				$('[data-toggle-section="' + $hash + '"]').trigger('click');
			}
			else {
				var $section = $($hash).closest('.sg-section'),
					$id = $section.attr('id'),
					$trigger = $('[data-toggle-section="#' + $id + '"]');

				$section.addClass('shown');

				$('.primaryMenuItem.current')
					.removeClass('current')
					.attr('aria-expanded', 'false');

				$trigger
					.addClass('current')
					.attr('aria-expanded', 'true');
			}
		}
		else {
			$('[data-toggle-section]:first').trigger('click');
		}
	});

	// Toggle code and instructions
	$('[data-pattern-note]').each(function(index, elem) {
		var $btn = '<button type="button" class="btn-action btn-note" data-note-toggler>Code &amp; usage</button>';
		$(elem).closest('.pattern').prev('.sg-section-h2').append($btn);
	});

	$(document).on('click', '[data-note-toggler]', function() {
		var $btn = $(this);
		$btn.parent().next('.pattern').find('[data-pattern-note]').toggle();
		$btn.toggleClass('active');
	});
})();