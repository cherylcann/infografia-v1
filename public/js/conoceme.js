(function () {
    var els = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: .15 });
        els.forEach(function (el) { io.observe(el); });
    } else {
        els.forEach(function (el) { el.classList.add('in'); });
    }
    document.querySelectorAll('.glw').forEach(function (c) {
        c.addEventListener('mousemove', function (e) {
            var r = c.getBoundingClientRect();
            c.style.setProperty('--x', (e.clientX - r.left) + 'px');
            c.style.setProperty('--y', (e.clientY - r.top) + 'px');
        });
    });
    
    var tabs = [].slice.call(document.querySelectorAll('.tabs [role="tab"]'));
    function replay(panel) {
        var cards = [].slice.call(panel.querySelectorAll('.sk'));
        var all = cards.concat([].slice.call(panel.querySelectorAll('.bar i')));
        all.forEach(function (c) { c.style.transition = 'none'; });
        cards.forEach(function (c) { c.classList.remove('in'); });
        void panel.offsetWidth;
        all.forEach(function (c) { c.style.transition = ''; });
        void panel.offsetWidth;
        cards.forEach(function (c) { c.classList.add('in'); });
    }
    function show(tab, focus) {
        var panel = null;
        tabs.forEach(function (t) {
            var on = t === tab, p = document.getElementById(t.getAttribute('aria-controls'));
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            if (p) { p.hidden = !on; if (on) panel = p; }
        });
        if (focus) tab.focus();
        if (panel) replay(panel);
    }
    tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { if (t.getAttribute('aria-selected') !== 'true') show(t, false); });
        t.addEventListener('keydown', function (e) {
            var n = -1;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
            else if (e.key === 'Home') n = 0;
            else if (e.key === 'End') n = tabs.length - 1;
            if (n > -1) { e.preventDefault(); show(tabs[n], true); }
        });
    });
})();
