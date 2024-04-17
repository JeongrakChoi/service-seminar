/* Shuffle Text */
(function(e) {
  e.fn.shuffleText = function(n, r) {
  var t = false;
      var s = e(this);
      var o = new Array("가", "나", "다", "라", "마", "바", "사", "아", "자", "차", "카", "타", "파", "하", "거");
      var u = e.extend({
          time: 20,
          maxTime: 1e4,
          amount: 3,
          complete: null
      }, r);
      if (n == undefined) n = "";
      var a = s.text().split(""),
          f = n.split(""),
          l = 0,
          c = 0,
          h = 0,
          p = 0,
          d, v;
      if (!t) {
          t = true;
          return s.each(function() {
              function r() {
                  s.empty();
                  if (a.length > f.length) iLength = a.length;
                  else iLength = f.length;
                  for (i = 0; i < iLength; i++) {
                      if (a[i] == undefined) s.append(e("<span></span>"));
                      else s.append(e("<span>" + a[i] + "</span>"))
                  }
              }

              function p() {
                  var r = o[Math.floor(Math.random() * o.length)];
                  if (l >= iLength) {
                      t = false;
                      s.text(n);
                      clearInterval(d);
                      if (typeof u.complete == "function") u.complete.call(s)
                  } else {
                      if (c == u.amount) {
                          if (l >= f.length) e(v[l]).text("");
                          else e(v[l]).text(f[l]);
                          l++;
                          c = 0
                      } else {
                          e(v[l]).text(r);
                          c++
                      }
                  }
              }
              r();
              v = s.find("span");
              if (u.amount < 0) u.amount = 0;
              if (iLength * (u.amount + 1) * u.time > u.maxTime) {
                  h = u.maxTime / (iLength * (u.amount + 1))
              } else {
                  h = u.time
              }
              p();
              d = setInterval(p, Math.floor(h))
          })
      }
  }
})(jQuery)
