// ==UserScript==
// @name         Bionic Reading Converter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Converts any website text to Bionic Reading format
// @author       Himanshu Bankoti
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function convertToBionic(text) {
        return text.split(' ').map(word => {
            if (word.length > 3) {
                let boldPart = word.slice(0, Math.ceil(word.length / 2));
                let normalPart = word.slice(Math.ceil(word.length / 2));
                return `<b>${boldPart}</b>${normalPart}`;
            } else {
                return `<b>${word}</b>`;
            }
        }).join(' ');
    }

    function applyBionicReadingToElement(element) {
        // Avoid altering scripts, styles, and iframes
        if (element.tagName.toLowerCase() === 'script' || element.tagName.toLowerCase() === 'style' || element.tagName.toLowerCase() === 'iframe') {
            return;
        }

        for (let node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                let span = document.createElement('span');
                span.innerHTML = convertToBionic(node.nodeValue);
                node.parentNode.replaceChild(span, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                applyBionicReadingToElement(node);
            }
        }
    }

    function applyBionicReading() {
        applyBionicReadingToElement(document.body);
    }

    // Run the script once the page has fully loaded
    window.addEventListener('load', applyBionicReading);
})();