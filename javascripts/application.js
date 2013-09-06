$(document).ready(function() {
  var types = ['someday', 'backlog', 'in-progress', 'completed', 'accepted'];
  var isotopeContainer = $('#items');
  function initIsotope(delay){
    setTimeout(function(){
      isotopeContainer.isotope({
        itemSelector: '.item',
        resizesContainer: false,
        containerStyle: { overflow: 'visible' },
        gutter: 0,
        masonry: {
          columnWidth: 100,
          rowHeight: 100
        }
      });
    }, delay);
  };

  $(document).on('click', '.filter', function(){
    $(this).toggleClass('active')
    // var selector = $(this).attr('data-filter');
    // isotopeContainer.isotope({ filter: selector });
    // return false;
  });

  for (var i=0; i < types.length; i++) {
    var type = types[i];
    $.ajax({
      url: '/items.php',
      type: 'GET',
      dataType: 'json',
      data: {type: type},
      context: document.body,
      success: function(data, textStatus, xhr) {
        var html = '';
        if (data.length) {
          for (var j=0; j < data.length; j++) {
            var scoreClass = data[j].score;
            if(scoreClass == '~'){
              scoreClass = 'no-score'
            }; 
            html += '<div class="item ' + scoreClass + ' ' + data[j]['type'] + '" data-item-id="' + data[j].number + '">';
            html += '<a href="' + data[j].short_url + '"><strong>#' + data[j].number + '</strong> ';
            html += '<span class="title">' + data[j].title + '</span></a>';
            html += '</div>';
          };
        } else {
          html = '<div><div>No items</div></div>';
        };
        $('#items').html(html);
        initIsotope(2000);
      },
      error: function(xhr, textStatus, errorThrown) {
        $('#' + type).html('');
      }
    });
  };

  $.ajax({
    url: '/people.php',
    type: 'GET',
    dataType: 'json',
    complete: function(xhr, textStatus) {
      //called when complete
    },
    success: function(data, textStatus, xhr) {
      var html = '<a class="user filter all active">All users</a>'; // All user
      for (var i=0; i < data.length; i++) {
        if (data[i].revoked) {

        } else {
          html += '<a class="user filter" data-user-id="'+data[i].id+'">'+data[i].first_name+' '+data[i].last_name+'</a>';
        }
      };
      $('#users').html(html);
    },
    error: function(xhr, textStatus, errorThrown) {
      //called when there is an error
    }
  });

});

$(window).load(function(){
  
});
