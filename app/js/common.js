$(function() {

    $('.sm').smartmenus();

    /**
     * mobile-mnu customization
     */
    var $toggleMenu = $(".toggle-mnu");

    $toggleMenu.click(function() {
        $(this).toggleClass("on");
        // return false;
    });

    var menuLogo = $('#mobile-mnu').data("logo");
    var $mmenu = $("#mobile-mnu").mmenu({
        "navbar": {
            "title" : "Хутор фермера",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var API = $mmenu.data("mmenu");

    API.bind( "close:start", function() {
        setTimeout(function() {
            $toggleMenu.removeClass( "on" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    var popularsSlider = new Swiper('.populars-slider', {
        slidesPerView: 4,
        loop: true,
        spaceBetween: 10,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.pop-next',
            prevEl: '.pop-prev',
        },
        pagination: {
            el: '.pop-dots',
            clickable: true,
        },
        breakpoints: {
            // when window width is <= 480px
            480: {
                slidesPerView: 1,
            },
            // when window width is <= 992px
            992: {
                slidesPerView: 2,
            },
            // when window width is <= 1200px
            1200: {
                slidesPerView: 3,
            }
        }

    });




    var productThumbs = new Swiper('.product-thumbs', {
        spaceBetween: 15,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        // loopedSlides: 3, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.product-thumb-next',
            prevEl: '.product-thumb-prev',
        },
    });
    var productSlider = new Swiper('.product-slider', {
        spaceBetween: 10,
        loop:true,
        effect: 'fade',
        // loopedSlides: 3, //looped slides should be the same
        thumbs: {
            swiper: productThumbs,
        },
    });




    function heightses() {
        if ($(window).width()>480) {
            $('.popular-item-name').height('auto').equalHeights();
        }

        if ($(window).width()>=992) {
            $('.about-item-title').height('auto').equalHeights();
            $('.about-item-desc').height('auto').equalHeights();
        }

        $('.genrecipe-name').height('auto').equalHeights();

    }

    $(window).resize(function() {
        heightses();
    });
    heightses();


    $('.side-comment .roll').on('click', function(e){
       e.preventDefault();
       var th = $(this)
           desc = th.siblings('.side-comment-desc');

       if(!desc.is('.open')) {
           desc.addClass('open');
           th.text('Свернуть отзыв');
       } else {
           desc.removeClass('open');
           th.text('Читать весь отзыв');
       }
    });


    var amount = 1;
    $('#spinner-amount').on('click', 'button', function(e){

        if(!$(this).is('.down')) {
            amount ++
        } else {
            if (amount > 1) amount --
        }

        $('#amount').val(amount).attr('value', amount);
    });


    $(".user-phone").mask("+7 (999) 999-99-99",{autoclear: false});

    $.validate({
        form : '.contact-form',
    });


    $('.create-order').on('click', function(e){

        var th = $(this),
            name = th.data('name'),
            price = th.data('price'),
            box = th.data('box'),
            amount = $('#amount').attr('value'),
            cost = amount * price,
            image = th.data('img');

       var form = $("#popup-order");

       form.find('.order-img').css("background-image", 'url( \''+ image +'\')');
       form.find('.product-price').text(price);
       form.find('.product-box').text(box);
       form.find('.order-quantity span').text(amount);
       form.find('.order-cost span').text(cost);

        $('#popup-order #o-name').val(name);
        $('#popup-order #o-amount').val(amount);
        $('#popup-order #o-cost').val(cost + ' руб.');
    });

    $(function() {
        $("a[href='#popup-form'], a[href='#popup-order']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in"
        })
    });


    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    $('.meta-ingredients').on('click', function(e){
        e.preventDefault();

        $(this).parents('.recipelist-item').toggleClass('active');
    });


    /**
     * start MASKED INPUT
     */
    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( ".button" ),
        mark = wrapper.find("mark"),
        lbl = wrapper.find( "div" );
    btn.focus(function(){
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            mark.text( "Загрузить фото" );
        }else
            mark.text( file_name );
    }).change();

    $( window ).resize(function(){
        $( ".file_upload input" ).triggerHandler( "change" );
    });
    /**
     * end MASKED INPUT
     */

    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });

    $('.preloader').fadeOut(600);
});
