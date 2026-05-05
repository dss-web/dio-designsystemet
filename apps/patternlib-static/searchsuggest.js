// Global search suggest
(function() {

  var searchSuggest = $('[data-search-suggest]');

  searchSuggest.each(function (index, el) {
    var elem = $(el),
      results = elem.next(),
      resultsList = results.children('[data-search-suggest-list]'),
      currentTerm = elem.val(),
      api = elem.data('autocomplete-source'),
      autocompleteEnabled = elem.data('autocomplete-enabled');
      
    var reset = function () {
      resultsList.empty();
      results.addClass('is-hidden');
      elem.attr('aria-expanded','false');
    };

    var debounceKeyUp =  function (func, delay) 
    {      
      var timeout;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timeout);

        timeout = setTimeout(function () {          
          func.apply(context, args);
        }, delay);

      };
    }

    elem
      .on('keydown', function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (key === 9 && e.shiftKey) { // tab+shift
          reset();
        }
      })
      .on('keyup', debounceKeyUp(function (e) {
        var key = e.keyCode ? e.keyCode : e.which,
          term = this.value,
          html = '';
        
        resultsList.attr('data-search-suggest-list', term);
        
        if (key === 40) { // down
          var items = $('[data-search-suggest-list] li a');
          if (results.is(':visible') && items.length > 0) {
            items.first().focus();
          }
        } else if (key === 27) { // escape
          reset();
        } else {
          if (term.length < 2) {
            reset();
          } else {

            if (term !== currentTerm && autocompleteEnabled) {              
              $.ajax({
                url: api + term,
                dataType: "json",
                success: function (data) {
                  $.map(data, function (item) {
                    html += '<li class="search-suggest-item"><a href="' + item.Url + '">';
                    html += '<span class="title">' + item.Name + '</span>';
                    html += '<span class="meta">' + item.FormattedMetadata + '</span>';
                    html += '</a></li>';
                  });
                  if (!$.isArray(data) || !data.length) {
                    reset();
                  } else {
                    resultsList.html(html);
                    results.removeClass('is-hidden');
                    resultsList.highlight(term);
                    elem.focus().attr('aria-expanded','true');
                  }
                }
              });
              currentTerm = term;
            }
          }
        }
      }, 350));

    resultsList.on('keydown', function (e) {
      var key = e.keyCode ? e.keyCode : e.which,
        currentItem = $('[data-search-suggest-list] li a:focus');

      if (key === 38) { // up
        e.preventDefault();
        if (currentItem.parent().prev().length > 0) {
          currentItem.parent().prev().children('a').focus();
        } else {
          elem.focus();
        }
      } else if (key === 40) { // down
        e.preventDefault();
        if (currentItem.parent().next().length > 0) {
          currentItem.parent().next().children('a').focus();
        }
      } else if (key === 27) { // escape
        reset();
        elem.focus();
      }
    });

    $(document).mouseup(function(e) {
      if (!$(e.target).closest(searchSuggest.parent()).length) {
        reset();
      }
    });
  });
})();
