'use strict';

window.page = window.page || {};
window.page.restaurants = (function() {
    let goods = window.page.goods;
    let utils = window.utils;
    let auth = window.auth;

    let elems = {
        logo: '.logo',
        cards: '.cards-restaurants',
        promo: '.container-promo',
        restaurants: '.restaurants'
    };
    elems = utils.applySelector(elems);

    let self = {
        init: init,
        show: show,
        hide: hide
    };

    function createCard(obj) {
        const { name, image, kitchen, price, stars, products, time_of_delivery: timeOfDelivery } = obj;
        const card = `
            <a class="card card-restaurant"
                    data-name="${name}" data-stars="${stars}"
                    data-price="${price}" data-kitchen="${kitchen}"
                    data-products="${products}">
                <img src="${image}" alt="image" class="card-image"/>
                <div class="card-text">
                    <div class="card-heading">
                        <h3 class="card-title">${name}</h3>
                        <span class="card-tag tag">${timeOfDelivery} мин</span>
                    </div>
                    <div class="card-info">
                        <div class="rating">${stars}</div>
                        <div class="price">От ${price} ₽</div>
                        <div class="category">${kitchen}</div>
                    </div>
                </div>
            </a>
        `;
        elems.cards.insertAdjacentHTML('beforeend', card);
    }

    function init(list) {
        elems.cards.textContent = '';
        list.forEach(createCard);

        elems.cards.addEventListener('click', openGoods);
        elems.logo.addEventListener('click', openRestaurants);
    }

    function show() {
        elems.promo.classList.remove('hide');
        elems.restaurants.classList.remove('hide');
        window.scrollTo(0, 0);
    }

    function hide() {
        elems.promo.classList.add('hide');
        elems.restaurants.classList.add('hide');
    }

    function openGoods(event) {
        const restaurant = event.target.closest('.card-restaurant');
        if (restaurant) {
            if (auth.isAuthorized()) {
                self.hide();
                goods.init(restaurant.dataset);
                goods.show();
            } else {
                auth.toggle();
            }
        }
    }

    function openRestaurants() {
        self.show();
        goods.hide();
    }

    return self;
}());
