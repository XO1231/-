
$(document).ready(function () {
  var mySwiper = new Swiper('.swiper-container', {
    loop: true, // 循环模式选项
    centeredSlides: true,
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
  });
$('.swiper-img').click(function(){
 $('#forum').show('slow')
})
$('#cancel').click(function(){
  $('#forum').hide('slow')
})
  let wrapper = document.querySelector('.wrapper')
  let scroll = new BScroll(wrapper,{
    click:true,
    scrollX:true,
    scrollY:false ,
    tap: true,
  })
  $('.content').on('click', 'li', function (e) {
    e.stopPropagation();
    $(this).addClass("navactive").siblings('.navactive').removeClass("navactive");
    scroll.scrollToElement('.navactive', 500, true, false)
    $(this).children('span').addClass("line-active");
    $(this).siblings().children('.line-active').removeClass("line-active");

  });
  
})

