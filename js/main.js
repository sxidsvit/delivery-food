'use strict';

(function () {
  const utils = window.utils
  const auth = window.auth
  const cart = window.cart
  const restaurants = window.page.restaurants

  const selectors = {
    loginButton: '.button-auth',
    logoutButton: '.button-out',
    userNameLabel: '.user-name',
    modalDialog: '.modal-auth',
    closeModalDialog: '.close-auth',
    authForm: '#logInForm',
    loginText: '#login',
    passwordText: '#password'
  }
  auth.init(selectors)
  cart.init()

  utils.getData('db/partners.json')
    .then(restaurants.init)
}())
