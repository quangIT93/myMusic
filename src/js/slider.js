window.addEventListener("load", function () {
  let sliderMain = document.querySelector(".slider-main");
  let sliderItems = document.querySelectorAll(".slider-item");
  let btnNext = document.querySelector(".next");
  let btnPrev = document.querySelector(".prev");

  let navBars = document.querySelector("header .nav-bars");
  let bars = document.querySelector("header .bars");


  const liNav = $("header nav ul");
  let positionImg = 0;
  //lấy chiều rộng của phần tử chứa ảnh

  bars.addEventListener('click', function (e) {
    navBars.classList.toggle(`active`)
    console.log(liNav)
    
  })
  
  navBars.addEventListener('click', function (e) {
    console.log(e.target.closest('li'))
    if(e.target.closest('li'))
      navBars.classList.remove(`active`)
  })

  let linav;
  liNav.addEventListener('click', function (e) {
      e.target.closest('li').classList.add('active')
    if(linav !== undefined){
      linav.classList.remove('active')
    }
    linav = e.target.closest('li')
  })




  btnNext.addEventListener("click", function () {
    btnNext.innerHTML = '<i class="fa fa-angle-right slider-next"></i>'
    
    const widthSlider = sliderItems[0].offsetWidth;
    handleSlider(1, widthSlider);
  });
  btnPrev.addEventListener("click", function () {
    btnPrev.innerHTML = '<i class="fa fa-angle-left slider-prev"></i>'

    const widthSlider = sliderItems[0].offsetWidth;

    handleSlider(0, widthSlider);
  });
  setInterval(function () {
    const widthSlider = sliderItems[0].offsetWidth;
    handleSlider(1, widthSlider);
  }, 5000);

  function handleSlider(checked, widthSlider) {
    if (checked == 1) {
      positionImg = positionImg - widthSlider;
      if (positionImg < -widthSlider * (sliderMain.children.length - 1)) {
        sliderMain.style.left = `0`;
        positionImg = 0;
      } else if (
        positionImg <= 0 &&
        positionImg >= -widthSlider * (sliderMain.children.length - 1)
      ) {
        sliderMain.style.left = `${positionImg}px`;
        // sliderMain.style = `transform: translateX(${positionImg}px);`;
      }
    } else if (checked == 0) {
      positionImg = positionImg + widthSlider;
      if (positionImg > 0) {
        sliderMain.style.left = `${
          (sliderMain.children.length - 1) * -widthSlider
        }px`;
        positionImg = (sliderMain.children.length - 1) * -widthSlider;
      } else if (positionImg <= 0) {
        sliderMain.style.left = `${positionImg}px`;
      }
    }
  }
});
