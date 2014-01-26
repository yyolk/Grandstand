$(document).ready(function(){
  // Item details
  $(document).on('click', '[data-show="item-details"]', function(){
    var itemType = $(this).data('type');
    var theItem = $(this).clone().attr('style', '').attr('data-remove', '');
    var context = {
      title : $(this).data('title'),
      description : $(this).data('description')
    }
    
    // Make the item appear
    $('body').addClass('show-item-details');
    $('.item-details').attr('data-type', itemType);

    // The item content
    $('[data-target="item"]').append(theItem);

    // Populate the handlebars template
    template = Handlebars.compile($("#item_details_template").html());
    $('[data-target="item-details"]').append(template(context));
  });

  $(document).on('click', '[data-hide="item-details"]', function(){
    $('body').removeClass('show-item-details');
    $('.item-details').attr('data-type', '');
    $('[data-remove]').remove();
  });
});
