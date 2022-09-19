const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// các DOM phần hát nhạc
const playBtn = $(".btn-toggle-play");
const titleSong = $(".title h2");
const cdImage = $(".cd-image");
const audio = $("#audio");
const player = $(".player");
const process = $("#process");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const song = $(".song");
const randomBtn = $(".btn-random");
const repeatBtn = $(".control .btn-repeat");
const playList = $(".playList");
const sliderMain = $(".slider-main");

const LOCALSTORAGE_KEY = "MY_MUSIC";

// các DOM phần List nhạc
const selectSong = $(".select-song");
const selectAlbum = $(".select-album");
const selectAll = $(".select-all");
const generalItems = $(".general-items");
const selectDeleted = $(".select-deleted");



const app = {
  isplaying: false,
  currentIndex: 0,
  isRandom: false,
  isRepeat: 0,
  config: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || {},
  songs: [
    {
      name: "Anh Mơ",
      singer: "Trung Tự",
      path: "./assets/music/songs/AnhMo.mp3",
      image: "./assets/img/myList/TrungTu.jpg",
    },
    {
      name: "Có Khi Nào Rời Xa",
      singer: "Bích Phương",
      path: "./assets/music/songs/CoKhiNaoRoiXa.mp3",
      image: "./assets/img/myList/BichPhuong.jpg",
    },
    {
      name: "Đừng Yêu Nữa Em Mệt Rồi",
      singer: "Min",
      path: "./assets/music/songs/DungYeuNuaEmMetRoi.mp3",
      image: "./assets/img/myList/MIN.jpg",
    },
    {
      name: "Họ Đâu Cần Tôi",
      singer: "Anh Khang",
      path: "./assets/music/songs/HoDauCanToi.mp3",
      image: "./assets/img/myList/AnhKhang.jpg",
    },
    {
      name: "Tự Dưng",
      singer: "Phan Mạnh Quỳnh",
      path: "./assets/music/songs/TuDung.mp3",
      image: "./assets/img/myList/PhanManhQuynh.jpg",
    },
  ],
  newSongs: [
    {
      name: "2 Thế Giới",
      singer: "Karik",
      path: "./assets/music/newSongs/2-The-Gioi-Karik.mp3",
      image: "./assets/img/newList/karik.jpg",
    },
    {
      name: "Buồn",
      singer: "Vũ Duy Khánh",
      path: "./assets/music/newSongs/Buon-Vu-Duy-Khanh.mp3",
      image: "./assets/img/newList/VuDuyKhanh.jpg",
    },
    {
      name: "Cà Phê Đăng Và Mưa",
      singer: "Thanh Ngọc",
      path: "./assets/music/newSongs/Ca-Phe-Dang-Va-Mua-Thanh-Ngoc.mp3",
      image: "./assets/img/newList/ThanhNgoc.jpg",
    },
    {
      name: "Niệm Khúc Cuối",
      singer: "Lê Hiếu",
      path: "./assets/music/newSongs/Niem-Khuc-Cuoi-Le-Hieu.mp3",
      image: "./assets/img/newList/LeHieu.jpg",
    },
    {
      name: "Nụ Hồng Mong Manh",
      singer: "Toncafe",
      path: "./assets/music/newSongs/Nu-Hong-Mong-Manh-Toncafe.mp3",
      image: "./assets/img/newList/Toncafe.jpg",
    },
    {
      name: "Set Fire To The Rain",
      singer: "Toncafe",
      path: "./assets/music/newSongs/Set-Fire-to-the-Rain-Adele.mp3",
      image: "./assets/img/newList/Adele.jpg",
    },
  ],
  albums: [
    {
      name: "Album Cô Ta",
      singer: "Vũ",
      path: "./assets/music/albums/CoTa.mp3",
      image: "./assets/img/albums/vu.jpg",
    },
    {
      name: "Album Mượn Rượu Tỏ Tình",
      singer: "Emily",
      path: "./assets/music/albums/MuonRuouToTinh.mp3",
      image: "./assets/img/albums/emily.jpg",
    },
    {
      name: "Album Dằm Trong Tim",
      singer: "Hạ Linh",
      path: "./assets/music/albums/DamTrongTim.mp3",
      image: "./assets/img/albums/HaLinh.jpg",
    },
    {
      name: "Album Khó Vẽ Nụ Cười",
      singer: "Đạt G",
      path: "./assets/music/albums/KhoVeNuCuoi.mp3",
      image: "./assets/img/albums/DatG.jpg",
    },
    {
      name: "Album Tòng Phu",
      singer: "Keyo",
      path: "./assets/music/albums/TongPhu.mp3",
      image: "./assets/img/albums/keyo.jpg",
    },
    {
      name: "Album Nhật Phong",
      singer: "Tướng Quân",
      path: "./assets/music/albums/TuongQuan.mp3",
      image: "./assets/img/albums/nhatPhong.jpg",
    },
  ],
  songCanceleds: [],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this.config));
  },
  saveCancle: [],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index === this.currentIndex ? "active" : ""
            }" data-index = "${index}">
                <div class="song-image" style="background-image: url('${song.image}')"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p>${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-xmark"></i>
                </div>
          </div>
            `;
    });
    const htmlsGeneralItems = this.newSongs.map((song, index) => {
      return `
            <div class="item">
              <div class="item-image" style="background-image: url('${song.image}');"></div>
                <div class="item-detail">
                <h4>${song.name}</h4>
                  <p class="item-name">${song.singer}</p>
                  <p class="item-day">1 ngày trước</p>
                  </div>
                  </div>
                  `;
    });
    generalItems.innerHTML = htmlsGeneralItems.join("");

    const htmlsSider = this.songs.map((song, index) => {
      return `
            <div class="slider-item">
             <img src='${song.image}' alt="" />
            </div>
      `;
    });

    sliderMain.innerHTML = htmlsSider.join("");
    playList.innerHTML = htmls.join("");
  },

  handleEventsPlayMusic: function () {
    const _this = this;
    const cdImageAnimation = cdImage.animate([{ transform: "rotate(360deg" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdImageAnimation.pause();

    playBtn.onclick = function (e) {
      if (_this.isplaying) {
        playBtn.classList.remove("active");

        this.innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
      } else {
        this.innerHTML = '<i class="fa-solid fa-pause"></i>';
        audio.play();
      }
    };

    audio.onplay = function (e) {
      _this.render();
      playBtn.classList.add("active");
      cdImageAnimation.play();
      _this.isplaying = true;
    };

    audio.onpause = function () {
      cdImageAnimation.pause();
      _this.isplaying = false;

      if (
        process.value == 100 &&
        _this.isRepeat == 0 &&
        _this.isRandom == false
      ) {
        if (_this.currentIndex >= _this.songs.length - 1) {
          playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
          playBtn.classList.remove("active");
          _this.loadCurrentSong;
          // audio.pause();
        } else {
          _this.nextSong();
          audio.play();
        }
      } else if (process.value == 100 && _this.isRepeat == 1) {
        _this.loadCurrentSong;
        audio.play();
      } else if (
        process.value == 100 &&
        _this.isRandom == true &&
        _this.isRepeat == 0
      ) {
        _this.nextRandom();
        audio.play();
      } else if (process.value == 100 && _this.isRepeat == -1) {
        _this.nextSong();
        audio.play();
      }
    };

    audio.ontimeupdate = function () {
      if (audio.duration) {
        const playPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );

        process.value = playPercent;
      }
    };

    process.onchange = function (e) {
      const currentPlay = (e.target.value / 100) * audio.duration;

      audio.currentTime = currentPlay;
    };

    nextBtn.onclick = function () {
      nextBtn.innerHTML = '<i class="fa-solid fa-forward"></i>'
      _this.nextSong();
      audio.play();
    };

    preBtn.onclick = function (e) {
      preBtn.innerHTML = '<i class="fa-solid fa-backward"></i>'
      _this.preSong();
      audio.play();
    };

    randomBtn.onclick = function () {

      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.innerHTML = '<i class="fa-solid fa-shuffle"></i>';
      randomBtn.classList.toggle("active", _this.isRandom);
    };

    repeatBtn.onclick = function () {
      console.log(_this.isRepeat)
      if(_this.isRepeat == 0){
        _this.isRepeat = 1;
          _this.setConfig("isRepeat", _this.isRepeat);
          repeatBtn.classList.add("active");
          repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>1';
      }else if(_this.isRepeat == 1){
        _this.isRepeat = -1;
          _this.setConfig("isRepeat", _this.isRepeat);
          repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
          repeatBtn.classList.add("active");
      }else if(_this.isRepeat == -1) {
        _this.isRepeat = 0;
          _this.setConfig("isRepeat", _this.isRepeat);
          repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
          repeatBtn.classList.remove("active");
      }
      // switch (_this.isRepeat) {
      //   case 0:
      //     console.log(_this.isRepeat)
      //     _this.isRepeat = 1;
      //     _this.setConfig("isRepeat", _this.isRepeat);

      //     repeatBtn.classList.add("active");
      //     repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>1';
      //     break;
      //   case 1:
      //     console.log(_this.isRepeat)

      //     _this.isRepeat = -1;
      //     _this.setConfig("isRepeat", _this.isRepeat);

      //     repeatBtn.innerHTML = '<i class="fa-solid fa-repeat"></i>';
      //     repeatBtn.classList.add("active");
      //     break;
      //   case -1:
      //     console.log(_this.isRepeat)
      //     _this.isRepeat = 0;
      //     _this.setConfig("isRepeat", _this.isRepeat);

      //     repeatBtn.classList.remove("active");

      //     break;
      //   default:
      //     console.log('loi')
      //     break;
      // }
    };

    let arrayFilter = [];
    player.onclick = function (e) {
      const NodeSong = e.target.closest(".song:not(.active)");
      // const h3 = $$(".song .body h3");

      //
      //
      if (NodeSong && !e.target.closest(".option")) {
        if (NodeSong) {
          _this.currentIndex = Number(NodeSong.dataset.index);
          playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      } else if (e.target.closest(".option")) {
        arrayFilter = _this.songs.filter((element) => {
          // check xem neu nhu nut minh nhan dung vs bai hat
          if (
            element.name ==
            e.target.closest(".option").parentElement.childNodes[3]
              .childNodes[1].textContent
          ) {
            let values = _this.songCanceleds.filter((song) => {
              return song.name == element.name;
            });

            if (values.length == 0) {
              $(".checked").style.display = "flex";
              
              $(".select-deleted").classList.remove("active");
              $(".select-all").classList.remove("active");
              $(".select-album").classList.remove("active");
              $(".select-song").classList.add("active");

              _this.saveCancle.push(element);
            }
          }

          // tra ve phan tu khac vs list nhac vao trong cancle
          // tuc la phan tu minh nhan nut vao cancled
          return (
            element.name !=
            e.target.closest(".option").parentElement.childNodes[3]
              .childNodes[1].textContent
          );
        });

        $(".checked").style.display = "flex";
      }
    };
    // -----------------------------------------------------------------------

    // --------------------------------------------
    $(".checked .btnChecked .checkedTrue").onclick = function () {
      $(".checked").style.display = "none";

      _this.songs = arrayFilter;

      _this.songCanceleds = _this.saveCancle;

      arrayFilter = [];
      $(".select-song").classList.add("active");

      _this.render();
      _this.handleEventsSelectList();
    };
    $(".checked .btnChecked .checkedFalse").onclick = function () {
      _this.saveCancle.pop();
      _this.songCanceleds = _this.saveCancle;

      arrayFilter = [];

      $(".checked").style.display = "none";
    };

    $(".checked .checkedItem .cancleCheck").onclick = function () {
      _this.saveCancle = _this.songCanceleds;
      arrayFilter = [];
      $(".checked").style.display = "none";
    };
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    titleSong.textContent = this.currentSong.name;
    cdImage.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRepeat = 0;
    this.isRandom === undefined
      ? (this.isRandom = false)
      : (this.isRandom = this.config.isRandom);
  },
  nextSong: function () {
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  preSong: function () {
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    // this.currentIndex < 0 ? this.currentIndex = this.songs.length - 1 : this.currentIndex
    this.loadCurrentSong();
  },
  nextRandom: function () {
    const nextIndexSong = Math.floor(Math.random() * this.songs.length);
    if (nextIndexSong === this.currentIndex) {
      return;
    } else {
      this.currentIndex = nextIndexSong;
      this.loadCurrentSong();
    }
  },
  // phần content bên phải

  handleEventsSelectList: function () {
    const _this = this;
    const htmlsAlbum = this.albums.map((album, index) => {
      return `
            <div class="item">
              <div class="item-image" style="background-image: url('${album.image}');"></div>
              <div class="item-detail">
                  <h4>${album.name}</h4>
                  <p class="item-name">${album.singer}</p>
                  <p class="item-day">1 ngày trước</p>
              </div>
          </div>
      `;
    });

    const htmls = this.newSongs.map((song, index) => {
      return `
      <div class="item">
        <div class="item-image" style="background-image: url('${song.image}');"></div>
        <div class="item-detail">
          <h4>${song.name}</h4>
          <p class="item-name">${song.singer}</p>
          <p class="item-day">1 ngày trước</p>
        </div>
      </div>
            `;
    });
    const htmlsSongDeleted = this.songCanceleds.map((song, index) => {
      return `
      <div class="item">
        <div class="item-image" style="background-image: url('${song.image}');"></div>
        <div class="item-detail">
          <h4>${song.name}</h4>
          <p class="item-name">${song.singer}</p>
          <p class="item-day">1 ngày trước</p>
        </div>
      </div>
            `;
    });
    // generalItems.innerHTML = htmlsSongDeleted.join("");

    selectAlbum.onclick = function () {
      $(".select-album").classList.add("active");
      $(".select-song").classList.remove("active");
      $(".select-deleted").classList.remove("active");
      $(".select-all").classList.remove("active");

      generalItems.innerHTML = htmlsAlbum.join("");
    };
    selectSong.onclick = function (e) {
      $(".select-song").classList.add("active");
      $(".select-album").classList.remove("active");
      $(".select-deleted").classList.remove("active");
      $(".select-all").classList.remove("active");

      generalItems.innerHTML = htmls.join("");
    };
    selectAll.onclick = function () {
      $(".select-all").classList.add("active");
      $(".select-deleted").classList.remove("active");
      $(".select-album").classList.remove("active");
      $(".select-song").classList.remove("active");
      const allList = _this.newSongs.concat(_this.albums);
      // _this.render()
      const htmlsAllList = allList.map((song, index) => {
        return `
        <div class="item">
          <div class="item-image" style="background-image: url('${song.image}');"></div>
          <div class="item-detail">
            <h4>${song.name}</h4>
            <p class="item-name">${song.singer}</p>
            <p class="item-day">1 ngày trước</p>
          </div>
        </div>
              `;
      });
      generalItems.innerHTML = htmlsAllList.join("");
    };

    selectDeleted.onclick = function () {
      $(".select-deleted").classList.add("active");
      $(".select-album").classList.remove("active");
      $(".select-song").classList.remove("active");
      $(".select-all").classList.remove("active");

      generalItems.innerHTML = htmlsSongDeleted.join("");
      _this.handleEventsSelectList();
    };

    let valueItem;
    $(".general").onclick = function (e) {
      const itemSong = e.target.closest(".item");
      const checkedPost = e.target.closest(".checkedPost");
      const cancleCheck = e.target.closest(".checkedPost .cancleCheck");
      const checkedTrue = e.target.closest(".checkedPost .checkedTrue");
      const checkedFalse = e.target.closest(".checkedPost .checkedFalse");
      const checkedClose = e.target.closest(".checkedPost .checkedClose");
      if (itemSong) {
        valueItem = itemSong;
        valueItem = valueItem.children[0].style.backgroundImage;
        valueItem = valueItem
          .replace(/.*\s?url\([\'\"]?/, "")
          .replace(/[\'\;"]?\).*/, "");
        $(".checkedPost").style.display = "flex";
      }
      if (cancleCheck) {
        checkedPost.style.display = "none";
      }

      if (checkedTrue) {
        const urlImage = _this.songs.map((song) => {
          return song.image;
        });

        console.log($(".select-song").classList.contains("active"));
        if ($(".select-song").classList.contains("active") == true) {
          _this.newSongs.forEach((newSong) => {
            if (newSong.image == valueItem) {
              var kq = urlImage.includes(valueItem);
              if (!kq) {
                console.log("chua co trong list nhac");
                _this.songs = _this.songs.concat([
                  {
                    name: `${newSong.name}`,
                    singer: `${newSong.singer}`,
                    path: `${newSong.path}`,
                    image: `${valueItem}`,
                  },
                ]);
                console.log(_this.songs);
                console.log(_this.songCanceleds);

                checkedPost.style.display = "none";
              } else {
                console.log("đã có trong list nhạc");
                checkedPost.innerHTML = `
                    <div class="checkedItem">
                      <div class="cancleCheck">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                      <h3>Đã có bài hát trong list nhạc của bạn!</h3>
                      <h3> Vui lòng chọn bài khác...!</h3>
                      <div class="btnChecked">
                        <div class="checkedClose">Close</div>
                      </div>
                    </div>
                  `;
                checkedPost.style.display = "flex";
              }
            }
          });
        } else if ($(".select-album").classList.contains("active") == true) {
          _this.albums.forEach((album) => {
            if (album.image == valueItem) {
              console.log("chay album");
              var kq = urlImage.includes(valueItem);
              if (!kq) {
                _this.songs = _this.songs.concat([
                  {
                    name: `${album.name}`,
                    singer: `${album.singer}`,
                    path: `${album.path}`,
                    image: `${valueItem}`,
                  },
                ]);

                checkedPost.style.display = "none";
                generalItems.innerHTML = htmlsAlbum.join("");
              } else {
                $(".checkedPost").innerHTML = `
                    <div class="checkedItem">
                      <div class="cancleCheck">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                      <h3>Đã có bài hát trong list nhạc của bạn!</h3>
                      <h3> Vui lòng chọn bài khác...!</h3>
                      <div class="btnChecked">
                        <div class="checkedClose">Close</div>
                      </div>
                    </div>
                  `;
              }
            }
          });
        } else if ($(".select-deleted").classList.contains("active") == true) {
          _this.songCanceleds.forEach((songCandled) => {
            if (songCandled.image == valueItem) {
              console.log("chay cancle");
              var kq = urlImage.includes(valueItem);
              // neu k co trong list nhac moi them vo
              if (!kq) {
                _this.songs = _this.songs.concat([
                  {
                    name: `${songCandled.name}`,
                    singer: `${songCandled.singer}`,
                    path: `${songCandled.path}`,
                    image: `${valueItem}`,
                  },
                ]);

                // loc ra cac phan tu dc xoa tra ve cho mang songCandleds phan tu con lai
                const a = _this.songCanceleds.filter((element) => {
                  return element.image != songCandled.image;
                });

                _this.songCanceleds = a;

                _this.saveCancle = a;

                // _this.handleEventsSelectList()
                checkedPost.style.display = "none";
              } else {
                $(".checkedPost").innerHTML = `
                    <div class="checkedItem">
                      <div class="cancleCheck">
                        <i class="fa-solid fa-xmark"></i>
                      </div>
                      <h3>Đã có bài hát trong list nhạc của bạn!</h3>
                      <h3> Vui lòng chọn bài khác...!</h3>
                      <div class="btnChecked">
                        <div class="checkedClose">Close</div>
                      </div>
                    </div>
                  `;
                // checkedPost.style.display = "flex";
              }
            }
          });
        }
        $(".select-song").classList.add("active");
        $(".select-album").classList.remove("active");
        $(".select-deleted").classList.remove("active");
        $(".select-all").classList.remove("active");
        _this.handleEventsSelectList();
        _this.render();
      }

      if (cancleCheck) {
        $(".checkedPost .checkedItem").innerHTML = `
          <div class="checkedItem">
            <div class="cancleCheck">
              <i class="fa-solid fa-xmark"></i>
            </div>
            <h3>Bạn có muốn lưu nó vào list nhạc đang phát không?</h3>
            <div class="btnChecked">
              <div class="checkedTrue">YES</div>
              <div class="checkedFalse">NO</div>
            </div>
          </div>
            `;
        checkedPost.style.display = "none";
      }

      if (checkedFalse) {
        $(".checkedPost .checkedItem").innerHTML = `
        <div class="checkedItem">
          <div class="cancleCheck">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <h3>Bạn có muốn lưu nó vào list nhạc đang phát không?</h3>
          <div class="btnChecked">
            <div class="checkedTrue">YES</div>
            <div class="checkedFalse">NO</div>
          </div>
        </div>`;
        checkedPost.style.display = "none";
      }

      if (checkedClose) {
        $(".checkedPost .checkedItem").innerHTML = `
        <div class="checkedItem">
          <div class="cancleCheck">
            <i class="fa-solid fa-xmark"></i>
          </div>
          <h3>Bạn có muốn lưu nó vào list nhạc đang phát không?</h3>
          <div class="btnChecked">
            <div class="checkedTrue">YES</div>
            <div class="checkedFalse">NO</div>
          </div>
        </div>`;
        checkedPost.style.display = "none";
      }
    };
  },
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.render();
    this.loadCurrentSong();

    this.handleEventsPlayMusic();
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);

    this.handleEventsSelectList();
  },
};

app.start();
