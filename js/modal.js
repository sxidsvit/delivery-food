'use strict'

window.modal = (function () {
  const self = {
    toggle: toggleModal
  }

  function toggleModal(elem) {
    return function () {
      elem.classList.toggle('is-open')
    }
  }

  return self
}())
