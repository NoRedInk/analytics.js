import analytics from "@segment/analytics.js-core";

const integrations = [
  require("@segment/analytics.js-integration-customerio"),
  require("@segment/analytics.js-integration-mixpanel"),
  require("@segment/analytics.js-integration-optimizely"),
  require("@segment/analytics.js-integration-google-analytics-4"),
  require("@segment/analytics.js-integration-pardot"),
];

integrations.forEach(analytics.use.bind(analytics));

window.analytics = analytics;
