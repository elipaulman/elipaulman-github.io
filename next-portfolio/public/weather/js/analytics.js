// Analytics were removed from this site. weather.js still calls Analytics.trackEvent(...) and
// friends in a number of places; this stub keeps those calls harmless. It sends nothing and
// stores nothing. (Delete this file together with those calls in weather.js if you want it gone.)
const Analytics = new Proxy(
  {},
  {
    get() {
      return function () {};
    },
  },
);
