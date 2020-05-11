'use strict';

window.page = window.page || {};
window.page.goods = (function() {
    let utils = window.utils;

    let elems = {
        menu: '.menu',
        info: '.menu > .section-heading',
        cards: '.cards-menu'
    };
    elems = utils.applySelector(elems);

    let self = {
        init: init,
        show: show,
        hide: hide
    };

    function init(info) {
        restaurantInfo(info);

        utils.getData('db/' + info.products)
            .then(function(list) {
                elems.cards.textContent = '';
                list.forEach(createCard);
            });
    }

    function show() {
        elems.menu.classList.remove('hide');
        window.scrollTo(0, 0);
    }

    function hide() {
        elems.menu.classList.add('hide');
    }

    function restaurantInfo(obj) {
        const { name, stars, price, kitchen } = obj;
        elems.info.innerHTML = `
            <h2 class="section-title restaurant-title">${name}</h2>
            <div class="card-info">
                <div class="rating">${stars}</div>
                <div class="price">От ${price} ₽</div>
                <div class="category">${kitchen}</div>
            </div>
        `;
    }

    function createCard(obj) {
        const { id, name, description, image, price } = obj;

        const card = document.createElement('div');
        card.id = id;
        card.className = 'card';
        card.insertAdjacentHTML('beforeend', `
            <img src="${image}" alt="image" class="card-image"/>
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title card-title-reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-buttons">
                    <button class="button button-primary button-add-cart" onclick="cart.add(${id})">
                        <span class="button-card-text">В корзину</span>
                        <span class="button-cart-svg"></span>
                    </button>
                    <strong class="card-price-bold">${price} ₽</strong>
                </div>
            </div>
        `);
        elems.cards.insertAdjacentElement('beforeend', card);
    }

    return self;
}());
