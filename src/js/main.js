window.addEventListener('DOMContentLoaded', () => {

  // Page reload 
  
  const refreshPage = document.querySelector('.navigation__logo');

  refreshPage.addEventListener('click', () => {
    window.location.reload();
  });


  // Slider main

  $('.slider__inner').slick(
    {
      speed:3000,
      autoplay: true,
      autoplaySpeed: 4000,
      pouseOnHover: true,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            arrows: false
          }
        }  
      ]
    }
  
  );
  
  // Slider clients

  $('.clients__slider_wrapper').slick(
    {
      speed:2000,
      autoplay: true,
      autoplaySpeed: 3000,
      pouseOnHover: true

    }
  
  );
  
  
  // Copy Url
  
  const copyUrl = document.querySelector('#copyurl'),
      copied = document.querySelector('.basement__copied');
  
  
  copyUrl.addEventListener('click', (evt) => {
    navigator.clipboard.writeText(evt.target.getAttribute('data-mail'))
    copyUrl.classList.add('hideaway');
    copied.classList.add('copied');
  
    setTimeout(() => {
        copyUrl.classList.remove('hideaway');
        copied.classList.remove('copied');
      }, 5000);
  });
  
  
  // Animation
  
  const animItems = document.querySelectorAll('.anim-items');
  
  if (animItems.length > 0) {  //Якщо >0, отже об`єкт є всередині
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
      for (let index = 0; index < animItems.length; index++) {
        const animItem = animItems[index];
        const animItemHeight = animItem.offsetHeight;
        const animItemOffset = offset(animItem).top;
        const animStart = 4; //Поява при осягненні 1/4 висоти об`єкта
  
        let animItemPoint = window.innerHeight - animItemHeight / animStart;
        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }
  
        if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
          animItem.classList.add('active');
        } else {
          if (!animItem.classList.contains('anim-no-hide')) { //Скасування анім при скролі вгору(назад)
            animItem.classList.remove('active');
          }
        }
      }
    }
    
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.scrollX || document.documentElement.scrollLeft,
        scrollTop = window.scrollY || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
  
    setTimeout(() => {
      animOnScroll();
    }, 300);
  
  }

  //Catalog

  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.offers__content').eq(i).toggleClass('offers__content_active');
              $('.offers__list').eq(i).toggleClass('offers__list_active');
          })
      });
  };

  toggleSlide('.offers__link');
  toggleSlide('.offers__back');

  // Modal

  $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
      })
  });
  

  // Hamburger

  const menu = document.querySelector('.navigation__bar'),
  menuItem = document.querySelectorAll('.navigation__link'),
  hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger_active');
      menu.classList.toggle('navigation__bar_active');

      overflowCheck()
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('hamburger_active');
          menu.classList.toggle('navigation__bar_active');
          
          overflowCheck()
      })
  });

  function overflowCheck() {
    if (hamburger.classList.contains('hamburger_active') && window.innerWidth <= 575) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }


  // Mailer

  const form = document.getElementById('form'),
        area = document.querySelector('.contact__area'),
        status = document.querySelector('.contact__status');

	form.addEventListener('submit', formSend);
  
  function hideStatus() {
    setTimeout(() => {
      status.classList.remove('active');
    }, 4000);
  }

	async function formSend(e) {
		e.preventDefault();

		let formData = new FormData(form);

    let error = 0;
    if (error === 0) {
			form.classList.add('sending');
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				// alert(result.message);
        status.classList.add('active');
        form.reset();
        hideStatus();
			} else {
				alert("Oops! Something went wrong...");
				area.classList.remove('sending');
			}
		} else {
			console.log('error');
		}
  }
});






