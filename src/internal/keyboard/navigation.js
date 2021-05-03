/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ArrowLeft, ArrowRight } from './keys';
import { match } from './match';
/**
 * Various utilities to help with a11y work
 */

/**
 * A "ring buffer" function that takes an array and depending on an ArrowRight
 * or ArrowLeft key input loops from last index to first or first index to last.
 *
 * @param {string} key - the left or right arrow keys
 * @param {number} index - the current index in a given array
 * @param {number} arrayLength - the total length of the array
 *
 * @example
 * 	getNextIndex(keyCodes.RIGHT, 0, 4)
 */

export var getNextIndex = function getNextIndex(key, index, arrayLength) {
  if (match(key, ArrowRight)) {
    return (index + 1) % arrayLength;
  }

  if (match(key, ArrowLeft)) {
    return (index + arrayLength - 1) % arrayLength;
  }
};
/**
 * A flag `node.compareDocumentPosition(target)` returns,
 * that indicates `target` is located earlier than `node` in the document or `target` contains `node`.
 */

export var DOCUMENT_POSITION_BROAD_PRECEDING = // Checks `typeof Node` for `react-docgen`
typeof Node !== 'undefined' && Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
/**
 * A flag `node.compareDocumentPosition(target)` returns,
 * that indicates `target` is located later than `node` in the document or `node` contains `target`.
 */

export var DOCUMENT_POSITION_BROAD_FOLLOWING = // Checks `typeof Node` for `react-docgen`
typeof Node !== 'undefined' && Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;
/**
 * CSS selector that selects major nodes that are sequential-focusable.
 */

export var selectorTabbable = "\n  a[href], area[href], input:not([disabled]):not([tabindex='-1']),\n  button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),\n  textarea:not([disabled]):not([tabindex='-1']),\n  iframe, object, embed, *[tabindex]:not([tabindex='-1']):not([disabled]), *[contenteditable=true]\n";
/**
 * CSS selector that selects major nodes that are click focusable
 */

export var selectorFocusable = "\n  a[href], area[href], input:not([disabled]),\n  button:not([disabled]),select:not([disabled]),\n  textarea:not([disabled]),\n  iframe, object, embed, *[tabindex]:not([disabled]), *[contenteditable=true]\n";