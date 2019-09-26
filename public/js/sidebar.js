(function( $ ) {
  'use strict';
  var $moreTags = $( '#more-tags' );
  var $toggleTagsButton = $( '#toggle-all-tags' );

  $toggleTagsButton.on( 'click', function( evt ) {
    $moreTags.slideToggle({
      done: function() {
        // Once the animation is done, switch to class-based hiding
        // so that the lists line up better
        $moreTags
          .toggleClass( 'collapsed' )
          .removeAttr( 'style' );
      }
    });
    // Flip label in the button
    $toggleTagsButton.find( 'span' ).toggleClass( 'hidden' );
  });
})( jQuery );

(function( $ ) {
  $('.elementor-image-carousel').slick({ arrows: false, dots: true })
  $('.elementor-image-carousel5').slick({ lazyLoad:'ondemand', arrows: false, dots: true, infinite: true,  slidesToShow: 5,  slidesToScroll: 1 })
})( jQuery );
