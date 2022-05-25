# NoRedInk/analytics.js

This repo is a custom distribution of [segmentio/analytics.js](https://github.com/segmentio/analytics.js/tree/2.11.0) for use with NRI projects.

The following integrations (from [segmentio/analytics.js-integration](https://github.com/segmentio/analytics.js-integrations/tree/2d65a8eb942c8ff45f29dad908a063b36d7648eb)) are included:

- google-analytics-4
- customerio
- mixpanel
- optimizely
- pardot

## About this repo

### Why is this repo needed?

Analytics.js 2 requires using segment's SAAS offering, and the official build of the legacy analytics.js for standalone use is no longer updated and does not include GA4. This repo is a fork of analytics.js that includes the community-supported GA4 integration.

### Building

This repo uses nix and direnv to provide build tooling.

```bash
direnv allow

npm install

npm run build
```

### Adding an integration

Install the integration via [gitpkg](https://gitpkg.vercel.app/):

```bash
npm install 'https://gitpkg.now.sh/segmentio/analytics.js-integrations/integrations/<my-integration>?2d65a8eb942c8ff45f29dad908a063b36d7648eb'
```

Add your new integration to [lib/index.js](./lib/index.js):

```js
const integrations = [
  require("@segment/analytics.js-integration-<my-integration>"),
];
```

Build the custom distribution:

```bash
npm run build
```

#### A note about gitpkg

Available integrations are in the [segmentio/analytics.js-integrations monorepo](https://github.com/segmentio/analytics.js-integrations/tree/master/integrations).

Neither the monorepo nor the individual integrations are published to npm; for this reason [gitpkg](https://gitpkg.vercel.app/) is used to install integrations via npm so that we don't have to muck with git submodules or install the entire integrations repo via npm.

### Updating the monolith

- Commit your updated build and push it to Github
- Update `analytics` in [NoRedInk/vendor-assets bower.json](https://github.com/NoRedInk/vendor-assets/blob/master/bower.json#L4) with the latest commit SHA that includes your updated build
- Continue with the steps to [update vendor-assets](https://github.com/NoRedInk/wiki/blob/master/engineering/Updating-Dependencies.md#updating-vendor-assets)

---

For more information and usage, please see the [upstream documentation](https://github.com/segmentio/analytics.js/tree/2.11.0).
