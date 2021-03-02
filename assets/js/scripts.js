function onReady() { // Handler when the DOM is fully loaded
  var navHamburger = document.querySelector(".nav__hamburger");
  var navMenu = document.querySelector(".nav-menu");
  var navMenuCross = document.querySelector(".nav-menu__cross");
  var navMenuListItems = document.querySelectorAll(".nav-menu__list-item");
  var navMenuSeparator = document.querySelector(".nav-menu__separator");
  var navMenuText = document.querySelector(".nav-menu__text");
  var navMenuEmail = document.querySelector(".nav-menu__email");
  var navMenuSocialBtn = document.querySelector(".nav-menu__social-btn");
  var skillsBtn = document.querySelector(".about-me__skills__btn");
  var readMoreArray = "";
  navMenu.inert = true;

  /* Animate nav elements */
  function animateElements() {
    // Creating array from NodeList:
    var menuItemsArray = [].slice.call(navMenuListItems);
    // Concat all elements for animation together:
    var elementsForAnimation = [
      navMenuSeparator,
      navMenuText,
      navMenuEmail,
      navMenuSocialBtn
    ].concat(menuItemsArray);
    // Loop through elements
    elementsForAnimation.forEach(function (element) {
      element.classList.toggle("nav-menu__items__animation");
    });
    navMenuCross.classList.toggle("nav-menu__cross__animation");
  }

  /* show menu */
  function showMenu(e) {
    e.stopPropagation();
    navHamburger.style.visibility = "hidden";
    navMenu.style.width = "250px";
    navMenuCross.style.display = "block";
    animateElements();
    navMenu.inert = false;
  }

  /* hide menu */
  function hideMenu() {
    navMenuCross.style.display = "none";
    navMenu.style.width = "0px";
    navHamburger.style.visibility = "visible";
    animateElements();
    navMenu.inert = true;
  }

  /* Resize header image on About-me page */
  function resizeHeader() {
    var headerBackground = document.querySelector(".about-me__header");
    var pageWidth = window.innerWidth;

    if (pageWidth > 400 && pageWidth < 500) {
      headerBackground.style.backgroundSize = "85%";
    }
  }

  /* show more biography text */
  function aboutText(e) {
    var itemOne = document.querySelector("#item__one");
    var itemTwo = document.querySelector("#item__two");
    var itemThree = document.querySelector("#item__three");
    var readMoreData = e.target.dataset.name;

    function textUnfold(item, unfoldHeight, displayHeight) {
      if (item.style.height != unfoldHeight) {
        item.style.transition = "all 1s ease-out";
        item.style.height = unfoldHeight;
        e.target.classList.toggle("about__me__more__slide");
        e.target.innerHTML = "read less";
      } else {
        item.style.transition = "all 1s ease-out";
        item.style.height = displayHeight;
        e.target.classList.toggle("about__me__more__slide");
        e.target.innerHTML = "read more";
      }
    }
    function setHeight(itemName) {
      if (window.innerWidth <= 500) {
        textUnfold(itemName, "900px", "390px");
      } else if (window.innerWidth <= 800) {
        textUnfold(itemName, "750px", "336px");
      } else if (window.innerWidth > 800 && window.innerWidth < 1080) {
        textUnfold(itemName, "900px", "390px");
      } else if (window.innerWidth > 1080) {
        textUnfold(itemName, "890px", "390px");
      }
    }
    if (readMoreData == "item-one-more") {
      setHeight(itemOne);
    } else if (readMoreData == "item-two-more") {
      setHeight(itemTwo);
    } else if (readMoreData == "item-three-more") {
      setHeight(itemThree);
    }
  }

  /* Check body */
  function checkBody() {
    var nav = document.querySelector(".nav");
    var header = document.querySelector(".header");
    var mainContainer = document.querySelector(".main-container");
    var aboutMeContainer = document.querySelector(".about-me__container");
    var projectContainer = document.querySelector(".project__container");
    var readMore = document.querySelectorAll(".about-me__more");

    if (document.body.id == "body-index") {
      nav.addEventListener("click", hideMenu);
      header.addEventListener("click", hideMenu);
      mainContainer.addEventListener("click", hideMenu);
    } else if (document.body.id == "body-project") {
      nav.addEventListener("click", hideMenu);
      projectContainer.addEventListener("click", hideMenu);
    } else if (document.body.id == "body-about") {
      nav.addEventListener("click", hideMenu);
      aboutMeContainer.addEventListener("click", hideMenu);
      readMoreArray = [].slice.call(readMore);
      readMoreArray.forEach(function (element) {
        element.addEventListener("click", aboutText, false);
      });
      skillsBtn.addEventListener("click", showSkills);
      resizeHeader();
    }
  }

  function addClickListener(elements, callback) {
    elements.forEach(function (element) {
      element.addEventListener("click", callback);
    });
  }

  /* Portfolio buttons */
  function selectButton() {
    var portfolioButtons = document.querySelectorAll(".portfolio__nav__btn");
    var buttonsArray = [].slice.call(portfolioButtons);
    addClickListener(buttonsArray, portfolioItems);
  }

  /* Portfolio items to sort */
  function portfolioItems(e) {
    var button = e.target.dataset.btnName;
    var portfolioItems = document.querySelectorAll(".portfolio__item");
    var portfolioItemsArray = [].slice.call(portfolioItems);

    portfolioItemsArray.forEach(function (element) {
      function hideElement() {
        element.classList.remove("portfolio__item__show");
        element.classList.add("portfolio__item__hide");
        element.style.display = "none";
      }
      function showElement() {
        element.classList.remove("portfolio__item__hide");
        element.classList.add("portfolio__item__show");
        element.style.display = "block";
      }

      function portfolioItemSort(elementName) {
        if (element.dataset.name != elementName) {
          hideElement();
        } else {
          showElement();
        }
      }
      if (button == "websites-btn") {
        portfolioItemSort("website");
      } else if (button == "apps-btn") {
        portfolioItemSort("app");
      } else if (button == "illustrations-btn") {
        portfolioItemSort("illustration");
      } else if (button == "all-btn") {
        showElement();
      }
    });
  }

  /* Scroll to a section */
  function addScrollEffects() {
    $(".nav-menu__link").click(function () {
      hideMenu();
      $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top
      }, 800);
      return false;
    });
    $(".nav__logo__link, .header__btn, .footer-menu__link").click(function () {
      $("html, body").animate({
        scrollTop: $($.attr(this, "href")).offset().top
      }, 800);
      return false;
    });
  }

  function init() {
    addScrollEffects();
    navHamburger.addEventListener("click", showMenu);
    navMenuCross.addEventListener("click", hideMenu);
    checkBody();
    selectButton();
  }
  init();
}

// Vanilla JS analogue $(document).ready
(function () {
  if (document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)) {
    onReady();
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
})();
