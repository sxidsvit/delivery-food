/* eslint-disable indent */
/* eslint-disable no-undef */
'use strict'

window.utils = (function () {
    const self = {
        applyFunction: applyFunction,
        applySelector: applySelector,
        getData: getData
    }

    function applyFunction(obj, fun, context) {
        const res = {}
        Object.keys(obj).forEach(function (key) {
            res[key] = fun.call(context, obj[key])
        })
        return res
    }

    function applySelector(obj) {
        return self.applyFunction(obj, document.querySelector, document)
    }

    async function getData(url) {
        const response = await fetch(url)
        if (!response.ok) {
            // eslint-disable-next-line no-useless-escape
            throw new Error(`Can\'t read data from ${url}. Status code: ${response.status}`)
        }

        return response.json()
    }

    return self
}())
