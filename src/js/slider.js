window.addEventListener("load", function () {
  let slider = document.querySelector(".slider");
  let sliderMain = document.querySelector(".slider-main");
  let sliderItems = document.querySelectorAll(".slider-item");
  let btnNext = document.querySelector(".slider-next");
  let btnPrev = document.querySelector(".slider-prev");
  let sliderWrapper = document.querySelector(".slider-wrapper");
  let dotItems = document.querySelectorAll(".slider-dots");

  let positionImg = 0;

  //lấy chiều rộng của phần tử chứa ảnh
  const widthSlider = sliderItems[0].offsetWidth;

  //   sliderMain.style.width = `${2000}px`;
  btnNext.addEventListener("click", function () {
    handleClickSlider(1);
  });
  btnPrev.addEventListener("click", function () {
    handleClickSlider(0);
  });
  setInterval(function () {
    handleClickSlider(1);
  }, 5000);

  function handleClickSlider(checked) {
    if (checked == 1) {
      positionImg = positionImg - 1000;
      if (positionImg < -1000 * (sliderMain.children.length - 1)) {
        sliderMain.style.left = `0`;
        positionImg = 0;
      } else if (
        positionImg <= 0 &&
        positionImg >= -1000 * (sliderMain.children.length - 1)
      ) {
        sliderMain.style.left = `${positionImg}px`;
        // sliderMain.style = `transform: translateX(${positionImg}px);`;
      }
    } else if (checked == 0) {
      positionImg = positionImg + 1000;
      if (positionImg > 0) {
        sliderMain.style.left = `${(sliderMain.children.length - 1) * -1000}px`;
        positionImg = (sliderMain.children.length - 1) * -1000;
      } else if (positionImg <= 0) {
        sliderMain.style.left = `${positionImg}px`;
      }
    }
  }
});
