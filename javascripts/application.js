$(document).ready(function() {
  var html = '';
  var types = ['in-progress', 'completed', 'backlog', 'someday'];
  var isotopeContainer = $('#items');
  var isotopeGridWidth = 100
  var windowWidth = $(window).width();
  var wrapperWidth = isotopeGridWidth * Math.floor(windowWidth / isotopeGridWidth);

  // Center content in browser based on isotop grid
  $('.width-wrapper').width( wrapperWidth + 'px');

  $(document).on('click', '[data-toggle="group"] .button', function(){
    $(this).closest('[data-toggle="group"]').find('.active').removeClass('active');
    $(this).addClass('active');
  });

  $(document).on('click', '.view-mode .button', function(){
    var layout = $(this).data('toggles');
    isotopeContainer.attr('data-view', layout).isotope('reLayout');
  });
  
  // Setup Isotope
  function initIsotope(delay){
    setTimeout(function(){
      isotopeContainer.isotope({
        itemSelector: '.item',
        resizesContainer: false,
        containerStyle: { overflow: 'visible' },
        gutter: 0,
        masonry: {
          columnWidth: isotopeGridWidth,
          rowHeight: isotopeGridWidth
        },
        onLayout: function(){
          $('body').removeClass('is-loading');
          $('#mask').fadeOut('fast');
        }
      });
    }, delay);
  };

  // This is silly, but why not?
  $(document).on('click', '.shuffle', function(){
    isotopeContainer.isotope('shuffle');
  });

  // Filter items
  $(document).on('click', '.filter', function(){
    var filterLabel = $(this).text();
    $(this).closest('.filters').find('.active').removeClass('active');
    $(this).toggleClass('active');
    $(this).closest('.dropdown').find('.dropdown-toggle').text(filterLabel);
    var selector = '';
    $('.filters .active').each(function(){
      selector += $(this).attr('data-filter');
    });
    isotopeContainer.isotope({ filter: selector });
  });

  // Collect items
  for (var i=0; i < types.length; i++) {
    var type = types[i];
    $.ajax({
      url: '/items.php',
      type: 'GET',
      dataType: 'json',
      data: {type: type},
      context: document.body,
      success: function(data, textStatus, xhr) {
        if (data.length) {
          for (var j=0; j < data.length; j++) {
            var scoreClass = data[j].score;
            if(scoreClass == '~'){
              scoreClass = 'no-score'
            }; 
            if(!$.isEmptyObject(data[j]['assigned_to'])){
              userId = 'user-' + data[j]['assigned_to']['id'];
            } else {
              userId = 'unassigned'
            }
            html += '<a href="' + data[j].short_url + '"  class="item ' + scoreClass + ' ' + data[j]['type'] + ' ' + userId + ' ' + data[j].status + ' target="_blank">';
            html += '<div><strong>#' + data[j].number + '</strong> ';
            html += '<span class="title">' + data[j].title + '</span></div>';
            html += '</a>';
          };
        } else {
          html = '<div class="missing-data">No items</div>';
        };
        $('#items').html(html);
        initIsotope(2000);
      },
      error: function(xhr, textStatus, errorThrown) {
        $('#items').html('<div class="missing-data">Error</div>');
      }
    });
  };

  // Get a list of team members
  $.ajax({
    url: '/people.php',
    type: 'GET',
    dataType: 'json',
    complete: function(xhr, textStatus) {
      // Called when complete
    },
    success: function(data, textStatus, xhr) {
      var html = '<a class="user filter all active" data-filter=".item">All users</a>'; // All user
      for (var i=0; i < data.length; i++) {
        if (!data[i].revoked) {
          html += '<li role="menuitem">';
          html += '<a class="user filter" data-filter=".user-'+data[i].id+'">';
          html += data[i].first_name + ' ' + data[i].last_name;
          html += '</a>';
          html += '</li>';
        }
      };
      $('#users .dropdown-menu').html(html);
    },
    error: function(xhr, textStatus, errorThrown) {
      // Called when there is an error
    }
  });
});
