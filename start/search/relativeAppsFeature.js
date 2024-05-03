window.relativeAppsFeatures = function(e, t) {
  this.relativeApps = [];
  this.oldGeo = {};
  var r = this;
  this.timeout = null;
  this.isActive = false;
  this.searchResult = [];
  Element.prototype.setAttributes = function(e) {
      var t = this;
      Object.keys(e).forEach(function(r, s) {
          t.setAttribute(r, e[r])
      })
  };

  function s() {
      var e = r.oldGeo = JSON.parse(localStorage.getItem("geodata"));
      this.relativeApps = e.relate
  }
  this.sortBtnInit = function() {
      s();
      var e = t.createElement("DIV");
      e.setAttributes({
          id: "sortRelativeApps",
          class: "sortRelativeBtn",
          "data-toggle": "tooltip",
          "data-placement": "right",
          "data-original-title": "Click to sort A-Z"
      });
      t.getElementsByClassName("f-b")[0].appendChild(e);
      e.removeEventListener("click", r.sortBtnClicked, true);
      e.addEventListener("click", r.sortBtnClicked, true)
  };
  this.sortBtnClicked = function(t) {
      r.relativeApps.sort(function(e, t) {
          if (e.hl == "hot") {
              if (t.hl === "hot") {
                  return e.name.toUpperCase() < t.name.toUpperCase() ? -1 : e.name.toUpperCase() > t.name.toUpperCase() ? 1 : 0
              } else {
                  return -1
              }
          } else if (e.hl === "new") {
              if (t.hl === "hot") {
                  return 1
              } else if (t.hl === "new") {
                  return e.name.toUpperCase() < t.name.toUpperCase() ? -1 : e.name.toUpperCase() > t.name.toUpperCase() ? 1 : 0
              } else {
                  return -1
              }
          } else {
              if (t.hl === "hot" || t.hl === "new") {
                  return 1
              } else {
                  return e.name.toUpperCase() < t.name.toUpperCase() ? -1 : e.name.toUpperCase() > t.name.toUpperCase() ? 1 : 0
              }
          }
      });
      var s = JSON.parse(localStorage.getItem("geodata"));
      s.relate = r.relativeApps;
      localStorage.setItem("geodata", JSON.stringify(s));
      e.loadRelativeApps();
      localStorage.setItem("geodata", JSON.stringify(r.oldGeo))
  };
  this.searchBtnInit = function() {
      var e = t.createElement("DIV");
      e.innerHTML = '<input type="search" id="r-a-s-i" class="r-a-s-i-c" placeholder="Search" />';
      e.setAttributes({
          class: "relativeAppsSearch"
      });
      t.getElementsByClassName("f-b")[0].appendChild(e);
      e.removeEventListener("input", r.searchBtnEvent, true);
      e.addEventListener("input", r.searchBtnEvent, true)
  };
  this.searchBtnEvent = function(e) {
      var s = (e.target.value.charAt(0).toUpperCase() + e.target.value.substr(1)).trim();
      var a = {
          keyword: s
      };
      if (r.timeout) {
          clearTimeout(r.timeout)
      }
      r.timeout = setTimeout(function() {
          if (s.length > 0) {
              t.getElementById("sortRelativeApps").style.display = "none";
              t.getElementById("sortRelativeApps").removeEventListener("click", r.sortBtnClicked, true);
              var e = t.querySelectorAll("#tab-relative-apps .t-r-a-s .r-a-r-i");
              for (item of e) {
                  var i = item.querySelector(".r-a-c-2 p").innerText;
                  if (i.toLowerCase().indexOf(a.keyword.toLowerCase()) > -1) item.style.display = "block";
                  else item.style.display = "none"
              }
              browser.runtime.sendMessage({
                  name: "click-SearchRelativeApps",
                  data: a.keyword
              })
          } else {
              r.searchResult = [];
              t.getElementById("sortRelativeApps").removeEventListener("click", r.sortBtnClicked, true);
              t.getElementById("sortRelativeApps").style.display = "block";
              t.getElementById("sortRelativeApps").addEventListener("click", r.sortBtnClicked, true);
              t.querySelector("#tab-relative-apps .t-r-a-s").style.display = "block";
              for (item of t.querySelectorAll("#tab-relative-apps .t-r-a-s .r-a-r-i")) item.style.display = "block";
              if (t.getElementsByClassName("s-r-s-b")[0]) {
                  t.getElementsByClassName("s-r-s-b")[0].remove()
              }
          }
      }, 500)
  };
  this.init = function() {
      if (!r.isActive) {
          var e = t.createElement("DIV");
          e.setAttributes({
              class: "f-b"
          });
          t.getElementById("tab-relative-apps").insertBefore(e, t.querySelector("#tab-relative-apps .t-r-a-s"));
          r.sortBtnInit();
          r.searchBtnInit();
          r.isActive = true
      }
  };
  return this
}(window, document);