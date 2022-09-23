//DOM selection
let main = document.querySelector("main");
let iconContainer = document.querySelector(".icon-container");
let icon = document.querySelector(".icon");
let settingBox = document.querySelector(".setting-box");
let colorli = document.querySelectorAll(".colors-list li");
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let backgroundOption = true;
// control the interval
let bginterval;

if (localStorage.getItem("color_option") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === localStorage.getItem("color_option")) {
      e.classList.add("active");
    }
  });
}

// on icon click

iconContainer.addEventListener("click", function () {
  settingBox.classList.toggle("open");
  icon.classList.toggle("fa-spin");
});

//SWITCH color

colorli.forEach((li) => {
  li.addEventListener("click", (e) => {
    // e.target.dataset.color;
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    //SET COLOR TO LOCAL STORAGE

    handleActive(e);
  });
});

//SWITCH BG

let randombgEle = document.querySelectorAll(".randombg span");

randombgEle.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.bg === "yes") {
      backgroundOption = true;
      randomizeImg();
    } else {
      backgroundOption = false;
      clearInterval(bginterval);
    }
  });
});

//////////////// change random bg-img

//setInterval(changebgi, 3000);
// function changebgi() {
//   let random = Math.floor(Math.random() * 5);
//   main.style.cssText = `background-image : url("../images/${
//     random + 1
//   }.jpg")`;
// }

/////////////// change random bg-img , after edit

// control the interval

// control the interval

// function randomizeImg() {
//   if (backgroundOption === true) {
//     let img = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
//     bginterval = setInterval(() => {
//       let random = Math.floor(Math.random() * img.length);
//       main.style.backgroundImage = 'url("../images/' + img[random] + '")';
//     }, 15000);
//   }
// }

function randomizeImg() {
  if (backgroundOption === true) {
    // let img = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
    bginterval = setInterval(() => {
      let random = Math.floor(Math.random() * 5);
      main.style.cssText = `background-image : url("../images/${
        random + 1
      }.jpg")`;
    }, 15000);
  }
}
randomizeImg();

//ABOUT SECTION

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterTop = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  let calc = skillsOffsetTop + skillsOuterTop - windowHeight;
  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
  // console.log(skillsOffsetTop);
  // console.log(skillsOuterTop);
  // console.log(windowHeight);
  // console.log(windowScrollTop);
  if (windowScrollTop >= calc) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = "1%";
    });
  }
};

// image section

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create popup black bg
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // create the popup
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.append(imgText);
      popupBox.append(imgHeading);
    }
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.append(popupImage);
    document.body.append(popupBox);
    // create the close span

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    // khaled elmasry
    closeButton.append(closeButtonText);
    closeButton.className = "close-button";
    popupBox.append(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// NAV BULLETS

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    // console.log(document.querySelector(e.target.dataset.section));
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// make a funq to handle remove and handle active state

function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  event.target.classList.add("active");
}

//show bullets

let bulletSpan = document.querySelectorAll(".bullets-option");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocal = localStorage.getItem("bullets_option");

if (bulletLocal !== null) {
  // console.log("not null");
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocal == "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
    document.querySelector(".bullets-option .yes").classList.remove("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      // console.log(e.target.dataset.display);
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      // console.log(e.target.dataset.display);
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// reset

document.querySelector(".reset-option").onclick = function () {
  //localStorage.clear();
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  window.location.reload();
};

//toggle

let toggleBtn = document.querySelector(".toggle-menu");
let toggleLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  toggleLinks.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== toggleLinks) {
    if (toggleLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      toggleLinks.classList.toggle("open");
    }
  }
});

toggleLinks.onclick = function (e) {
  e.stopPropagation();
};
