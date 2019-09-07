var proAct = $('.projects .img-list');

$('.container-film').addClass("bounceInLeft animated")

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
//鼠标进入事件
proAct.mouseenter(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(this).children().addClass("bounceInUp animated");
        $(this).siblings().children().removeClass("bounceInUp animated")
})