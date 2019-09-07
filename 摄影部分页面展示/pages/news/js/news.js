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
//来一个定时器给右面添加动画
/**
 * params
 *      obo:one by one;
 */
//每隔1s给下一个子元素添加一个类名
for (let i = 1; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
        $(`.news-ul>li:nth-child(${i})`).addClass('opo');
    }, 1000 * i)
}