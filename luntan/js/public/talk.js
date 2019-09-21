
$(document).ready(function () {
  let content = $('.content');
  let contentLi = $('.content li');
  let ulcontent = $('.ulcontent li');
  let ul = $('.ulcontent ')
  let mySwiper = new Swiper('.swiper-container', {
    loop: true,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {　　
      delay: 3000,
      disableOnInteraction: false　
    }

  });
  // bsscroll插件
  let wrapper = document.querySelector('.wrapper')
  let scroll = new BScroll('#scrollWrap', {
    click: true,
    scrollX: true,
    scrollY: false,
    tap: true,
  })
  tab(content, 'navactive', ulcontent, 'line-active');
  tab(ul, 'navactive', contentLi, 'line-active');
  function tab(ele0, active, ele, active2) {
    ele0.on('click', 'li', function (e) {
      e.stopPropagation();
      $(this).addClass(active).siblings('.' + active).removeClass(active);
      let idx = $(this).index();
        $(this).children('span').addClass(active2);
        $(this).siblings().children('.' + active2).removeClass(active2);
        ele.eq(idx).addClass(active).siblings('.' + active).removeClass(active);
        ele.eq(idx).addClass(active).siblings('.' + active).removeClass(active);
        ele.eq(idx).children('span').addClass(active2);
        ele.eq(idx).siblings().children('.' + active2).removeClass(active2);
      scroll.scrollToElement('.navactive', 500, true, false); 
    
    })
  }
})

