$(document).ready(function() {
  var items = []; // Array for grid items
  var users = []; // Array for user dropdown
  var statuses = ['in-progress', 'completed', 'backlog', 'someday'];

  var isotopeContainer = $('#items');
  var isotopeGridWidth = 100 // Smallest size for item grid

  var windowWidth = $(window).width();
  var wrapperWidth = isotopeGridWidth * Math.floor(windowWidth / isotopeGridWidth);
  var wrapperWidthFlex = wrapperWidth / windowWidth * 100;

  // Window is scrolling
  $(window).scroll(function(){
    var scrollHeight = $(window).scrollTop();

    if (scrollHeight > 0){
      $('body').addClass('is-scrolling');
    }

    if (scrollHeight == 0){
      $('body').removeClass('is-scrolling');
    }
  });

  // Center content in browser based on isotope grid
  $('.width-wrapper').width( wrapperWidthFlex + '%');

  // Toggle button functionality
  $(document).on('click', '[data-toggle="group"] .button', function(){
    $(this).closest('[data-toggle="group"]').find('.active').removeClass('active');
    $(this).addClass('active');
  });

  // Toggle the view modes
  $(document).on('click', '.view-action .button', function(){
    var layout = $(this).data('toggles');
    isotopeContainer.attr('data-view', layout).isotope('reLayout');
  });

  // Quickseasrch
  function quicksearchInit(){
    $('[data-search="item"]').quicksearch('#items .item', {
      'show': function() {
        $(this).addClass('quicksearch-match');
      },
      'hide': function() {
        $(this).removeClass('quicksearch-match');
      }
    }).keyup(function(){
      setTimeout( function() {
        isotopeContainer.isotope({ filter: '.quicksearch-match' }).isotope(); 
      }, 100 );
    });

    // Clear the faux-search
    $(document).on('click', '[data-search="close"]', function(event){
      event.preventDefault();
      $('.quicksearch-match').removeClass('quicksearch-match');
      $('[data-search="item"]').val('');
      isotopeContainer.isotope({ filter: '.item' }).isotope();
    });
  };
  
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
      quicksearchInit();      
    }, delay);
  };

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

  // Collect and render items
  for (var h=0; h < statuses.length; h++) {
    var status = statuses[h];
    $.ajax({
      url: '/items.php',
      type: 'GET',
      data: {status : status},
      dataType: "json",
      success: function(json) {
        for (var i=0; i < json.length; i++) {
          var assignedToID = 'unassigned';

          if (json[i].score == '~'){
            json[i].score = 'no-score';
          }
          if (!$.isEmptyObject(json[i].assigned_to)) {
            assignedToID = 'user-' + json[i].assigned_to.id;
          };

          var item = {
            title        : json[i].title,
            number       : json[i].number,
            status       : json[i].status,
            score        : json[i].score,
            type         : json[i].type,
            assignedToID : assignedToID,
            shortUrl     : json[i].short_url
          };
          
          items.push(item);
        };

        var context = { items: items };
        var source = $("#item_template").html();
        template = Handlebars.compile(source);
        $("#items").append(template(context));
        console.log(context);
        console.log(source);
      }
    });
  };

  // Wish this could be on a call back when everything is rendered
  initIsotope(9000);
  
  // Populate the users dropdown
  $.ajax({
    url: '/people.php',
    type: 'GET',
    dataType: 'json',
    success: function(json) {
      for (var i=0; i < json.length; i++) {
        var user = {
          firstName : json[i].first_name,
          lastName  : json[i].last_name,
          id        : json[i].id,
          email     : json[i].email
        };

        users.push(user);
      };

      var context = { users : users };
      var source = $("#user_template").html();
      template = Handlebars.compile(source);
      $("#users").append(template(context));
      console.log(context);
      console.log(source);
    }
  });
});
