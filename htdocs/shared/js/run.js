(function () {

/* ==================================
** Smooth Scroll
** =================================*/
    (function () {
        window.smoothScroll = function(self){
        var speed = 500;
        var href= $(self).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");};
    
        $('a[href^=#]').click(function(){
            smoothScroll(this);
            return false;
        });
    }());

}());