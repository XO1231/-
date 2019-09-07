var proAct = $('.projects .img-list');
//右上角的more close
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

//swiper
var mySwiper = new Swiper('.swiper-container', {
    // autoplay: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    loop:true,
})
//页面加载完毕后执行
$(function(){
    //fullpage
    $('#dowebok').fullpage({
        //每页垂直居中
        verticalCentered: true,
        //项目导航小圈
        navigation: true,
        menu: true,
        sectionsColor: ['black'],
        fitToSection:false,
        afterLoad: function(anchorLink, index) {
            // console.log(anchorLink);
            var $this = $(this);		// 指向当前屏的 section
            // 可以监听到 滚动到第几屏了
            // console.log($this.attr('id'));
            // console.log(index);
            // console.log($('.section'));
            // $('.section').eq(index - 1).addClass("inpage").siblings().removeClass("inpage");
        },
        // afterRender:function(){
        //     function autoScrolling(){
        //         console.log("111");
        //         var w = window.innerWidth;
        //         if(w<1024){
        //             $('#dowebok').fullpage.setAutoScrolling(false);
        //             // $('#dowebok').fullpage.destroy("all");
        //             // $('#dowebok').fullpage.scrollBar(true);
        //         }else{
        //             $('#dowebok').fullpage.setAutoScrolling(true);
        //             $('#dowebok').fullpage.fitToSection(true);
        //             // $('#dowebok').fullpage.navigation(true);
        //         }
        //     }
        //     autoScrolling();
        // }
    })
    //监控window的size变化
    $(window).resize(function(){
        autoScrolling();
    })
    // //小于1024可拖动
    function autoScrolling(){
        var w = window.innerWidth;
        if(w<1024){
            $('#dowebok').fullpage.setAutoScrolling(false);
        }else{
            $('#dowebok').fullpage.setAutoScrolling(true);
            $('#dowebok').fullpage.fitToSection(true);

        }
    }
    autoScrolling();
})

//鼠标进入事件
proAct.mouseenter(function(){
    if($(this).index() == 0){
        return
    }else{
        $(this).addClass("active").siblings().removeClass("active");
        $(this).children().addClass("bounceInUp animated");
        $(this).siblings().children().removeClass("bounceInUp animated")
    }
})