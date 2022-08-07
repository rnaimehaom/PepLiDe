/*=============================================================
    Authour URI: www.binarytheme.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US
   
    ========================================================  */


(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
             CUSTOM LINKS SCROLLING FUNCTION 
            ======================================*/

            $('nav a[href*=#]').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
               && location.hostname == this.hostname) {
                    var $target = $(this.hash);
                    $target = $target.length && $target
                    || $('[name=' + this.hash.slice(1) + ']');
                    if ($target.length) {
                        var targetOffset = $target.offset().top;
                        $('html,body')
                        .animate({ scrollTop: targetOffset }, 800); //set scroll speed here
                        return false;
                    }
                }
            });
         

            /*====================================
                NAV SCRIPTS
            ======================================*/
            $(window).bind('scroll', function () {
                var navHeight = $(window).height() -50;
                if ($(window).scrollTop() > navHeight) {
                    $('nav').addClass('fixed');
                }
                else {
                    $('nav').removeClass('fixed');
                }
            });

            /*====================================
               WRITE YOUR SCRIPTS BELOW 
           ======================================*/
            let flag=true
            $(".dropdown button").click(function(){
                if(flag==true){
                    $('.dropdown-menu').show();
                    flag=false;
                }
                else{
                    $('.dropdown-menu').hide();
                    flag=true;
                }
            });

            $("a.dropdown-item.dr").click(function(){
                
                $('input[name="algo"]').val('dr');

                flag=true;
                $(".dropdown-menu").hide();
                $("#dropdownMenuButton").html("Dull Razor Algorithm");
                $('#dr').show();
                $('#bh').hide();
                $('#ac').hide();
            });
           
            $("a.dropdown-item.bh").click(function(){

                $('input[name="algo"]').val('bh');

                flag=true;
                $('.dropdown-menu').hide()
                $("#dropdownMenuButton").html("Bottom Hat Filtering");
                $('#bh').show();
                $('#dr').hide();
                $('#ac').hide();
            });
               
            $("a.dropdown-item.ac").click(function(){
            
                $('input[name="algo"]').val('ac');

                flag=true;
                $('.dropdown-menu').hide()
                $("#dropdownMenuButton").html("Principle Adaptive Curvature");
                $('#ac').show();
                $('#dr').hide();
                $('#bh').hide();
            });
            
        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });

}(jQuery));



