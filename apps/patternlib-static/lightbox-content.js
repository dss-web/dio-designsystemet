/*!
 * Lightbox wide content + ImageSeries lightbox
 * Drop-in replacement for your current lightbox-content.js
 */

(function ($) {
  if (!$) return;

  // ------------------------------------------------------------
  // Translations (CSP-safe: read JSON from <template id="page-translations">)
  // ------------------------------------------------------------
  const el = document.getElementById("page-translations");
const json = el?.innerHTML?.trim();
  const t = json ? JSON.parse(json) : {};

  // Optional: keep old API for other scripts (safe even if empty)
  window.translations = window.translations || {};
  Object.assign(window.translations, t);

  // Local vars used by this file (with fallbacks)
  var langCloseButton = t.langCloseButton || "";
  var langLinkDownloadImage = t.langLinkDownloadImage || "";

  // ------------------------------------------------------------
  // Wide content wrapper (tables)
  // ------------------------------------------------------------
  $.fn.wrapWideContent = function (options) {
    var elem = this;
    var settings = $.extend(
      {
        container: elem.closest(".article-body, .longdoc-content"),
        threshold: 1.787,
        imageWidthThreshold: 700,
        langZoomImage: "Forstørr bilde",
        langShowFullTable: "Vis tabellen i full bredde",
      },
      options
    );

    var envElem = settings.container;

    var tablesHandler = function () {
      var $tableCount = 0;
      envElem.find("table").each(function (index, el) {
        $tableCount++;
        var $table = $(el);

        if (
          !$table.parent().hasClass("tablewrapper") &&
          !$table.parent().hasClass("tblwrp-scrollarea")
        ) {
          $table.wrap('<div class="tablewrapper" data-table-id="' + $tableCount + '"></div>');
        }

        var $tableWrap = $('[data-table-id="' + $tableCount + '"]');

        if ($tableWrap.width() < $table.width() && !$tableWrap.prev().hasClass("btn-zoom")) {
          $table.after('<div class="tablewrapper-fader"></div>');
          $tableWrap.before(
            '<button class="btn-zoom" aria-haspopup="true" data-btn-zoom-table>' +
              settings.langShowFullTable +
              "</button>"
          );
        } else if ($tableWrap.width() >= $table.width()) {
          $tableWrap.find(".tablewrapper-fader").remove();
          $tableWrap.prev("[data-btn-zoom-table]").remove();
        }
      });
    };

    $(window).on("load afterresize", function () {
      tablesHandler();
    });
  };

  // ------------------------------------------------------------
  // Focus trap helpers (used by zoom lightboxes)
  // ------------------------------------------------------------
  var zoomFocusElem;
  var focusableElems =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

  function trapTabKey(obj, e) {
    if (e.which === 9) {
      var o = obj.find("*"),
        focusableItems,
        focusedItem,
        numberOfFocusableItems,
        focusedItemIndex;

      focusableItems = o.filter(focusableElems).filter(":visible");
      focusedItem = jQuery(":focus");
      numberOfFocusableItems = focusableItems.length;
      focusedItemIndex = focusableItems.index(focusedItem);

      if (e.shiftKey) {
        if (focusedItemIndex === 0) {
          focusableItems.get(numberOfFocusableItems - 1).focus();
          e.preventDefault();
        }
      } else {
        if (focusedItemIndex === numberOfFocusableItems - 1) {
          focusableItems.get(0).focus();
          e.preventDefault();
        }
      }
    }
  }

  // ------------------------------------------------------------
  // Avoid whitespace in zoom overlay (kept as-is)
  // ------------------------------------------------------------
  var lightboxAvoidWhiteSpace = function (imgHeight) {
    var lbox = $("[data-zoom-lightbox] > .zoom-lightbox");

    if (lbox.length) {
      if (imgHeight) {
        var imageIsTallerThanVieport = imgHeight > $(window).height() ? true : false;
        if (lbox.length && imageIsTallerThanVieport) {
          lbox.css("bottom", "60px");
        } else {
          lbox.css("bottom", "auto");
        }
      } else {
        if ($("[data-zoom-image], [data-zoom-table]").height() + 180 > $(window).height()) {
          lbox.css("bottom", "60px");
        } else {
          lbox.css("bottom", "auto");
        }
      }
    }
  };

  // ------------------------------------------------------------
  // ZOOM: button to open image lightbox (wide content)
  // ------------------------------------------------------------
  $(document).on("click", "[data-btn-zoom-image]", function () {
    var btn = $(this);
    btn.addClass("focused");
    var img = btn.data("btn-zoom-image") === "image-in-link" ? btn.next().children("img") : btn.next();
    var imgSrc = "";
    var enlargedImageHeight;

    if (img.attr("data-large-image-src") !== undefined) {
      imgSrc = img.data("large-image-src");
      enlargedImageHeight = img.attr("data-large-image-height") !== undefined ? img.attr("data-large-image-height") : null;
    } else {
      imgSrc = img.attr("src");
    }

    var figcaptionText = btn.closest("figure").find("figcaption").html() || "";
    var figureElement = btn.closest("figure.reg-figure");
    var isDownloadable = figureElement.closest("figure").hasClass("isDownloadable");
    var isKFigGrp = btn.closest("figure").hasClass("K-FIGGRP");

    var downloadHtml = "";

    if (isDownloadable && !isKFigGrp) {
      downloadHtml =
        '<div class="download-high-res-image">' +
        '<a class="btn-download btn-download--inline" href="' +
        imgSrc +
        '" download>' +
        langLinkDownloadImage +
        "</a>" +
        "</div>";
    } else if (!isDownloadable && isKFigGrp) {
      var containsLink = btn.closest("figure").find("p.K-TIT-FIGGRP").find("a").length > 0;
      if (containsLink) {
        downloadHtml =
          '<div class="download-high-res-image">' +
          '<a class="btn-download btn-download--inline" href="' +
          imgSrc +
          '" download>' +
          langLinkDownloadImage +
          "</a>" +
          "</div>";
      }
    }

    var captionHtml = figcaptionText ? "<figcaption>" + figcaptionText + "</figcaption>" : "";

    var lightboxHtml =
      '<div class="zoom-lightbox-wrapper" role="dialog" aria-modal="true" data-zoom-lightbox>' +
      '<div class="zoom-lightbox zoom-lightbox-image">' +
      '<button type="button" title="' +
      langCloseButton +
      '" aria-label="' +
      langCloseButton +
      '" class="closeButton" data-close-lightbox></button>' +
      '<div class="zoom-lightbox-inner" tabindex="0" data-zoom-image>' +
      '<img src="' +
      imgSrc +
      '">' +
      '<div class="image-info">' +
      captionHtml +
      downloadHtml +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";

    $("body").append(lightboxHtml).addClass("lightbox-open");

    if ($("#epi-quickNavigator").length > 0) {
      $(".closeButton").addClass("cmsTopOffset");
    }

    $("[data-zoom-lightbox]").fadeIn("fast", function () {
      lightboxAvoidWhiteSpace(enlargedImageHeight);
      $("[data-zoom-image]").focus();
    });

    zoomFocusElem = btn;
  });

  // Clicking on the image to view it in the wide-content lightbox
  $(document).on("click", "[data-imgbtn-zoom-image]", function () {
    if (window.matchMedia("(max-width: 1000px)").matches) return;

    var img = $(this);
    var btn = img.prev(".resize-img");
    // var closeButtonTop = $("#epi-quickNavigator").length > 0 ? "50px" : "";

    btn.addClass("focused");
    if (btn.length > 0) {
      var imgSrc = "";
      var enlargedImageHeight;

      if (img.attr("data-large-image-src") !== undefined) {
        imgSrc = img.data("large-image-src");
        enlargedImageHeight = img.attr("data-large-image-height") !== undefined ? img.attr("data-large-image-height") : null;
      } else {
        imgSrc = img.attr("src");
      }

      var figcaptionText = btn.closest("figure").find("figcaption").html() || "";
      var figureElement = btn.closest("figure.reg-figure");
      var isDownloadable = figureElement.closest("figure").hasClass("isDownloadable");

      var downloadHtml = isDownloadable
        ? '<div class="download-high-res-image">' +
          '<a class="btn-download btn-download--inline" href="' +
          imgSrc +
          '" download>' +
          langLinkDownloadImage +
          "</a>" +
          "</div>"
        : "";

      var captionHtml = figcaptionText ? "<figcaption>" + figcaptionText + "</figcaption>" : "";

      var lightboxHtml =
        '<div class="zoom-lightbox-wrapper" role="dialog" aria-modal="true" data-zoom-lightbox>' +
        '<button type="button" title="' +
        langCloseButton +
        '" aria-label="' +
        langCloseButton +
        '" class="closeButton" data-close-lightbox></button>' +
        '<div class="zoom-lightbox zoom-lightbox-image">' +
        '<div class="zoom-lightbox-inner" tabindex="0" data-zoom-image>' +
        '<img src="' +
        imgSrc +
        '">' +
        '<div class="image-info">' +
        captionHtml +
        downloadHtml +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      $("body").append(lightboxHtml).addClass("lightbox-open");
      if ($("#epi-quickNavigator").length > 0) {
        $(".closeButton").addClass("cmsTopOffset");
      }

      $("[data-zoom-lightbox]").fadeIn("fast", function () {
        lightboxAvoidWhiteSpace(enlargedImageHeight);
        $("[data-zoom-image]").focus();
      });

      zoomFocusElem = btn;
    }
  });

  // Tables
  $(document).on("click", "[data-btn-zoom-table]", function () {
    var btn = $(this);
    var tableWrapper = btn.next();
    var tableWrapperHtml = tableWrapper.html();

    var lightboxHtml =
      '<div class="zoom-lightbox-wrapper islongdoc" role="dialog" aria-modal="true" data-zoom-lightbox>' +
      '<div class="zoom-lightbox zoom-lightbox-table">' +
      '<button title="' +
      langCloseButton +
      '" aria-label="' +
      langCloseButton +
      '" class="closeButton" data-close-lightbox></button>' +
      '<div class="zoom-lightbox-inner" tabindex="0" data-zoom-table>' +
      tableWrapperHtml +
      "</div></div></div>";

    $("body").append(lightboxHtml).addClass("lightbox-open");
    $("[data-zoom-lightbox]").fadeIn("fast", function () {
      lightboxAvoidWhiteSpace();
      $("[data-zoom-table]").focus();
    });

    zoomFocusElem = btn;
  });

  // Graphs
  $(document).on("click", "[data-btn-zoom-graph]", function () {
    var btn = $(this);
    var graphWrapper = btn.prev();
    var graphWrapperHtml = graphWrapper.html();

    var lightboxHtml =
      '<div class="zoom-lightbox-wrapper" role="dialog" aria-modal="true" data-zoom-lightbox>' +
      '<div class="zoom-lightbox zoom-lightbox-graph">' +
      '<div class="zoom-lightbox-inner" tabindex="0" data-zoom-graph>' +
      graphWrapperHtml +
      "</div>" +
      '<button title="' +
      langCloseButton +
      '" aria-label="' +
      langCloseButton +
      '" class="closeButton" data-close-lightbox></button>' +
      "</div></div>";

    $("body").append(lightboxHtml).addClass("lightbox-open");
    $("[data-zoom-lightbox]").fadeIn("fast", function () {
      lightboxAvoidWhiteSpace();
      $("[data-zoom-graph]").focus();
    });

    zoomFocusElem = btn;
  });

  $(window).on("resize", function () {
    lightboxAvoidWhiteSpace();
  });

  // close handlers for zoom overlays
  $(document)
    .on("click", "[data-close-lightbox]", function () {
      var btn = $(this);
      $("body").removeClass("lightbox-open");
      $("[data-zoom-lightbox]").fadeOut("fast", function () {
        $("[data-zoom-lightbox]").remove();
      });
      zoomFocusElem = btn;
    })
    .on("click", "[data-zoom-image]", function () {
      var btn = $(this);
      $("body").removeClass("lightbox-open");
      $("[data-zoom-lightbox]").fadeOut("fast", function () {
        $("[data-zoom-lightbox]").remove();
      });
      zoomFocusElem = btn;
    })
    .on("keydown", "[data-zoom-lightbox]", function (e) {
      var btn = $(this);
      if (e.which === 27) {
        $("body").removeClass("lightbox-open");
        $("[data-zoom-lightbox]").fadeOut("fast", function () {
          $("[data-zoom-lightbox]").remove();
        });
        zoomFocusElem = btn;
      } else {
        trapTabKey($(this), e);
      }
    })
    .on("click", "[data-zoom-lightbox]", function () {
      $("[data-zoom-lightbox]").fadeOut("fast", function () {
        $("[data-zoom-lightbox]").remove();
      });
      $("body").removeClass("lightbox-open");
    })
    .on("click", ".zoom-lightbox", function (e) {
      e.stopPropagation();
    });

  // ------------------------------------------------------------
  // ImageSeries Lightbox helpers (must be in same scope as openLightbox)
  // ------------------------------------------------------------
  function disableTabbing() {
    $("body *").attr("tabindex", -1);
    $("#lightbox-imgageseries *").removeAttr("tabindex");
    $("#lightbox-imgageseries .prev, #lightbox-imgageseries .next").attr("tabindex", 0);
  }

  function enableTabbing() {
    $("body *").removeAttr("tabindex");
    $(".prev.noOverlay, .next.noOverlay").attr("tabindex", 0);
  }

  function trapTabKeyInLightbox(e) {
    var lightbox = $("#lightbox-imgageseries");
    var focusableElements = lightbox.find("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    var firstFocusableElement = focusableElements.first();
    var lastFocusableElement = focusableElements.last();

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if ($(document.activeElement).is(firstFocusableElement)) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if ($(document.activeElement).is(lastFocusableElement)) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  }

  // ------------------------------------------------------------
  // ImageSeries Lightbox (GLOBAL)
  // ------------------------------------------------------------
  function openLightbox(index) {
    var slides = $(".mySlides");
    var lightbox = $("#lightbox-imgageseries");
    var lightboxImg = $("#lightbox-img");
    var figcaption = $("#lightbox-imgageseries figcaption");
    var downloadLink = $("#lightbox-imgageseries .btn-download");
    var currentImageIndex = $("#current-image-index");
    var totalImages = $("#total-images");
    var imageNumber = $(".numbertext");

    // if ($("#epi-quickNavigator").length > 0) {
    //   $(".closeButton").css("top", "50px");
    // } else {
    //   $(".closeButton").css("top", "");
    // }

    if ($("#epi-quickNavigator").length > 0) {
      $(".closeButton").addClass("cmsTopOffset");
    }

    lightbox.removeClass("is-hidden");
	$("body").addClass("lightbox-open");
    disableTabbing();

    totalImages.text(slides.length);

    function updateLightboxContent(i) {
      var currentSlide = slides.eq(i);
      var imgSrc = currentSlide.find("img").attr("src");
      var descriptionText = (currentSlide.find(".description-text").html() || "").trim();
      var licenseLink = (currentSlide.find(".license-url").html() || "").trim();
      var showDownloadLink = currentSlide.find(".dlStat").text().trim().toLowerCase() === "true";
      var total = slides.length;

      imageNumber.attr("aria-label", "Bilde " + (i + 1) + " av " + total);
      imageNumber.attr("aria-live", "polite");

      lightboxImg.attr("src", imgSrc);
      lightboxImg.attr("alt", descriptionText);
      lightboxImg.attr("aria-label", descriptionText);
      lightboxImg.attr("aria-live", "polite");

      lightboxImg.removeClass("hidden");

      var captionTextEl = $("#lightbox-imgageseries .caption-text");
      captionTextEl.html((descriptionText + " " + licenseLink).trim());

      figcaption.attr("aria-label", descriptionText);
      figcaption.attr("aria-live", "polite");

      downloadLink.attr("href", imgSrc);
      downloadLink.attr("aria-label", "Download " + descriptionText);

      currentImageIndex.text(i + 1);

      if (showDownloadLink) {
        downloadLink.removeClass("hidden");
      } else {
        downloadLink.addClass("hidden");
      }
    }

    updateLightboxContent(index);

    // Prev/next
    $("#lightbox-imgageseries .prev").off("click").on("click", function () {
      index = index > 0 ? index - 1 : slides.length - 1;
      updateLightboxContent(index);
    });

    $("#lightbox-imgageseries .next").off("click").on("click", function () {
      index = index < slides.length - 1 ? index + 1 : 0;
      updateLightboxContent(index);
    });

    // Click image advances
    $("#lightbox-img").off("click").on("click", function () {
      index = index < slides.length - 1 ? index + 1 : 0;
      updateLightboxContent(index);
    });

    // Keyboard arrows
    $(document).off("keydown.imageseries").on("keydown.imageseries", function (e) {
      if (!$("#lightbox-imgageseries").is(":visible")) return;

      if (e.which === 37) {
        index = index > 0 ? index - 1 : slides.length - 1;
        updateLightboxContent(index);
        e.preventDefault();
      } else if (e.which === 39) {
        index = index < slides.length - 1 ? index + 1 : 0;
        updateLightboxContent(index);
        e.preventDefault();
      }
    });

    // Close button
    $("#lightbox-imgageseries .closeButton")
      .off("click")
      .on("click", function () {
        lightbox.addClass("is-hidden");
        $("body").removeClass("lightbox-open");
        enableTabbing();
      });

    // ESC closes
    $(document).off("keyup.imageseries").on("keyup.imageseries", function (e) {
      if (e.which === 27) {
        lightbox.addClass("is-hidden");
        $("body").removeClass("lightbox-open");
        enableTabbing();
      }
    });

    // Blur prev/next after click
    var btns = document.querySelectorAll("#lightbox-imgageseries .prev, #lightbox-imgageseries .next");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        this.blur();
      });
    });
  }

  // expose immediately so other files can call it
  window.openLightbox = openLightbox;

  // ------------------------------------------------------------
  // Bind ImageSeries clicks (delegated + robust)
  // ------------------------------------------------------------
  $(function () {
    // only if the block is configured with vlightbox
    if ($(".slideshow-container.vlightbox").length) {
      $(document).on("click", ".slideshow-container.vlightbox .imgSeries", function () {
        if (window.matchMedia("(max-width: 1000px)").matches) return;
        var currentIndex = $(this).closest(".mySlides").index();
        window.openLightbox(currentIndex);
        $("#lightbox-imgageseries").focus();
      });

      $(document).on("click", ".slideshow-container.vlightbox .resize-img.series", function () {
        if (window.matchMedia("(max-width: 1000px)").matches) return;
        var currentIndex = $(this).closest(".mySlides").index();
        window.openLightbox(currentIndex);
        $("#lightbox-imgageseries").focus();
      });

      $(document).on("keydown", function (e) {
        if ($("#lightbox-imgageseries").is(":visible")) {
          trapTabKeyInLightbox(e);
        }
      });
    }
  });

})(window.jQuery);
