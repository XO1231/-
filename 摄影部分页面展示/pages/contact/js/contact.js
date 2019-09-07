$('.more').click(function(){
    $('.header-c .nav').css("display","block")
    if($(this).hasClass("close")){
        $(this).removeClass("close")
        // $('.header-c .nav').css("display","none")
        $('.header-c .nav').removeClass('bounceInRight animated')
        $('.header-c .nav').addClass('bounceOutLeft animated')
    }else{
        $(this).addClass("close");
        $('.header-c .nav').removeClass('bounceOutLeft animated')
        $('.header-c .nav').addClass('bounceInRight animated')
        
    }
})