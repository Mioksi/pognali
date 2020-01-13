var pageHeader = document.querySelector('.page-header');
var pageHeaderWrapper = pageHeader.querySelector('.page-header__wrapper');
var navigationToggle = pageHeader.querySelector('.page-header__toggle');
var mainNavigation = document.querySelector('.main-navigation');
var mainNavigationItem = mainNavigation.querySelectorAll('.main-navigation__item');

var map = document.querySelector('.map');

var catalogFilter = document.querySelector('.catalog-filter');

var countryFilter = document.querySelector('.filter');

var travellerForm = document.querySelector('.traveller-form');

pageHeader.classList.remove('page-header--menu-nojs');

navigationToggle.addEventListener('click', function () {
  if (pageHeader.classList.contains('page-header--menu-closed')) {
    pageHeader.classList.remove('page-header--menu-closed');
    pageHeader.classList.add('page-header--menu-opened');
  } else {
    pageHeader.classList.add('page-header--menu-closed');
    pageHeader.classList.remove('page-header--menu-opened');
  }
});

window.addEventListener('scroll', function () {
  pageHeader.classList.add('page-header--menu-scroll');
  pageHeaderWrapper.classList.add('page-header__wrapper--scroll');

  for (var i = 0; i < mainNavigationItem.length; i++) {
    var mainNavigationLink = mainNavigationItem[i].querySelector('.main-navigation__link');

    mainNavigationLink.classList.add('main-navigation__link--scroll');
  }

  if (pageYOffset === 0) {
    pageHeader.classList.remove('page-header--menu-scroll');
    pageHeaderWrapper.classList.remove('page-header__wrapper--scroll');

    for (var i = 0; i < mainNavigationItem.length; i++) {
      var mainNavigationLink = mainNavigationItem[i].querySelector('.main-navigation__link');

      mainNavigationLink.classList.remove('main-navigation__link--scroll');
    }
  }
});

if (map) {
  var mapPicture = map.querySelector('.map__picture');

  ymaps.ready(init);
  function init() {
    mapPicture.classList.add('map__picture--hide');

    var myMap = new ymaps.Map('yandexmap', {
      center: [59.935834, 30.321045],
      zoom: 15
    }),

    myPlacemark = new ymaps.Placemark([59.936281, 30.321169], {
      hintContent: 'Сервис «‎Погнали»'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/svg/map-marker.svg',
        iconImageSize: [66, 101],
        iconImageOffset: [-35, -85]
      })

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  };
}

if (catalogFilter) {
  var catalogFilterToggle = catalogFilter.querySelectorAll('.catalog-filter__toggle');
  var catalogFilterList = catalogFilter.querySelectorAll('.catalog-filter__select');
  var currentToggle = 0;

  if (document.body.clientWidth < 768 || document.body.clientWidth > 1439) {
    var getToggle = function (i) {
      catalogFilterToggle[i].addEventListener('click', function () {
        currentToggle = i;
        toggleFilter();
      });
    };

    for (var i = 0; i < catalogFilterToggle.length; i++) {
      getToggle(i);
    }

    var toggleFilter = function () {
      catalogFilterToggle[currentToggle].classList.toggle('catalog-filter__toggle--hide');
      catalogFilterList[currentToggle].classList.toggle('catalog-filter__select--hide');
    }
  }
}

if (countryFilter) {
  var countryFilterToggle = countryFilter.querySelector('.filter__toggle');
  var countryFilterButton = countryFilter.querySelector('.filter__button');

  countryFilterToggle.addEventListener('click', function () {
    if (countryFilter.classList.contains('filter--closed')) {
      countryFilter.classList.remove('filter--closed');
      countryFilter.classList.add('filter--opened');
    } else {
      countryFilter.classList.add('filter--closed');
      countryFilter.classList.remove('filter--opened');
    }
  });

  countryFilterButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    countryFilter.classList.remove('filter--opened');
    countryFilter.classList.add('filter--closed');
  });

  var countryFilterLetter = countryFilter.querySelectorAll('.alphabet__button');
  var countryFilterGroup = document.querySelectorAll('.country-filter__group');
  var currentFilterLetter = 0;
  var previousFilterLetter = 0;

  if (document.body.clientWidth < 1440) {
    var getLetter = function (i) {
      countryFilterLetter[i].addEventListener('click', function () {
        previousFilterLetter = currentFilterLetter;
        currentFilterLetter = i;
        toggleCountryGroup();
      });
    };

    for (var i = 0; i < countryFilterLetter.length; i++) {
      getLetter(i);
    }

    var toggleCountryGroup = function () {
      countryFilterLetter[previousFilterLetter].classList.remove('alphabet__button--active');
      countryFilterLetter[currentFilterLetter].classList.add('alphabet__button--active');
      countryFilterGroup[previousFilterLetter].classList.remove('country-filter__group--active');
      countryFilterGroup[currentFilterLetter].classList.add('country-filter__group--active');
    }
  }
}

if (travellerForm) {
  var travellerFormSelect = travellerForm.querySelector('.traveller-form__dropdown-select');
  var travellerFormSelectOption = travellerForm.querySelector('.traveller-form__select--option');

  travellerFormSelectOption.addEventListener('click', function (evt) {
    evt.preventDefault();

    travellerFormSelectOption.classList.toggle('traveller-form__select--open');
    travellerFormSelect.classList.toggle('traveller-form__dropdown-select--show');
  });
}
