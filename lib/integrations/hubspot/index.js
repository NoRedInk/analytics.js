"use strict";

var integration = require("@segment/analytics.js-integration");

var HubSpot = (module.exports = integration("HubSpot"));

/**
 * Initialize.
 *
 * @api public
 */

HubSpot.prototype.initialize = function () {
  this.ready();
};

/**
 * Track.
 *
 * @api public
 * @param {Track} track
 */

HubSpot.prototype.track = function (event) {
  fetch("/hub_spot/track_event", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event.obj),
  });
};
