// Analytics were removed from this site. weather.js still calls Analytics.trackEvent(...) and
// friends in a number of places; this stub keeps those calls harmless. It sends nothing and
// stores nothing. (Delete this file together with those calls in weather.js if you want it gone.)
// Read as a global by weather.js, so it looks unused to the linter.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Analytics = new Proxy(
  {},
  {
    get() {
      return function () {};
    },
  },
);
