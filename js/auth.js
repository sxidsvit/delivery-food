'use strict'

window.auth = (function () {
  const modal = window.modal
  const utils = window.utils
  const cart = window.cart

  const self = {
    init: init,
    toggle: toggle,
    isAuthorized: isAuthorized
  }

  let elems = {}
  let loginName = ''

  function logoutHandler() {
    login('')
  }

  function submitHandler(event) {
    event.preventDefault()
    if (login(elems.loginText.value.trim())) {
      elems.loginText.style.borderColor = ''
      modal.toggle(elems.modalDialog)()
    } else {
      elems.loginText.style.borderColor = 'red'
    }
  }

  function login(username) {
    loginName = username
    if (username) {
      elems.userNameLabel.textContent = username
      elems.loginText.value = ''

      elems.logoutButton.style.display = 'flex'
      elems.loginButton.style.display = 'none'
      cart.visible(true)
    } else {
      elems.userNameLabel.textContent = ''
      elems.logoutButton.style.display = 'none'
      elems.loginButton.style.display = 'flex'
      cart.visible(false)
    }
    localStorage.setItem('delivery-food.username', username)

    return username
  }

  function init(selectors) {
    elems = utils.applySelector(selectors)
    console.log('elems: ', elems)

    elems.userNameLabel.style.display = 'inline-block'
    elems.loginButton.addEventListener('click', toggle)
    elems.closeModalDialog.addEventListener('click', toggle)
    elems.logoutButton.addEventListener('click', logoutHandler)
    elems.authForm.addEventListener('submit', submitHandler)

    login(localStorage.getItem('delivery-food.username') || '')
  }

  function toggle() {
    modal.toggle(elems.modalDialog)()
  }

  function isAuthorized() {
    return !!loginName
  }

  return self
}())
