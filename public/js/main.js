(function () {
    var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var S = 'JavaScript // HTML // CSS // Python // C++ // Informatica // Desarrollo web // ';
    document.querySelectorAll('.trk').forEach(function (t) { t.innerHTML = ('<span>' + S + '</span>').repeat(4); });

    var W = ['Programador', 'Desarrollador web', 'Programador indie', 'Universitario'], wi = 0, ci = 0, del = false, ty = document.getElementById('ty');
    function type() {
        var w = W[wi];
        if (rm) { ty.textContent = w; return; }
        ty.textContent = w.slice(0, ci);
        var t = del ? 40 : 90;
        if (!del && ci === w.length) { del = true; t = 1500; }
        else if (del && ci === 0) { del = false; wi = (wi + 1) % W.length; t = 350; }
        else ci += del ? -1 : 1;
        setTimeout(type, t);
    }
    if (ty) type();

    var cv = document.getElementById('net'), cx = cv.getContext('2d'), w, h, P = [], m = { x: -999, y: -999 };
    var cols = ['#12F7D6', '#12F7D6', '#12F7D6', '#7C5CFF', '#FF3D9A'];
    function size() {
        var d = window.devicePixelRatio || 1; w = innerWidth; h = innerHeight;
        cv.width = w * d; cv.height = h * d; cx.setTransform(d, 0, 0, d, 0, 0);
        var n = Math.min(120, Math.round(w * h / 13000));
        P = []; for (var i = 0; i < n; i++)P.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .55, vy: (Math.random() - .5) * .55, r: Math.random() * 1.8 + .9, c: cols[Math.random() * cols.length | 0] });
        if (rm) draw();
    }
    function line(a, bx, by, al, c) { cx.strokeStyle = c; cx.globalAlpha = al; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(bx, by); cx.stroke(); }
    function draw() {
        cx.clearRect(0, 0, w, h);
        for (var i = 0; i < P.length; i++) {
            var a = P[i];
            if (!rm) {
                a.x += a.vx; a.y += a.vy;
                if (a.x < 0 || a.x > w) a.vx *= -1;
                if (a.y < 0 || a.y > h) a.vy *= -1;
                var dx = a.x - m.x, dy = a.y - m.y, dd = Math.hypot(dx, dy) || 1;
                if (dd < 150) { a.x += dx / dd * 1.4; a.y += dy / dd * 1.4; }
            }
            for (var j = i + 1; j < P.length; j++) {
                var b = P[j], d = Math.hypot(a.x - b.x, a.y - b.y);
                if (d < 135) line(a, b.x, b.y, (1 - d / 135) * .5, a.c);
            }
            var dm = Math.hypot(a.x - m.x, a.y - m.y);
            if (dm < 200) line(a, m.x, m.y, (1 - dm / 200) * .8, '#ffffff');
            cx.globalAlpha = 1; cx.fillStyle = a.c; cx.shadowColor = a.c; cx.shadowBlur = 12;
            cx.beginPath(); cx.arc(a.x, a.y, a.r, 0, 7); cx.fill(); cx.shadowBlur = 0;
        }
        if (!rm) requestAnimationFrame(draw);
    }
    size(); addEventListener('resize', size);
    if (!rm) draw();

    var hero = document.getElementById('hero') || document.createElement('div');
    addEventListener('mousemove', function (e) {
        m.x = e.clientX; m.y = e.clientY;
        hero.style.setProperty('--mx', (e.clientX / innerWidth - .5) * 2);
        hero.style.setProperty('--my', (e.clientY / innerHeight - .5) * 2);
    });
    addEventListener('mouseleave', function () { m.x = m.y = -999; });
    var fb = document.querySelectorAll('.fl button'), cards = document.querySelectorAll('.pcard');
    fb.forEach(function (b) {
        b.addEventListener('click', function () {
            fb.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
            cards.forEach(function (c, i) { var ok = b.dataset.y === 'all' || c.dataset.year === b.dataset.y; c.hidden = !ok; c.style.setProperty('--i', i); });
        });
    });
    cards.forEach(function (c) { c.addEventListener('mousemove', function (e) { var r = c.getBoundingClientRect(); c.style.setProperty('--x', (e.clientX - r.left) + 'px'); c.style.setProperty('--y', (e.clientY - r.top) + 'px'); }); });
})();
