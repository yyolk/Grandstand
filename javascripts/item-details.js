$(document).ready(function(){
  // Item details
  $(document).on('click', '[data-show="item-details"]', function(){
    var itemType = $(this).data('type');
    var title = $(this).find('.title').text();
    var description = $(this).data('description');
    var theItem = $(this).clone().attr('style', '');
    $('body').addClass('show-item-details');
    $('.item-details').attr('data-type', itemType);

    // The item content
    $('[data-target="item"]').append(theItem);
    $('[data-target="title"]').text(title);
    $('[data-target="description"]').text(description)
  });

  $(document).on('click', '[data-hide="item-details"]', function(){
    $('body').removeClass('show-item-details');
    $('.item-details').attr('data-type', '');
    $('[data-target="item"]').find('.item').remove();
  });
});
