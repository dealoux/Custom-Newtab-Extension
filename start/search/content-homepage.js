(function(e) {
  if (e.injectedContentHomepage || e.self !== e.top) return;
  e.injectedContentHomepage = true;
  var t = function(e) {
      if (document.readyState === "complete") {
          e()
      } else {
          document.addEventListener("DOMContentLoaded", e)
      }
  };
  var c = function() {
      var e = document.getElementsByClassName("entry-title");
      if (e) {
          e[0].innerHTML = "Update for " + browser.i18n.getMessage("extName")
      }
  };
  var i = function(t, n) {
      if (e.debug) console.log("your location and weather info: ", t, n);
      if (e.debug) console.log("typeof location: ", typeof t);
      if (document.getElementById("wcc-current-city")) document.getElementById("wcc-current-city").innerHTML = "" + t.location_name;
      if (document.getElementById("wcc-current-weather")) document.getElementById("wcc-current-weather").innerHTML = "" + n.condition + ", " + n.fetchTemperature + "°" + n.fetchUnit.toUpperCase()
  };
  var r = function(e, t) {
      if (document.getElementById("wcc-current-city")) document.getElementById("wcc-current-city").innerHTML = "" + e.location_name;
      if (document.getElementById("wcc-current-weather")) document.getElementById("wcc-current-weather").innerHTML = "Cannot determine the weather of the current city!"
  };
  var l = function() {
      if (document.getElementById("wcc-current-city")) document.getElementById("wcc-current-city").innerHTML = "City not found";
      if (document.getElementById("wcc-current-weather")) document.getElementById("wcc-current-weather").innerHTML = "Enter valid city to display weather"
  };
  var s = function() {
      var e = document.getElementById("wcc-new-city").value;
      browser.runtime.sendMessage({
          type: "weather_location_request",
          info: {
              enteredLocation: e
          }
      })
  };
  browser.runtime.onMessage.addListener(function(n, s) {
      if (n.debug) e.debug = n.debug;
      if (e.debug) console.log("message: ", n);
      if (e.debug) console.log("sender: ", s);
      if (n.type === "showMajor") {
          t(c)
      }
      if (n.type === "weather_info") {
          t(function() {
              i(n.info.weather_location, n.info.weather_data)
          })
      }
      if (n.type === "error_get_weather_in_city") {
          t(function() {
              r(n.info.weather_location, n.info.error_msg)
          })
      }
      if (n.type === "error_city_not_found") {
          t(l)
      }
  });
  var d = function() {
      if (document.getElementById("wcc-widget-change-city")) {
          document.getElementById("wcc-widget-change-city").style.display = "block";
          document.getElementById("wcc-update-now").addEventListener("click", s);
          document.getElementById("wcc-new-city").addEventListener("keypress", function(e) {
              if (e.keyCode === 13) s()
          })
      }
  };
  t(d)
})(this);