/* eslint-disable no-undef */
/* eslint-disable prefer-const */
'use strict'

window.cart = (function () {
  let modal = window.modal
  let utils = window.utils

  let elems = {
    open: '#cart-button',
    close: '.close',
    cancel: '.clear-cart',
    modal: '.modal',
    modalBody: '.modal-body',
    total: '.modal-pricetag'
  }
  elems = utils.applySelector(elems)

  let products = []

  let self = {
    init: init,
    add: add,
    render: render,
    visible: visible
  }

  function init() {
    elems.open.addEventListener('click', modal.toggle(elems.modal))
    elems.close.addEventListener('click', modal.toggle(elems.modal))
    elems.modalBody.addEventListener('click', changeCount)
    elems.cancel.addEventListener('click', cancel)

    products = JSON.parse(localStorage.getItem('delivery-food.cart')) || []

    render()
  }

  function add(card) {
    let product = {
      id: card.id,
      name: card.querySelector('.card-title').textContent,
      price: card.querySelector('.card-price-bold').textContent,
      count: 1
    }

    let food = findById(product.id)
    if (food) {
      product = food
      food.count++
    } else {
      products.push(product)
    }

    localStorage.setItem('delivery-food.cart', JSON.stringify(products))

    render()
  }

  function render() {
    elems.modalBody.textContent = ''

    products.forEach(function (item) {
      const itemCart = `
                <div class="food-row">
					<span class="food-name">${item.name}</span>
					<strong class="food-price">${item.price}</strong>
					<div class="food-counter">
						<button class="counter-button counter-minus" data-id=${item.id}>-</button>
						<span class="counter">${item.count}</span>
						<button class="counter-button counter-plus" data-id=${item.id}>+</button>
					</div>
				</div>
            `
      elems.modalBody.insertAdjacentHTML('afterbegin', itemCart)
    })

    const sum = products.reduce(function (res, item) {
      return res + parseFloat(item.price) * item.count
    }, 0)
    elems.total.textContent = sum + ' ₽'
  }

  function visible(isVisible) {
    elems.open.style.display = isVisible ? 'flex' : 'none'
  }

  function findById(id) {
    return products.find(function (item) { return item.id === id })
  }

  function changeCount(event) {
    const target = event.target
    if (target.classList.contains('counter-button')) {
      const food = findById(target.dataset.id)
      if (target.classList.contains('counter-minus')) {
        food.count--
        if (food.count === 0) {
          const idx = products.indexOf(food)
          products.splice(idx, 1)
        }
      }
      if (target.classList.contains('counter-plus')) {
        food.count++
      }
      localStorage.setItem('delivery-food.cart', JSON.stringify(products))

      render()
    }
  }

  function cancel() {
    products.length = 0
    localStorage.removeItem('delivery-food.cart')
    render()
  }

  return self
}())
