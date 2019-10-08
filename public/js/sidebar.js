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


(function( $ ) {
  // 游戏详细页面，生成游戏预览二维码
  var imgbox = $('#qrcode');
  if( imgbox.is('*')){
    var data = imgbox.data();
    var src = data.src
    var qrcode = new QRCode(document.getElementById("qrcode"), {
    	text: src,
    	width: 200,
    	height: 200,
    	colorDark : "#000000",
    	colorLight : "#ffffff",
    	correctLevel : QRCode.CorrectLevel.H
    });
  }

  // 首页， 游戏管理端二维码，游戏试玩二维码
  var qrcodeBackend = $('#qrcodeBackend');
  if( qrcodeBackend.is('*')){
    var data = qrcodeBackend.data();
    var src = data.src
    var qrcode = new QRCode(document.getElementById("qrcodeBackend"), {
    	text: src,
    	width: 200,
    	height: 200,
    	colorDark : "#000000",
    	colorLight : "#ffffff",
    	correctLevel : QRCode.CorrectLevel.H
    });
  }

  var qrcodeDemo = $('#qrcodeDemo');
  if( qrcodeDemo.is('*')){
    var data = qrcodeDemo.data();
    var src = data.src
    var qrcode = new QRCode(document.getElementById("qrcodeDemo"), {
    	text: src,
    	width: 200,
    	height: 200,
    	colorDark : "#000000",
    	colorLight : "#ffffff",
    	correctLevel : QRCode.CorrectLevel.H
    });
  }

})( jQuery );

// (function( $ ) {
//   $('body').scrollspy({ target: '.achievement' })
//
//   $('.achievement').on('activate.bs.scrollspy', function (e) {
//     console.log( " e =", e)
//     $(".elementor-counter-number",this).each( function() {
//                     var e = $(this)
//                       , n = e.data()
//                       , i = n.toValue.toString().match(/\.(.*)/);
//                     i && (n.rounding = i[1].length),
//                     e.numerator(n)
//
//     })
//   })
// })( jQuery );
