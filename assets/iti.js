/* =============================================================
   ITI WEBSITE SUCCESS PROTOTYPE - shared behaviour
   One script for every page. Each block guards on its own
   elements so pages only run what they contain.

   ITI_STATS is the SINGLE SOURCE OF TRUTH for the load-bearing,
   illustrative figures. Update once here, every page follows.
   This is the maintenance argument, made literal.
   ============================================================= */
(function () {
  "use strict";

  /* ---- single source of truth: illustrative figures pending assurance ---- */
  var ITI_STATS = window.ITI_STATS = {
    implementations: 20,
    countries: 14,
    dimensions: 4,
    ambition: 100
  };

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  ready(function () {

    /* Flag the document so reveal/animation hidden-states apply only with JS.
       Without this class, all content is visible by default (no JS dependency
       for content to appear). Skip entirely under reduced motion. */
    if (!reduceMotion) document.documentElement.classList.add('js-reveal');

    /* ---- hero data-field: scattered points drift toward order ----
       One ambient motion encoding the thesis: raw infrastructure data
       resolving into a measure. Disabled under reduced motion. */
    var canvas = document.getElementById('field');
    if (canvas && !reduceMotion) {
      var ctx = canvas.getContext('2d');
      var host = canvas.parentElement, pts = [], raf = null, W = 0, H = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
      function size() {
        W = host.clientWidth; H = host.clientHeight;
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        build();
      }
      function build() {
        pts = [];
        var cols = Math.max(8, Math.round(W / 90)), rows = Math.max(4, Math.round(H / 90));
        for (var i = 0; i < cols * rows; i++) {
          var gx = (i % cols) / (cols - 1) * W, gy = Math.floor(i / cols) / (rows - 1) * H;
          pts.push({
            // start scattered, target the ordered grid
            x: Math.random() * W, y: Math.random() * H,
            tx: gx, ty: gy,
            r: Math.random() < 0.14 ? 2.4 : 1.3,
            gold: Math.random() < 0.16,
            spd: 0.012 + Math.random() * 0.02,
            ph: Math.random() * Math.PI * 2
          });
        }
      }
      var t = 0;
      function frame() {
        t += 0.006;
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < pts.length; i++) {
          var p = pts[i];
          // ease toward ordered target, then breathe gently around it
          p.x += (p.tx - p.x) * p.spd;
          p.y += (p.ty - p.y) * p.spd;
          var dx = Math.cos(t + p.ph) * 6, dy = Math.sin(t * 0.8 + p.ph) * 6;
          ctx.beginPath();
          ctx.arc(p.x + dx, p.y + dy, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.gold ? 'rgba(254,206,50,0.55)' : 'rgba(255,255,255,0.16)';
          ctx.fill();
        }
        raf = requestAnimationFrame(frame);
      }
      size();
      frame();
      var rsz; window.addEventListener('resize', function () { clearTimeout(rsz); rsz = setTimeout(size, 200); });
    }

    /* ---- mobile nav toggle ---- */
    var toggle = document.querySelector('.navtoggle');
    var links = document.querySelector('.navlinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    }

    /* ---- mark active nav link by current file ---- */
    var here = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.navlinks a[href]').forEach(function (a) {
      var target = a.getAttribute('href').split('#')[0];
      if (target && target === here) a.classList.add('active');
    });

    /* ---- bind static stat values from the source of truth ---- */
    document.querySelectorAll('[data-stat]').forEach(function (el) {
      var key = el.dataset.stat;
      if (ITI_STATS[key] == null) return;
      var suf = el.querySelector('.suf');
      el.childNodes[0].nodeValue = ITI_STATS[key];
      if (suf) el.appendChild(suf);
    });

    /* ---- proof stats count up on entry ---- */
    function countUp(el, target) {
      if (reduceMotion) { el.childNodes[0].nodeValue = target; return; }
      var start = null, dur = 1100, suf = el.querySelector('.suf');
      function step(ts) {
        if (start === null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        el.childNodes[0].nodeValue = Math.round(target * eased);
        if (suf) el.appendChild(suf);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var proofEl = document.querySelector('.proof');
    if (proofEl) {
      var statIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.querySelectorAll('.n').forEach(function (n) {
            var t = parseInt(n.textContent, 10);
            if (isNaN(t)) return;
            n.childNodes[0].nodeValue = '0';
            var suf = n.querySelector('.suf'); if (suf) n.appendChild(suf);
            countUp(n, t);
          });
          statIO.unobserve(e.target);
        });
      }, { threshold: .5 });
      statIO.observe(proofEl);
    }

    /* ---- the one irreversible reveal: published? -> is it working? ---- */
    var reframe = document.getElementById('reframe');
    if (reframe) {
      if (reduceMotion) { reframe.classList.add('flipped'); }
      else {
        var rfIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting && e.intersectionRatio > .55) { reframe.classList.add('flipped'); rfIO.unobserve(reframe); }
          });
        }, { threshold: [.55] });
        rfIO.observe(reframe);
      }
    }

    /* ---- dimension cards: click/keyboard to expand, screen-reader announced ---- */
    document.querySelectorAll('.dim').forEach(function (card) {
      var more = card.querySelector('.more');
      if (more && card.dataset.more) more.textContent = card.dataset.more;
      // make the div behave as an accessible button
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-expanded', 'false');
      if (more) { more.id = more.id || ('dim-more-' + Math.round(Math.random() * 1e6)); card.setAttribute('aria-controls', more.id); }
      function toggle() {
        var open = card.classList.toggle('open');
        card.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      card.addEventListener('click', toggle);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); toggle(); }
      });
    });

    /* ---- mock dashboard: pick a country, toggle the average ---- */
    var clist = document.getElementById('clist');
    if (clist) {
      var TIPS = {
        "Uganda":     "Uganda's systems publish, sustain, and use infrastructure information well above the international average, with the strongest gains in data publication.",
        "Costa Rica": "Costa Rica sits above the international average, with steady year-on-year gains led by its data publication dimension.",
        "Panama":     "Panama scores above average, driven by a large rise in the number of projects published across the lifecycle.",
        "Malawi":     "Malawi sits just below the international average, with the enabling environment ahead of citizen use."
      };
      var avgOn = true;
      var avgToggle = document.getElementById('avgtoggle');
      var avgRow = document.getElementById('avgrow');
      function setAvg(on) {
        avgOn = on;
        if (avgRow) avgRow.style.opacity = on ? '1' : '.25';
        if (avgToggle) avgToggle.classList.toggle('on', on);
      }
      if (avgToggle) avgToggle.addEventListener('click', function () { setAvg(!avgOn); });
      clist.querySelectorAll('.cbtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          clist.querySelectorAll('.cbtn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var c = btn.dataset.c, s = +btn.dataset.score;
          var nm = document.getElementById('cname'); if (nm) nm.textContent = c;
          var fl = document.getElementById('cfill'); if (fl) fl.style.width = s + '%';
          var vl = document.getElementById('cval'); if (vl) vl.textContent = s;
          var tp = document.getElementById('tip'); if (tp) tp.innerHTML = '<b>What this score means:</b> ' + TIPS[c];
        });
      });
    }

    /* ---- impact cards: reveal on scroll ---- */
    var icards = document.querySelectorAll('.icard');
    if (icards.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: .25 });
      icards.forEach(function (c, i) { c.style.transitionDelay = (i * 0.09) + 's'; io.observe(c); });
    }

    /* ---- audience pathways: tile updates the panel ---- */
    var tiles = document.getElementById('tiles');
    var panel = document.getElementById('panel');
    if (tiles && panel) {
      var AUD = {
        gov: { who: "Government", h: "Reform guidance you can act on",
          q: "How do we improve, and where do we start?",
          g: "A diagnostic across four dimensions that shows exactly which systems to strengthen first.",
          next: "See your reform priorities" },
        civ: { who: "Civil society", h: "Evidence for advocacy",
          q: "Where is transparency failing, and how do we prove it?",
          g: "Comparable scores and dimension-level gaps you can cite in campaigns and oversight work.",
          next: "Find the evidence" },
        don: { who: "Donor or investor", h: "Evidence to inform fiduciary-risk conversations",
          q: "Is our funding going somewhere transparent and accountable?",
          g: "A consistent measure of transparency and reform progress to inform risk conversations and support decisions.",
          next: "See the funder assurance case", nextHref: "for-funders.html" },
        reg: { who: "Regional body", h: "A benchmark across your member states",
          q: "How do our countries compare, and where do we focus regional effort?",
          g: "A common scale that lets you benchmark members and target capacity-building where it counts.",
          next: "Compare the region" },
        jou: { who: "Journalist", h: "Story angles grounded in data",
          q: "What is the real state of infrastructure transparency here?",
          g: "Country scores, trends, and standout gaps that point to concrete, checkable stories.",
          next: "Find a story angle" }
      };
      function renderAud(key) {
        var a = AUD[key];
        panel.innerHTML =
          '<div class="who">' + a.who + '</div><h3>' + a.h + '</h3>' +
          '<div class="qa"><div class="k">Your question</div><div class="v">&ldquo;' + a.q + '&rdquo;</div></div>' +
          '<div class="qa"><div class="k">What the ITI gives you</div><div class="v">' + a.g + '</div></div>' +
          '<a class="next" href="' + (a.nextHref || 'how-to-use.html') + '">' + a.next + ' &rarr;</a>';
      }
      tiles.querySelectorAll('.tile').forEach(function (t) {
        t.addEventListener('click', function () {
          tiles.querySelectorAll('.tile').forEach(function (x) { x.classList.remove('active'); });
          t.classList.add('active');
          renderAud(t.dataset.a);
        });
      });
      renderAud('gov');
    }

    /* ---- richer viz: radar + trend lines draw on entry ---- */
    function drawOnView(sel) {
      var el = document.querySelector(sel);
      if (!el) return;
      if (reduceMotion) { el.classList.add('drawn'); return; }
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { el.classList.add('drawn'); o.unobserve(el); } });
      }, { threshold: .35 });
      o.observe(el);
    }
    drawOnView('.radar');
    drawOnView('.trendlines');

    /* ---- real map: Mapbox if a public token is present, else SVG fallback ---- */
    var mapHost = document.getElementById('map');
    if (mapHost) {
      /* Real ITI / CoST member countries only. Scores are illustrative,
         pending verification. Do not add a country that has not run the ITI. */
      var COUNTRIES = [
        { name: 'Uganda',     lng: 32.29,  lat: 1.37,   score: 71 },
        { name: 'Malawi',     lng: 34.30,  lat: -13.25, score: 52 },
        { name: 'Ghana',      lng: -1.02,  lat: 7.95,   score: 59 },
        { name: 'Costa Rica', lng: -84.09, lat: 9.93,   score: 67 },
        { name: 'Panama',     lng: -80.78, lat: 8.54,   score: 63 },
        { name: 'Honduras',   lng: -86.24, lat: 14.65,  score: 58 },
        { name: 'Guatemala',  lng: -90.23, lat: 15.78,  score: 55 },
        { name: 'Ukraine',    lng: 31.17,  lat: 48.38,  score: 61 }
      ];
      var token = (window.ITI_CONFIG && window.ITI_CONFIG.mapboxToken) || '';
      function fallbackMap() {
        // self-contained: page never breaks if Mapbox/CDN/token unavailable
        mapHost.innerHTML =
          '<svg class="map-canvas" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map of ITI-assessed countries">' +
          '<rect width="800" height="460" fill="#16242b"/>' +
          '<text x="24" y="40" fill="#FECE32" font-family="monospace" font-size="11" letter-spacing="2">ASSESSED COUNTRIES</text>' +
          COUNTRIES.map(function (c, i) {
            // simple equirectangular projection to the viewBox
            var x = (c.lng + 180) / 360 * 800;
            var y = (90 - c.lat) / 180 * 460;
            return '<g><circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="6" fill="#FECE32" stroke="#fff" stroke-width="1.5"/>' +
                   '<circle cx="' + x.toFixed(0) + '" cy="' + y.toFixed(0) + '" r="12" fill="none" stroke="#FECE32" stroke-width="1" opacity=".5"/>' +
                   '<text x="' + (x + 14).toFixed(0) + '" y="' + (y + 4).toFixed(0) + '" fill="#D7DBDC" font-family="sans-serif" font-size="12">' + c.name + ' &#183; ' + c.score + '</text></g>';
          }).join('') +
          '<text x="24" y="446" fill="#7E8A8D" font-family="monospace" font-size="10">Static fallback view. Add a Mapbox token in assets/config.js for the interactive map.</text>' +
          '</svg>';
      }
      if (!token) { fallbackMap(); }
      else {
        var css = document.createElement('link');
        css.rel = 'stylesheet'; css.href = 'https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.css';
        document.head.appendChild(css);
        var s = document.createElement('script');
        s.src = 'https://api.mapbox.com/mapbox-gl-js/v3.7.0/mapbox-gl.js';
        s.onerror = fallbackMap;
        s.onload = function () {
          try {
            mapboxgl.accessToken = token;
            var map = new mapboxgl.Map({
              container: 'map', style: 'mapbox://styles/mapbox/dark-v11',
              center: [10, 12], zoom: 1.4, attributionControl: true, cooperativeGestures: true
            });
            map.on('load', function () {
              COUNTRIES.forEach(function (c) {
                var el = document.createElement('div'); el.className = 'map-marker';
                new mapboxgl.Marker(el).setLngLat([c.lng, c.lat])
                  .setPopup(new mapboxgl.Popup({ offset: 16 }).setHTML('<h4>' + c.name + '</h4><span class="ms">ITI score ' + c.score + ' &#183; illustrative</span>'))
                  .addTo(map);
              });
              if (!reduceMotion) {
                setTimeout(function () { map.flyTo({ center: [20, 5], zoom: 2.1, duration: 2600, essential: true }); }, 700);
              }
            });
            map.on('error', fallbackMap);
          } catch (e) { fallbackMap(); }
        };
        document.head.appendChild(s);
      }
    }

    /* ---- vision timeline draws on entry ---- */
    var road = document.querySelector('.road');
    if (road) {
      if (reduceMotion) { road.classList.add('drawn'); }
      else {
        var roadIO = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) { if (e.isIntersecting) { road.classList.add('drawn'); roadIO.unobserve(road); } });
        }, { threshold: .3 });
        roadIO.observe(road);
      }
    }

    /* ---- generic scroll-reveal for [data-reveal] ---- */
    var reveals = document.querySelectorAll('[data-reveal]');
    if (reveals.length) {
      var rvIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rvIO.unobserve(e.target); } });
      }, { threshold: .2 });
      reveals.forEach(function (el) { rvIO.observe(el); });
    }

    /* ---- modals ---- */
    function openOv(id) { var o = document.getElementById(id); if (o) o.classList.add('show'); }
    var op1 = document.getElementById('open-onepager');
    if (op1) op1.addEventListener('click', function (e) { e.preventDefault(); openOv('ov-onepager'); });
    var op2 = document.getElementById('open-contact');
    if (op2) op2.addEventListener('click', function (e) { e.preventDefault(); openOv('ov-contact'); });
    document.querySelectorAll('[data-open]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); openOv(b.dataset.open); });
    });
    document.querySelectorAll('[data-close]').forEach(function (b) {
      b.addEventListener('click', function () { var o = b.closest('.overlay'); if (o) o.classList.remove('show'); });
    });
    document.querySelectorAll('.overlay').forEach(function (o) {
      o.addEventListener('click', function (e) { if (e.target === o) o.classList.remove('show'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') document.querySelectorAll('.overlay.show').forEach(function (o) { o.classList.remove('show'); });
    });

  });
})();
