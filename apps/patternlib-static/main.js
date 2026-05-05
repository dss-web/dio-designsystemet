/* global Modernizr */

(function(){
	"use strict";

	const el = document.getElementById("page-translations");
	const json = el?.innerHTML?.trim();
	const t = json ? JSON.parse(json) : {};

	window.translations = window.translations || {};
	Object.assign(window.translations, t);
	
	// Use local vars (with fallbacks)
	var langShowFullTable = t.langShowFullTable || "";

	// Contexts for responsive Javascript
	var reg4 = {
		// megamenuMinWidth: 768,
		queries: [
			{ context: 'small' },
			{ context: 'medium' },
			{ context: 'large' }
		],

		// Fontsize note
		fontSizeBtn: '[data-fontsize-btn]',
		fontSizeNote: '[data-fontsize-note]',
		showFontSizeNote: function() {
            $(reg4.fontSizeBtn).attr('aria-expanded','true').addClass('active');
			$(reg4.fontSizeNote).attr('aria-expanded','true').addClass('open');
		},
		hideFontSizeNote: function() {
			$(reg4.fontSizeBtn).attr('aria-expanded','false').removeClass('active');
			$(reg4.fontSizeNote).attr('aria-expanded','false').removeClass('open');
		},

		// Get current context
		getContext: function() {

			// IE 8 support
			if (!window.getComputedStyle) {
				window.getComputedStyle = function(el) {
					this.el = el;
					this.getPropertyValue = function(prop) {
						var re = /(\-([a-z]){1})/g;
						if (prop === 'float') {
							prop = 'styleFloat';
						}
						if (re.test(prop)) {
							prop = prop.replace(re, function () {
								return arguments[2].toUpperCase();
							});
						}
						return el.currentStyle[prop] ? el.currentStyle[prop] : null;
					};
					return this;
				};
			}

			// Current context
			if (window.getComputedStyle) {
				return window.getComputedStyle(document.documentElement).getPropertyValue('font-family').replace(/['",]/g, '');
			}

			// Large screen fallback
			return reg4.queries.context.large;
		},

		// Toggle display element from data-attribute
		languageSelector: function() {
			var langTrigger = $('#languageSelectorTrigger'),
				langTarget = $('#languageSelector'),
				langContainer = $('.language'),
				langChildren = langContainer.find('button, a');
			
			langTrigger.on('click', function() {
				if (langTarget.hasClass('open')) {
                    langTrigger
                        .attr('aria-expanded','false')
                        .removeClass('active');
					langTarget
						.attr('aria-expanded','false')
						.removeClass('open');
				}
				else {
                    langTrigger
                        .attr('aria-expanded','true')
                        .addClass('active');
					langTarget
						.attr('aria-expanded','true')
						.addClass('open');
				}
			});

			langChildren
				.on('keydown', function(e) {
					if (e.which === 9 && langTrigger.hasClass('active')) {
						trapTabKey(langContainer, e);
					}
				})
				.on('keyup', function(e) {
					if (e.which === 27) {
						langTrigger
							.trigger('click')
							.focus();
					}
				});

			$(document).mouseup(function(e) {
				if (!$(e.target).closest('#languageSelectorTrigger').length) {
					if (!langTarget.is(e.target) && langTarget.has(e.target).length === 0 && langTrigger.hasClass('active')) {
						langTrigger.trigger('click');
					}
				}
			});
		},

		// Main navigation
		megaMenuInit: function() {
			$('.primaryMenuItem').attr('aria-expanded','false');

			var toggleMegamenu = function(elem) {
                reg4.resetBreadcrumbs();
				if (!elem.hasClass('active')) {
					$('.primaryMenuItem.active').removeClass('active').attr('aria-expanded','false');
					$('.primaryMenuItem + [aria-expanded="true"]').attr('aria-expanded','false');
					$(elem).attr('aria-expanded','true');
					if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
						$('[data-megamenu-overlay]').addClass('shown');
					}
					elem.addClass('active');
				}
				else {
					reg4.resetMegaMenu(false);
				}
			};

			if (!Modernizr.touch && (reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
				$('.primaryMenuItem.hasDropdown')
					.on('keydown', function(e) {
						if (e.which === 13) {
							if ($(this).hasClass('active')) {
								reg4.resetMegaMenu(false);
							}
							else {
								toggleMegamenu($(this));
							}
							e.preventDefault();
						}
					})
					.on('click touchend', function(e) {
                        toggleMegamenu($(this));
						e.preventDefault();
					});
			}

			$('.primaryMenuItem.hasDropdown').on('click', function(e) {
				if (Modernizr.touch) {
					toggleMegamenu($(this));
					e.preventDefault();
				}
			});

			$('[data-megamenu-overlay]').on('click', function() {
				reg4.resetMegaMenu(true);
			});
		},

		// Close menu items
		closeMegaMenu: function() {
			if (reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large') {
				reg4.resetMegaMenu(true);
			}
		},

		// Mega menu reset
		resetMegaMenu: function(closeMenu) {
			$('.primaryMenuItem + [aria-expanded]').attr('aria-expanded','false');
			$('.primaryMenuItem.active, .searchToggler.active').removeClass('active').attr('aria-expanded','false');
			if ((closeMenu !== false && (reg4.getContext() === 'medium mobile' || reg4.getContext() === 'small')) || (reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
				$('.menuToggler.active').removeClass('active');
				$('.mobileMenuContainer.shown, .hygieneMenu.shown, .megaMenu.shown, .topNavigationSearch.shown, .breadcrumbs.shown, .sharePrint.shown, [data-megamenu-overlay]').removeClass('shown');
			}
        },

        // BreadCrumbs
		breadCrumbsInit: function() {
			$('.breadcrumb-item__button--has-sub-menu').attr('aria-expanded','false').attr('aria-pressed', 'false'); 

            if (reg4.getContext() === 'medium mobile' || reg4.getContext() === 'small') {
                $('.breadcrumb-item__button--has-sub-menu').removeAttr('role');
            }

			var toggleBreadcrumbsMenu = function(elem) {
				if (!elem.hasClass('active')) {
                    
                    $('.breadcrumb-item__button--has-sub-menu.active').removeClass('active').attr('aria-expanded','false').attr('aria-pressed', 'false');
					$('.breadcrumb-item__button--has-sub-menu + [aria-expanded="true"]').attr('aria-expanded','false').attr('aria-pressed', 'false');
                    
                    $(elem).attr('aria-expanded','true').attr('aria-pressed', 'true');
					elem.addClass('active');
				}
				else {
					reg4.resetBreadcrumbs(false);
				}
			};

			if (reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large') {
				$('.breadcrumb-item__button--has-sub-menu')
					.on('keydown', function(e) {
                        if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") { // "Spacebar" for IE11 support
							if ($(this).hasClass('active')) {
								reg4.resetBreadcrumbs(false);
							}
							else {
								toggleBreadcrumbsMenu($(this));
							}
							e.preventDefault();
                        }
					})
					.on('click touchend', function(e) {
						toggleBreadcrumbsMenu($(this));
						e.preventDefault();
                    });

                    $(document).on("keyup", function(e) {
                        if (e.which === 27) {
                            reg4.resetBreadcrumbs(false);
                        }
                    })
                
			}
			
		},

		// Breadcrumbs reset
		resetBreadcrumbs: function(closeMenu) {
			$('.breadcrumb-item__button--has-sub-menu + [aria-expanded]').attr('aria-expanded','false');
			$('.breadcrumb-item__button--has-sub-menu.active').removeClass('active').attr('aria-expanded','false').attr('aria-pressed', 'false');
        },

		// Move global hygiene menu based on screen size
		moveHygieneMenu: function() {
			if (reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large') {
				$('[data-hygiene-menu]').insertAfter('[data-hygiene-menu-large-sceen-anchor]');
			}
			else {
				$('[data-hygiene-menu]').insertAfter('[data-hygiene-menu-small-sceen-anchor]');
			}
		},

		// Equal height on child elements
		equalHeight: function() {
			$('[data-equal-height]').each(function(index, mother) {
				var kids;
				if ($(window).width() >= 700) {
					var h = 0;
					kids = $(mother).find($(mother).data('equal-height'));
					kids.removeAttr('style').each(function(index, elem) {
						h = $(elem).outerHeight() > h ? $(elem).outerHeight() : h;
					}).css('height', h);
				}
				else {
					kids = $(mother).find($(mother).data('equal-height'));
					kids.removeAttr('style');
				}
			});
		},

		// Add screen-reader subheading if pre-heading is present
		semantisizePreTitles: function() {
			var preTitle = $('.content-header-subtitle');
			preTitle.each(function(index, elem) {
				var el = $(elem),
					header = el.next();
				el.clone().insertAfter(header);
				el.attr('aria-hidden','true');
				header.next().addClass('visuallyhidden');
			});
		},

		mediaLightbox23resizer: function() {
			$('[data-media-type="nett-tv"]').each(function(index, el) {
				var availableWidth = $(window).width(),
					playerHeight,
					hasSlides = $(el).data('media-has-slides') ? true : false;

				if (availableWidth > 1044) {
					availableWidth = 1044;
				}

				if (availableWidth > 720 && hasSlides) {
					playerHeight = (availableWidth / 32 * 9) + 210;
				}
				else {
					playerHeight = (availableWidth / 16 * 9) + 210;
				}

				$(el).css('padding-bottom', Math.round(playerHeight) + 'px');
			});
		},

		flexibleLightbox: function () {
			$('[data-lightbox-flexible-opener]').each(function(index, elem) {
				var el = $(elem),
					targetId = el.data('lightbox-flexible-opener'),
					target = $('[data-lightbox-flexible-content="' + targetId + '"]'),
					cover = target.find('[data-lightbox-flexible]'),
					closeBtn = target.find('[data-close-lightbox]');

				el.on('click', function(e) {
					e.preventDefault();
					target.show().focus();
					setTimeout(function() {
						$(window).trigger('resize');
					},100);
				});

				closeBtn
					.on('click', function() {
						target.hide();
						el.focus();
					})
					.on('keydown', function(e) {
						if (e.which === 9) {
							trapTabKey(target, event);
						}
					});

				target.on('keydown', function(e) {
					if (e.which === 27) {
						closeBtn.trigger('click');
						e.preventDefault();
					}
				});

				cover.on('click', function() {
					target.hide();
					el.focus();
				});
			});
		},

		// Lightbox for nett-tv, fluvi, ..
		mediaLightbox: function() {
			$('[data-lightbox-opener]').each(function(index, el) {
				$(el).on('click', function(e) {
					$('[data-lightbox]').focus();
					e.preventDefault();

					//change z-index to prevent pageHeader to be tabbed in overlay
					var pHeaderZindex = $(".pageHeader");
					$(pHeaderZindex).css("z-index", "1");

					var lbox = '',
						murl = $(el).attr('href'),
						mclosetxt = $(el).attr('data-lightbox-closetxt'),
						mlabeltxt = $(el).attr('data-lightbox-labeltxt'),
						mlabelstatus = $(el).attr('data-lightbox-label-status'),
						mlabelstatuscss = $(el).attr('data-lightbox-label-status-css'),
						hasSlides = $(el).attr('data-lightbox-slides') === 'true' ? ' data-media-has-slides="true"' : '',
						isQbrick = $(el).attr('data-lightbox-qbrick-oembed'),
						isQuickChannel = $(el).attr('data-lightbox-quickchannel-oembed');

					if ($(el).data('lightbox-opener') === 'nett-tv') {
						lbox += '<div class="lightbox" tabindex="-1" data-lightbox><div class="lightbox-blackbox" role="dialog"><div class="lightbox-inner">';
						lbox += '<span class="media-banner">';
						lbox += '<span class="media-banner-nett-tv">' + mlabeltxt + '</span>';
						if (mlabelstatus !== undefined && mlabelstatus.length > 0) {
							lbox += '<span class="' + mlabelstatuscss + '">' + mlabelstatus + '</span>';
						}
						lbox += '</span>';
						lbox += '<div class="lightbox-media">';

                        if(isQbrick === 'true') {
							lbox += '<div class="oembed-player-qbrick" style="width: 100%; height: 0; position: relative;" data-media-type="nett-tv"' + hasSlides + '"><iframe src="' + murl + '" id="mediaIframe" style="width: 100%; height: 100%; border: none; overflow: hidden; position: absolute; top: 0; left: 0;" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe></div>';							
                        }
						else if(isQuickChannel === 'true') {
							lbox += '<div class="oembed-player-quickchannel" style="width: 100%; height: 0; position: relative;" data-media-type="nett-tv"' + hasSlides + '"><iframe src="' + murl + '" id="mediaIframe" style="width: 100%; border: none; overflow: hidden; height: 100%; position: absolute; top: 0; left: 0;" allowfullscreen mozallowfullscreen webkitallowfullscreen referrerpolicy="no-referrer-when-downgrade"></iframe></div>';							
                        }						
                        else {
							lbox += '<div class="oembed-player" style="width: 100%; height: 0; position: relative;" data-media-type="nett-tv"' + hasSlides + '"><iframe src="' + murl + '" id="mediaIframe" style="width: 100%; border: none; height: 100%; overflow: hidden; position: absolute; top: 0; left: 0;" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe></div>';
                        }
						
						lbox += '</div>';
						lbox += '<button type="button" title="Lukk" class="closeButton" data-close-lightbox><span class="visuallyhidden">'+ mclosetxt +'</span></button>';
						lbox += '</div></div></div>';
					}
					else if ($(el).data('lightbox-opener') === 'media-objekt') {
						lbox += '<div class="lightbox" tabindex="-1" data-lightbox><div class="lightbox-blackbox"><div class="lightbox-inner">';
						lbox += '<span class="media-banner">';
						lbox += '<span class="media-banner-nett-tv">' + mlabeltxt + '</span>';
						if (mlabelstatus !== undefined && mlabelstatus.length > 0) {
							lbox += '<span class="media-banner-live">' + mlabelstatus + '</span>';
						}
						lbox += '</span>';
						lbox += '<div class="lightbox-media">';
						lbox += '<div style="width: 100%; height: 0; position: relative; padding-bottom: 56.25%"><iframe src="' + murl + '" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; border: none; overflow: hidden;" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe></div>';
						lbox += '</div>';
						lbox += '<button type="button" title="Lukk" class="closeButton" data-close-lightbox><span class="visuallyhidden">'+ mclosetxt +'</span></button>';
						lbox += '</div></div></div>';
					}

					if ($('[data-lightbox]').length > 0) {
						$('[data-lightbox]').remove();
					}

					$('body').prepend(lbox);

					reg4.mediaLightbox23resizer();

					$('[data-lightbox]').focus();

					$('[data-close-lightbox]').on('click', function() {
						$('[data-lightbox]').remove();

						//change z-index back to org value
						pHeaderZindex.css("z-index", "999");

						$(el).focus();
					});

					$('body').on('keyup', function(e) {
						if (e.which === 27) {
							$('[data-lightbox]').remove();

							//change z-index back to org value
							pHeaderZindex.css("z-index", "999");
								
							$(el).focus();
							e.preventDefault();
						}
					});
				});
			});
		},

		// Accessify Share
		accessifySharing: function() {
			var sharingButtons = $('[data-sharing-panel] .at-share-btn');
			sharingButtons.each(function(index, el) {
				$(el)
					.attr('tabindex', '0')
					.on('keydown', function(e) {
						if (e.which === 13) {
							$(el).find('>span').trigger('click');
						}
					});
			});

			$('[data-toggle="[data-sharing-panel]"].closeButton').on('keydown', function(e) {
				if (e.which === 9) {
					trapTabKey($('[data-sharing-panel]'), event);
				}
			});
			$('[data-sharing-panel] .socialmedia_linklist li:first-child a').on('keydown', function(e) {
				if (e.shiftKey && e.which === 9) {
					trapTabKey($('[data-sharing-panel]'), event);
				}
			});
		},

		dictionaryWords: function() {
			$('[data-dictionary-description-id]').each(function(index, el) {
				var $did = $(el).data('dictionary-description-id');
				$(el).replaceWith(function() {
					return $('<a href="#' + $did + '" class="dictionary-word" data-dictionary-description-id="' + $did + '" tabindex="0" aria-haspopup="true">' + $(el).html() + '</a>');
				});
			});
			$('.dictionary-word').on('click', function (e) {
				var $this = $(this),
					$dictionaryWordOpener = $this,
					$anchor = $(this).data('dictionary-description-id'),
					$anchorText = $('#' + $anchor).html(),
					$insertedID = "insertID-" + $anchor,
					$anchorTextHtml = '<div style="" id="' + $insertedID + '" class="inserted-dictionary-word" tabindex="-1" data-inserted-dictionary-word><p class="visuallyhidden">Ordforklaring: </p>' + $anchorText + ' <button type="button" class="closeButton" role="dialog" data-close-dictionary-word><span class="visuallyhidden">Lukk ordforklaring</span></button></div>';

				e.preventDefault();

				$('[data-inserted-dictionary-word]').remove();
				$('.dictionaryWordShown').removeClass('dictionaryWordShown');

				if ($this.hasClass('dictionaryWordShown')) {
					$this.parent().find('.inserted-dictionary-word').remove();
					$this.removeClass('dictionaryWordShown');
				}
				else {
					$this.addClass('dictionaryWordShown');
					$this.parent().parent().css('position', 'relative');
					$this.after($anchorTextHtml);
					$('[data-inserted-dictionary-word]').focus();

					$('[data-close-dictionary-word]').on('click', function () {
						$dictionaryWordOpener.removeClass('dictionaryWordShown').focus();
						$('[data-inserted-dictionary-word]').remove();
					});

					$(document).on('keydown', '[data-inserted-dictionary-word]', function(e) {
						if (e.which === 27) {
							$('[data-close-dictionary-word]').trigger('click');
						}
						else {
							trapTabKey($(this), event);
						}
					});
				}
			});

			if ($('.dictionary-word').length) {
				$('html').on('click', function() {
					if ($('[data-inserted-dictionary-word]').length) {
						$('[data-inserted-dictionary-word]').remove();
						$('.dictionaryWordShown').removeClass('dictionaryWordShown');
					}
				});
				$('.dictionary-word, .inserted-dictionary-word').on('click', function(e) {
						e.stopPropagation();
				});
			}
		},

		// Scroll to top-of-page anchor
		toTopOfPage: function() {
			if ($('#top-of-page').length < 1) {
				var topAnchor = '<a id="top-of-page" tabindex="-1"></a>';
				$('body').prepend(topAnchor);
			}
			$('[data-to-top-of-page]').on('click', function(e) {
				var el = $(this);
				$('html, body').animate({
					scrollTop: 0
				}, 0, function() {
					$(el.attr('href')).focus();
				});
				e.preventDefault();
			});
		},

		// Skip-link scroll to main content
		skipToMain: function() {
			var skipLink = $('.skipLink');
			var target = $(skipLink.attr('href'));

			skipLink.on('click', function(e) {
				$('html, body').animate({
					scrollTop: target.position().top
				}, 300, function() {
					target.focus();
				});
				e.preventDefault();
			});
		},

		// Check if search filters area is closed
		removeActiveSearchFilters: function() {
			if ($('#searchFilters .custom-selector-reset').length) {
				$('[data-remove-filters-link]').removeClass('hidden');
				if ($('#searchFilters').hasClass('hidden')) {
					$('[data-toggle-hidden="#searchFilters"]').click();
				}
				$('[data-remove-filters-link] a').on('click', function(e) {
					e.preventDefault();

					var activeFilters = [];
					var urlValue = document.location.href;

					$('#searchFilters .custom-selector-reset').each(function(index, el) {
						var filter = $(el);
						activeFilters.push(filter.data('id'));

						if (filter.data('id') === 'from') {
							activeFilters.push('to');
							activeFilters.push('sesjon');
						}
					});

					// remove filters					
					$.each(activeFilters, function(index, elem) {
						var oldValue = getParam(elem);
						oldValue = encodeURIComponent(oldValue);
						var removeVal = elem + '=' + oldValue;

						if (urlValue.indexOf('?' + removeVal + '&') != '-1') {
							urlValue = urlValue.replace('?' + removeVal + '&', '?');
						}
						else if (urlValue.indexOf('&' + removeVal + '&') != '-1') {
							urlValue = urlValue.replace('&' + removeVal + '&', '&');
						}
						else if (urlValue.indexOf('?' + removeVal) != '-1') {
							urlValue = urlValue.replace('?' + removeVal, '');
						}
						else if (urlValue.indexOf('&' + removeVal) != '-1') {
							urlValue = urlValue.replace('&' + removeVal, '');
						}
					});

					window.location = urlValue;
				});
			}
		},

		// Frontpage: Add click event to main event image without surrounding link
		mainEventImageLink: function() {
			if ($('body').hasClass('page-frontpage')) {
				var mainTitle = $('.current-event-main .col:nth-child(1) .current-event-title > a');
				var mainTitleHref = mainTitle.attr('href');
				var mainImg = $('.current-event-main .col:nth-child(2) > img');
				mainImg.addClass('pointer');
				mainImg
					.on('mouseover', function() {
						mainTitle.addClass('hovered');
					})
					.on('mouseout', function() {
						mainTitle.removeClass('hovered');
					})
					.on('click', function() {
						window.location = mainTitleHref;
					});
			}
		},

		// Filtering active roles for page "Vis regjering"
		filterActiveRolesOnly: function() {
			var filterCheckbox = $('#filterActiveRoles');

			function filterActive() {
				if (filterCheckbox.length) {
					var panels = $('.article-body .factbox'),
						activeOnly = filterCheckbox.prop('checked') === true,
						filteredItems = activeOnly ? '.factbox-content .data-listing > li:not("[data-inactive]")' : '.factbox-content .data-listing > li';
					panels.each(function (index, el) {
						var elem = $(el),
							count = elem.find(filteredItems).length,
							amount = elem.find('.factbox-title > .factbox-toggler .factbox-title-text [data-amount]');
						if (activeOnly) {
							elem.addClass('active-only');
						} else {
							elem.removeClass('active-only');
						}
						amount.html(count);
					});
				}
			}

			$(window).on('load', function () {
				filterActive();
			});

			filterCheckbox.on('click', function () {
				filterActive();
			});
		}
	};

	// Keep focus within lightbox when close button (last element) is blurred
	$(document).on('blur', '[data-close-lightbox]', function() {
		$(this).parents('[data-lightbox]').focus();
	});

	// Close megamenu button
	$('[data-close-megamenu]')
		.on('keydown', function(e) {
			if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
				if (e.which === 13 || e.which === 27) {
					reg4.closeMegaMenu(true);
					$(this).closest('.megamenuInner').parent().prev().focus();
					e.preventDefault();
				}
			}
		})
		.on('click', function(e) {
			reg4.closeMegaMenu(false);
			e.preventDefault();
		});

	// Close megamenu with escape-key
	$('.megaMenuItem > div a, .primaryMenuItem')
		.on('keydown', function(e) {
			if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
				if (e.which === 27) {
					reg4.closeMegaMenu(true);
					$(this).closest('.megamenuInner').parent().prev().focus();
					e.preventDefault();
				}
			}
		});   
    
    /*
    INFO: search filters behave differently on screens under and over 499px.
    On small screens they are allways hidden on page load with css.
    On bigger screens this is controlled by a setting in EPI.
    */

    $(window).on('load', function() {
        if (reg4.getContext() !== 'small' && $('[data-id="filters"]').is(':visible')) {
            $('[data-id="filters"]').addClass('filters--shown');
            $('[data-toggle-search-filters]').addClass('active');
        } else {
            $('[data-id="filters"]').addClass('filters--hidden');
            $('[data-toggle-search-filters]').removeClass('active');
            
        }	
        
        $(".search .limit").attr('aria-hidden', 'false');
    });                          

    var toggleSearchFilters = function(el){
        var trigger = el,
        target = $(trigger.data('toggle-search-filters'));

        if (reg4.getContext() === 'small') {
            if (!target.hasClass('filters--shown')) {
                target.addClass('filters--shown');
                target.removeClass('filters--hidden');
                trigger.addClass('active');
                
                if (trigger.attr('aria-expanded')) {
                    trigger.attr('aria-expanded','true');
                }
            }
            else {
                target.removeClass('filters--shown');
                target.addClass('filters--hidden');
                trigger.removeClass('active');
                
                if (trigger.attr('aria-expanded')) {
                    trigger.attr('aria-expanded','false');
                }
            }
        } else {
            //BIG
            if (!target.hasClass('filters--hidden')) {
                target.addClass('filters--hidden');
                target.removeClass('filters--shown');
                trigger.removeClass('active');
                
                if (trigger.attr('aria-expanded')) {
                    trigger.attr('aria-expanded','false');
                }
            }
            else {
                target.removeClass('filters--hidden');
                target.addClass('filters--shown');
                trigger.addClass('active');
                
                if (trigger.attr('aria-expanded')) {
                    trigger.attr('aria-expanded','true');
                }
            }
        }

    }

    $(document).on('click', '[data-toggle-search-filters]', function() {
		toggleSearchFilters($(this));
	});

	// Toggle hidden state from data-attribute
	var doToggleHidden = function(el) {
		var trigger = el,
			target = $(trigger.data('toggle-hidden'));

		if (!target.hasClass('hidden')) {
			trigger.removeClass('active');
			target.addClass('hidden');
			if (trigger.attr('aria-expanded')) {
				trigger.attr('aria-expanded','false');
			}
		}
		else {
			trigger.addClass('active');
			target.removeClass('hidden');
			if (trigger.attr('aria-expanded')) {
				trigger.attr('aria-expanded','true');
			}
		}
	};

	$(document).on('click', '[data-toggle-hidden]', function() {
		doToggleHidden($(this));
	});

	// Add or modify querystring
	function changeParam(key, value) {
		// Get query string value
		var urlSearch = location.search,
			urlValue;
		if (urlSearch.indexOf("?") == '-1') {
			urlValue = '?' + key + '=' + value;
			history.replaceState({state:1, rand: Math.random()}, '', urlValue);
		}
		else {
			// Check for key in query string, if not present
			if (urlSearch.indexOf(key) == '-1') {
				urlValue = urlSearch + '&' + key + '=' + value;
			}
			else { // If key present in query string
				var oldValue = getParam(key);
				oldValue = encodeURIComponent(oldValue);
				if (urlSearch.indexOf('?' + key + '=') != '-1') {
					urlValue = urlSearch.replace('?' + key + '=' + oldValue, '?' + key + '=' + value);
				}
				else {
					urlValue = urlSearch.replace('&' + key + '=' + oldValue, '&' + key + '=' + value);
				}
			}
			history.replaceState({state: 1, rand: Math.random()}, '', urlValue);
		}
	}

	// Update url parameter without manipulating browser history
	function updateParam(key, value) {
		// Get query string value
		var urlSearch = location.search,
			urlValue;
		if (urlSearch.indexOf("?") == '-1') {
			urlValue = '?' + key + '=' + value;
			history.replaceState({state:1, rand: Math.random()}, '', urlValue);
		}
		else {
			// Check for key in query string, if not present
			if (urlSearch.indexOf(key) == '-1') {
				urlValue = urlSearch + '&' + key + '=' + value;
			}
			else { // If key present in query string
				var oldValue = getParam(key);
				oldValue = encodeURIComponent(oldValue);
				if (urlSearch.indexOf('?' + key + '=') != '-1') {
					urlValue = urlSearch.replace('?' + key + '=' + oldValue, '?' + key + '=' + value);
				}
				else {
					urlValue = urlSearch.replace('&' + key + '=' + oldValue, '&' + key + '=' + value);
				}
			}
			history.replaceState({state: 1, rand: Math.random()}, '', urlValue);
		}
	}

	// Get url parameter value
	function getParam(name) {
		name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
			results = regex.exec(location.search);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	// Remove parameter from querystring
	function removeParam(key) {
		var urlValue = document.location.href;
		
		// Get query string value
		var urlSearch = location.search;
		
		if (key != '') {
			var oldValue = getParam(key);
			oldValue = encodeURIComponent(oldValue);
			var removeVal = key + '=' + oldValue;
			if (urlSearch.indexOf('?' + removeVal + '&') != '-1') {
				urlValue = urlValue.replace('?' + removeVal + '&', '?');
			}
			else if (urlSearch.indexOf('&' + removeVal + '&') != '-1') {
				urlValue = urlValue.replace('&' + removeVal + '&', '&');
			}
			else if (urlSearch.indexOf('?' + removeVal) != '-1') {
				urlValue = urlValue.replace('?' + removeVal, '');
			}
			else if (urlSearch.indexOf('&' + removeVal) != '-1') {
				urlValue = urlValue.replace('&' + removeVal, '');
			}
		}
		else {
			urlSearch = location.search;
			urlValue = urlValue.replace(urlSearch, '');
		}
		history.replaceState({state: 1, rand: Math.random()}, '', urlValue);
	}

	// Get href parameter value
	function getParamFromHref(name, href) {
		var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
			results = regex.exec(href);
		return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
	}

	// Sort array by key
	function sortByKey(array, key) {
		return array.sort(function(a, b) {
			var x = a[key]; var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	var horingssvarList = $('[data-horingssvar-list]');
		
	if (!horingssvarList.length)
	{
		var horingssvarLinkListItems = $('#horingssvar > .link-list > li > a');
		if (horingssvarLinkListItems.length) {
			$.each(horingssvarLinkListItems, function(index, elem) {
				var href = $(elem).attr('href');
				var uid = getParamFromHref('uid', href);

			if (uid) {
				uid = uid.replace('.', '');
				$(elem).attr('id', uid);
			}				
			});
		}
	}

	$(window).on('load', function() {
		var urlParamLastVisited = getParam('lastvisited'),
			urlParam = getParam('expand') || getParam('factbox');

		if (urlParam === "all") {			
			var toggleAllButton = $('[data-toggle-factbox-all]');
            
            if (toggleAllButton) {				
				toggleAllButton.click();
            }
            
		} else if (urlParam.indexOf('all-in-group') >= 0 ) {
            var expandGroupID = urlParam.replace('all-in-group-', '');
            var $expandGroup = $('[data-factbox-group="' + expandGroupID + '"]');
            var toggleAllInGroup = $($expandGroup).find('[data-toggle-factbox-all-in-group]');

            if (toggleAllInGroup) {				
                toggleAllInGroup.click();
                
                setTimeout(function() {
                    $('html, body').animate({
                        scrollTop: $expandGroup.offset().top - 10
                    }, 300, function() {
                        $expandGroup.focus();
                    });
                }, 10);
            }
            
        } else if (urlParam !== '') {
            // Check if there is a data attr called toggle-dep 
            var depElement = $('[data-toggle-dep="' + urlParam + '"]');
            // If depElement is found, use that attribute -> if not, use toggle-factbox
            var elem = depElement.length > 0 ? depElement : $('[data-toggle-factbox="#' + urlParam + '"]');			

			if (elem) {
				elem.triggerHandler('click');

				if (urlParamLastVisited === '') {
					elem.attr('id', '__' + urlParam);
					var el = $('#__' + urlParam);
					setTimeout(function() {
						if(el.length) {
							var scrollBase1 = el.offset().top - 10;					
							$('html, body').animate({
								scrollTop: scrollBase1
							}, 300, function() {
								el.focus();
							});
						}
					}, 10);
				}
			}
		}

		if (urlParamLastVisited !== '') {
			var lastvisited = $('#' + urlParamLastVisited);
			if (lastvisited.length) {
				var scrollBase2 = lastvisited.offset().top - 10;
				$('html, body').animate({
					scrollTop: scrollBase2
				}, 300, function() {
					lastvisited.focus();
				});
			}
		}
	});

	$('.factbox-content a').on('click', function(e) {
		var trigger = $(this),
			factbox = trigger.closest('.factbox'),
			toggler = factbox.find('.factbox-title [data-toggle-factbox]'),
			data = toggler.data('toggle-factbox');

		if (typeof data === 'string') {
			data = data.indexOf('#') > -1 ? data.split('#')[1] : data;
			if (data) {
				changeParam('expand', data);
			}
		}

		if (factbox.hasClass('factbox-horinger')) {
			var lastvisited = trigger.attr('id');
			changeParam('lastvisited', lastvisited);
		}
	});

    $('[data-toggle-factbox-all-in-group]')
        .on('click', function() {
            var $toggleButton = $(this);
            var parentWrapper = $toggleButton.parent().parent();
            var parentID = parentWrapper.data("factbox-group");
            var buttons = $(parentWrapper).find('[data-toggle-factbox]');
            
            var openAllText = $toggleButton.data("text-open-all");
            var closeAllText = $toggleButton.data("text-close-all");

            for (var i = 0; i < buttons.length; i++) {
                var button = buttons[i];
                if($(button).attr('aria-expanded') == "false" && !$toggleButton.hasClass("active")){
                    button.click();
                }
                else if($(button).attr('aria-expanded') == "true" && $toggleButton.hasClass("active")){
                    button.click();
                }
            }

            if($toggleButton.hasClass("active")){
                $toggleButton.removeClass("active");
                $toggleButton.text(openAllText);
                removeParam('expand');
            }
            else {
                $toggleButton.addClass("active");
                $toggleButton.text(closeAllText);				
                changeParam('expand', 'all-in-group-' + parentID);
            }
        });

	$('[data-toggle-factbox-all]')
		.on('click', function(e) {
			var buttons = $('[data-toggle-factbox]');
			var toggleButton = $('[data-toggle-factbox-all]');

			for (var i = 0; i < buttons.length; i++) {
				var button = buttons[i];
				if($(button).attr('aria-expanded') == "false" && !toggleButton.hasClass("active")){
					button.click();
				}
				else if($(button).attr('aria-expanded') == "true" && toggleButton.hasClass("active")){
					button.click();
				}
			}

			if(toggleButton.hasClass("active")){
				toggleButton.removeClass("active");
				var openAllText = $('[data-text-open-all]').data("text-open-all");
				$(toggleButton).text(openAllText);
				removeParam('expand');
			}
			else {
				toggleButton.addClass("active");
				var closeAllText = $('[data-text-close-all]').data("text-close-all");
				$(toggleButton).text(closeAllText);				
				changeParam('expand', "all");				
			}
		})

	$('[data-toggle-factbox]')
		.on('click', function(e) {
			var trigger = $(this),
				data = trigger.data('toggle-dep') ? trigger.data('toggle-dep') : trigger.data('toggle-factbox'),
				target = $(trigger.data('toggle-factbox')),
				setExpandParam = trigger.data('set-expand-param') === false ? false : true;
                
            if (typeof data === 'string' && data.match("^#")) {
                data = data.split('#')[1];
            }

            if (target.is(':visible')) {
				trigger.removeClass('active').attr('aria-expanded', 'false');
				target.slideUp(300);
				if (setExpandParam) {
					removeParam('expand');
					removeParam('focus');
					removeParam('lastvisited');
				}
			}
			else {
				trigger.addClass('active').attr('aria-expanded', 'true');
				target.slideDown(300);
				if (setExpandParam) {
					changeParam('expand', data);
					removeParam('factbox');
					if (getParam('factboxFocus')) {
						removeParam('factboxFocus');
						changeParam('focus', true);
					}
				}
			}

			e.preventDefault();
			e.stopPropagation();
		})
		.on('keyup', function(e) {
			var trigger = $(this),
				key = e.keyCode ? e.keyCode : e.which;

			if (key === 40) {
				var nextAccordionElem = trigger.closest('.factbox').next('.factbox').find('[data-toggle-factbox]');
				if (nextAccordionElem.length) {
					nextAccordionElem.focus();
					nextAccordionElem.closest('.factbox').addClass('is-focused');
				}
			} else if (key === 38) {
				var prevAccordionElem = trigger.closest('.factbox').prev('.factbox').find('[data-toggle-factbox]');
				if (prevAccordionElem.length) {
					prevAccordionElem.focus();
					prevAccordionElem.closest('.factbox').addClass('is-focused');
				}
			} else if (trigger.is(':focus')) {
				trigger.closest('.factbox').addClass('is-focused');
			}
		})
		.on('blur', function() {
			$(this).closest('.factbox').removeClass('is-focused');
		});

	$('[data-save-filterstatus]').on('click', function() {
		var trigger = $(this),
			target = trigger.data('save-filterstatus'),
			status = trigger.attr('aria-expanded');
		$(target).attr('value', status);
	});

	// Toggle display element from data-attribute
	$(document).on('click', '[data-toggle]', function(e) {
		var trigger = $(this),
			initialText = trigger.data('initial-text'),
			activeText = trigger.data('active-text'),
			target = $(trigger.data('toggle'));

		if (target.hasClass('shown')) {
			trigger.removeClass('active');
			if (trigger.attr('aria-expanded')) {
				trigger.attr('aria-expanded','false');
			}
			if (initialText) {
				trigger.text(initialText);
			}
			target.removeClass('shown');
		}
		else {
			trigger.addClass('active');
			if (activeText) {
				trigger.text(activeText);
			}
			if (trigger.attr('aria-expanded')) {
				trigger.attr('aria-expanded','true');
			}
			target.addClass('shown');
		}
		e.preventDefault();
	});

	// Toggle display tab elements from data-attribute
	$(document).on('click', '[data-tab-target]', function(e) {
		var trigger = $(this),
			target = $('[data-target-id=' + trigger.data('tab-target') + ']'),
			tabset = trigger.data('tabset');

		if (!target.hasClass('shown')) {
			$('[data-tabset="' + tabset + '"].active:not([data-tab-id="' + trigger.data('tab-id') + '"])').removeClass('active').attr('aria-expanded','false');
			trigger.addClass('active').attr('aria-expanded','true');

			$('[data-tabset-target="' + tabset + '"][data-target-id]:not([data-target-id="' + trigger.data('tab-target') + '"])').removeClass('shown');
			target.addClass('shown');

			if (reg4.getContext() === 'small') {
				if ($('[data-scroll-base]').length > 0 && e.originalEvent !== undefined) {
					var scrollBase = $('[data-scroll-base]').position().top;
					if ($(document).scrollTop() < scrollBase) {
						$('html, body').animate({
							scrollTop: scrollBase
						}, 100);
					}
				}
			}
		}
		e.preventDefault();
	});

	// Toggle slide hidden element from data-attribute
	$('[data-toggle-slide]').on('click', function(e) {
		var trigger = $(this),
			target = $('[data-id="' + trigger.data('toggle-slide') + '"]');

		if (trigger.hasClass('active')) {
			trigger.removeClass('active');
			target.stop(true, true).slideUp('fast');
		}
		else {
			trigger.addClass('active');
			target.stop(true, true).slideDown('fast');
			target.focus();
		}
		e.preventDefault();
	});

	// Toggle main menu, for smaller screens
	$('[data-toggle-menu]').on('click', function() {
		var trigger = $(this),
			targetShow = $('.megaMenuOverlay, .hygieneMenu, .mobileMenuContainer, .megaMenu, .breadcrumbs, .sharePrint, .back-link'),
			targetHide = $('.topNavigationSearch');

		if (trigger.hasClass('active')) {
			trigger.removeClass('active').attr('aria-expanded','false');
			targetShow.removeClass('shown');
		}
		else {
			trigger.addClass('active').attr('aria-expanded','true');
			$('[data-toggle-search]').removeClass('active').attr('aria-expanded','false');
			targetShow.addClass('shown');
			targetHide.removeClass('shown');
		}
	});

	// Toggle search, for smaller screens
	$('[data-toggle-search]').on('click', function() {
		var trigger = $(this),
			targetShow = $('.megaMenuOverlay, .mobileMenuContainer, .topNavigationSearch, .back-link'),
			targetHide = $('.hygieneMenu, .megaMenu, .breadcrumbs, .sharePrint');

		if (trigger.hasClass('active')) {
			trigger.removeClass('active').attr('aria-expanded','false');
			targetShow.removeClass('shown');
		}
		else {
			trigger.addClass('active').attr('aria-expanded','true');
			$('[data-toggle-menu]').removeClass('active').attr('aria-expanded','false');
			targetShow.addClass('shown');
			targetHide.removeClass('shown');
		}
	});

	// Generic remembering of state on data-toggle, stores values in localstorage
	if (($('[data-toggle-remember-state]').length >= 1) && (Modernizr.localstorage)) {
		$('[data-toggle-remember-state]').each(function() {
			var target = $(this).attr('data-toggle-hidden'),
				thisPageId = window.location.pathname.match(/(?![/]id)\d+/g),
				storageName = "toggle-remember-state-" + thisPageId + target;

			if (localStorage.getItem(storageName) === 'true') {
				$(target).removeClass('hidden');
				$(this).addClass('active');
			}
			$(this).on('click', function() {
				if ($(this).hasClass('active')) {
					localStorage.setItem(storageName, true);
				} else {
					localStorage.setItem(storageName, false);
				}
			});
		});
	}

	// Hide banner
	$('[data-hide-banner]')
		.on('keydown', function(e) {
			if (e.which === 13) {
				$(this).closest('.feedback-banner').fadeOut('400');
			}
		})
		.on('click', function(e) {
			$(this).closest('.feedback-banner').fadeOut('400');
		});

	function sortList(a, b) {
		return ($(b).data($('[data-sort].sort').data('sort'))) < ($(a).data($('[data-sort].sort').data('sort'))) ? 1 : -1;
	}
	$('[data-sort]').on('click', function() {
		var $trigger = $(this),
			$target = $trigger.data('sort-target');
		$trigger.addClass('active sort').siblings('.btn-sort').removeClass('active');
		$($target).children('li').sort(sortList).appendTo($($target));
		$trigger.removeClass('sort');
	});
	$('[data-sort]').each(function(index, el) {
		if ($(el).hasClass('active')) {
			$(el).triggerHandler('click');
		}
	});

	// Set focus on element
	$('[data-set-focus]').on('click', function() {
		$($(this).data('set-focus')).focus();
	});

	// Print dialog
	$('[data-print-page]').on('click', function() {
		window.print();
	});

	// Sharing
	$('[data-sharing-toggler]').on('click', function() {
		reg4.accessifySharing();
	});

	// Share and Share-source panels on mobile menu. Only one of the panels should be open at a time.
	$(document).on('click', '[data-sharing-toggler], [data-source-toggler]', function () {
		if (window.matchMedia('(min-width: 768px)').matches) return;

		var keepId = $(this).attr('aria-controls');

		setTimeout(function () {
			// Close the other panel
			$('[data-sharing-panel], [data-source-panel]').each(function () {
			if (this.id !== keepId) {
				$(this).removeClass('shown');
			}
			});

			// Reset the other button
			$('[data-sharing-toggler], [data-source-toggler]').each(function () {
				if ($(this).attr('aria-controls') !== keepId) {
					$(this).removeClass('active')
						.attr('aria-expanded', 'false');
				}
			});
		}, 0);
	});

	// Close Share and Share-source panels click outside.
	$(document).on('click', function (e) {
		if (window.matchMedia('(max-width: 768px)').matches) return;
		if ($(e.target).closest('[data-sharing-toggler],[data-source-toggler],[data-sharing-panel],[data-source-panel]').length) return;

		$('[data-sharing-panel],[data-source-panel]').removeClass('shown');
		$('[data-sharing-toggler],[data-source-toggler]').removeClass('active').attr('aria-expanded', 'false');
	});

	// Copy to clipboard functionality for the source sharing panel.
	document.addEventListener("click", async (e) => {
		const btn = e.target.closest("[data-copy-source]");
		if (!btn) return;

		const selector = btn.getAttribute("data-copy-source");
		const el = document.querySelector(selector);
		if (!el) return;

		const defaultText = btn.getAttribute("data-copy-default") || "Kopier referanse";
		const successText = btn.getAttribute("data-copy-success") || "Kopiert referanse";

		const text = el.innerText.replace(/\s+/g, " ").trim();

		try {
			await navigator.clipboard.writeText(text);
		} catch {
			const ta = document.createElement("textarea");
			ta.value = text;
			document.body.appendChild(ta);
			ta.select();
			document("copy");
			ta.remove();
		}

		btn.textContent = successText;
		btn.classList.add("copied");

		clearTimeout(btn._copyTimer);
		btn._copyTimer = setTimeout(() => {
			btn.textContent = defaultText;
			btn.classList.remove("copied");
		}, 5000); // Reset the button text after 5 seconds
	});

	// Note about rss link
	$('.sharePrint > .rss > .rss-icon').each(function(index, elem) {
		var el = $(elem),
			note = el.next('.rss-note'),
			over = function() {
				el.addClass('active');
				note.addClass('shown');
			},
			out = function() {
				el.removeClass('active');
				note.removeClass('shown');
			};

		el
			.on('mouseenter focus', function(e) {
				if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
					el.doTimeout('crumbItem', 300, over, e.target);
				}
			})
			.on('mouseleave blur', function() {
				if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
					el.doTimeout('crumbItem', 300, out);
				}
			});
	});

	$('html').on('click', function() {
		if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
            reg4.resetMegaMenu(true);
            reg4.resetBreadcrumbs(true);
		}
	});

	$('.hygieneMenu .language, .primaryMenuItem.hasDropdown, .breadcrumb-item__button--has-sub-menu, .breadcrumb-item__sub-menu, .megaMenuItem > div').on('click', function(e) {
		e.stopPropagation();
	});

	$('[data-language-selector-trigger]')
		.on('click', function() {
			if ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large')) {
				reg4.resetMegaMenu(true);
			}
		})
		.on('focus', function() {
			reg4.hideFontSizeNote();
		});

	var $focusableElems = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

	function trapTabKey(obj, e) {

		// if TAB or SHIFT-TAB pressed, keep focus on focuable elements within the lightbox
		if (e.which === 9) {
			var o = obj.find('*'),
				focusableItems,
				focusedItem,
				numberOfFocusableItems,
				focusedItemIndex;

			focusableItems = o.filter($focusableElems).filter(':visible');
			focusedItem = jQuery(':focus');
			numberOfFocusableItems = focusableItems.length;
			focusedItemIndex = focusableItems.index(focusedItem);

			if (e.shiftKey) {
				// Back tab - if focused on first item and user preses back-tab, go to the last focusable item
				if (focusedItemIndex === 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					e.preventDefault();
				}
			}
			else {
				// Forward tab - if focused on the last item and user preses tab, go to the first focusable item
				if (focusedItemIndex === numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					e.preventDefault();
				}
			}
		}
	}

	// Fontsize notice
	$(reg4.fontSizeBtn)
		.on('click', function() {
			if ($(reg4.fontSizeNote).hasClass('open')) {
				reg4.hideFontSizeNote();
			}
			else {
				reg4.showFontSizeNote();
			}
		})
		.on('mouseenter', function() {
			reg4.showFontSizeNote();
		})
		.on('mouseleave', function() {
			reg4.hideFontSizeNote();
		});
	$(document).on('blur', reg4.fontSizeNote, function() {
		reg4.hideFontSizeNote();
	});

	// Hide fontsize note when (tab-)focusing logo
	$('.logoWrapper a').on('focus', function() {
		reg4.hideFontSizeNote();
	});

	// Prevent focus on mouse-click on button elements
	$('button').on('mouseup', function() {
		$(this).blur();
	});

	// Make things happen..
	$(window).on('load', function() {
		reg4.languageSelector();
		reg4.megaMenuInit();
        reg4.resetMegaMenu(true);
        reg4.breadCrumbsInit();
		reg4.resetBreadcrumbs(true);
		reg4.semantisizePreTitles();
		reg4.mediaLightbox();
		reg4.flexibleLightbox();
		reg4.dictionaryWords();
		reg4.toTopOfPage();
		reg4.skipToMain();
		reg4.removeActiveSearchFilters();
		reg4.mainEventImageLink();
		reg4.filterActiveRolesOnly();
	});
	$(window).on('load afterresize', function() {
		reg4.equalHeight();

		if (((reg4.getContext() === 'medium mobile' || reg4.getContext() === 'small') && !$('.menuToggler').hasClass('active')) || ((reg4.getContext() === 'medium desktop' || reg4.getContext() === 'large') && $('.primaryMenuItem.active').length < 1)) {
			$('[data-megamenu-overlay]').removeClass('shown');
		}

		// This is for adding the fader and zoom button to tables that overflow, and the swipe icon on touch devices. It runs on load and resize to catch changes in layout.
		$('.tablewrapper > table, .tblwrp-scrollarea > table').each(function () {
			var $table = $(this);
			var $twrap = $table.parent(); // the wrapper

			// Measure after layout
			var tableW = $table.outerWidth();
			var wrapW = $twrap.innerWidth();

			// Add fader + zoom button when overflowing (once)
			if (wrapW < tableW) {
			if (!$table.next().hasClass('tablewrapper-fader')) {
				$table.after('<div class="tablewrapper-fader"></div>');
			}
			if (!$twrap.prev().hasClass('btn-zoom')) {
				$twrap.before('<button class="btn-zoom" data-btn-zoom-table>' + langShowFullTable + '</button>');
			}
			} else {
			// If it no longer overflows, clean up (optional but usually nice)
			$table.next('.tablewrapper-fader').remove();
			if ($twrap.prev().hasClass('btn-zoom')) {
				$twrap.prev('.btn-zoom').remove();
			}
			}

			// Swipe icon logic (mobile + touch + overflow)
			if ($(window).width() < 769 && $('html').hasClass('touch')) {
			if ($twrap[0].scrollWidth > $twrap[0].clientWidth) {
				if ($twrap.find('.swipe-icon').length === 0) {
				$twrap.append('<span class="swipe-icon show"></span>');
				}

				$twrap
				.off('.swipeIcon')
				.one('touchstart.swipeIcon touchmove.swipeIcon mousedown.swipeIcon', function () {
					$(this).find('.swipe-icon').fadeOut(200, function () { $(this).remove(); });
				});
			} else {
				$twrap.find('.swipe-icon').remove();
			}
			} else {
			$twrap.find('.swipe-icon').remove();
			}
		});
	});
	
	$(window).on('afterresize', function() {
		reg4.mediaLightbox23resizer();
	});

	// Add stylesheet to Twitter widget iframes
	$(window).on('load', function () {
		var $head = $("[data-twitter-feed] iframe").contents().find("head");
		$head.each(function (index, el) {
			$(el).append($("<link/>", {
				rel: "stylesheet",
				href: "/dist-web/css/twitter-iframe.css",
				type: "text/css"
			}));
		});
	});

	if ($('[data-twitter-feed]').length > 0) {
		window.twttr = (function (d, s, id) {
			var t, js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) { return; }
			js = d.createElement(s); js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);
			return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f); } });
		}(document, "script", "twitter-wjs"));
	}

	if ($('.media-banner').length >= 1) {
		$('[data-broadcaststatus-uri]').each(function () {
			var broadcaststatusUri = $(this).data('broadcaststatus-uri'),
				target = $(this),
				lightboxTarget = '[data-lightbox-opener]';
			$.getJSON(broadcaststatusUri)
				.done(function (data) {
					$(target).removeClass().addClass('media-banner-' + data.Class);
					$(target).text(data.Text);
					if ($(target).parents('.webBroadcastBlock').length >= 1) {
						$(target).parents('.webBroadcastBlock').find(lightboxTarget).attr('data-lightbox-label-status', data.Text);
					} 
				});
		});
	}

	// Accessibility improvement: sets class when element is focused by keyboard navigation
	document.addEventListener('keyup', function(e) {
		var key = e.keyCode ? e.keyCode : e.which;
		if (key === 9 || key === 38 || key === 40) {
				var elem = document.body;
				elem.classList.add('keyboard-navigation');
		}
	});
	document.addEventListener('mousedown', function() {
			var elem = document.body;
			elem.classList.remove('keyboard-navigation');
	});

	function isInternetExplorer(){
		return window.navigator.userAgent.indexOf("Trident") > 0
	}

	function videoContainer23(padding){
		return '<div style="width:100%; height:0; position: relative; padding-bottom:' + padding + '"></div>'
	}

	function videoIframe(videoUrl){
		return '<iframe src="' + videoUrl + '" style="width:100%;height:100%;position:absolute;overflow:hidden;border:none;top:0;left:0;" allowfullscreen mozallowfullscreen webkitallowfullscreen></iframe>';
	}

	if(!isInternetExplorer()){
		$(".video23").each(function(){
			var videoUrl = $(this).data().videoUrl;
			var padding = $(this).data().videoPadding;
			$(this).find(">:first-child").replaceWith(videoContainer23(padding))
			$(this).find(">:first-child").append(videoIframe(videoUrl))
		})
    }
    
    /* CAR CALCULATOR */
    $(document).ready(function() {
        $(".calculator-help").mouseover(function(a) {
            $("#calculator-tooltip").show();
            var b = document.getElementById("calculator-tooltip");
            b.innerHTML = $(this).attr("data-help");
            b.style.display = "block";
        });
        $(".calculator-help").mousemove(function(a) {
            var b = document.all ? true : false;
            var f = b
                ? event.clientY + document.documentElement.scrollTop
                : a.pageY;
            var c = b
                ? event.clientX + document.documentElement.scrollLeft
                : a.pageX;
            var d = document.getElementById("calculator-tooltip");
            d.style.top = f + 10 + "px";
            d.style.left = c + "px";
        });
        $(".calculator-help").mouseout(function(a) {
            $("#calculator-tooltip").hide();
        });
    });

	$(document).ready(function() {
		$("#languageSelectorTrigger").on("click", function() {
			$(".language").toggleClass("open");		
		});
	});

	$(window).on('load', function () { 
		var searchinput = document.getElementById("mainsearch");
		var bestHit = document.getElementsByClassName("sbest");
		if(searchinput != null && searchinput.value.trim().length === 0) {
			if(bestHit != null && bestHit.length > 0) {
				bestHit[0].classList.add("emptySearch");
				bestHit[0].href = "";
			}
		}

		$('a.sbest.emptySearch').click(function(e)
		{
			e.preventDefault();
		});
	});

	$(document).ready(function(){
		$("a.sbest.emptySearch").focusin(function(){
			$(".tooltiptext").addClass("tabShow");
		});

		$("a.sbest.emptySearch").focusout(function(){
			$(".tooltiptext").removeClass("tabShow");
		});		
	});
	
	// Get back focus if esc key is pressed inside lightbox
	$(document).on('keyup', function (e) {
		if (e.which == 27) { // esc
			setTimeout(function () {
				var isLastFocusImageBtn = $(".resize-img.focused");
				isLastFocusImageBtn.focus();
				isLastFocusImageBtn.removeClass("focused");
			}, 500);
		}
	});
		
	// Function to return focus to the button with "focused" class
	function returnFocusToButton() {
		setTimeout(function () {
			var isLastFocusImageBtn = $(".resize-img.focused");
			isLastFocusImageBtn.focus();
			isLastFocusImageBtn.removeClass("focused");
		}, 500);
	}
	
	// Bind the returnFocusToButton function to the lightbox close button
	$(document).on('click', '[data-close-lightbox]', function () {
		returnFocusToButton();
	});
})();
