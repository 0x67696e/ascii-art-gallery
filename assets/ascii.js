/* Tiny ASCII grid renderer + player shared by every animated piece.
   A piece is { title, frame(grid, t, dt), init?(grid), bg?, cols?, embedCols? }.
   Open a piece with ?embed to get the gallery thumbnail mode (no overlay, 24 fps). */
(function () {
  "use strict";
  const EMBED = /[?&]embed\b/.test(location.search);

  function Grid(cv, targetCols) {
    this.cv = cv;
    this.ctx = cv.getContext("2d", { alpha: false });
    this.targetCols = targetCols;
    this.cache = new Map();
    this.resize();
  }
  Grid.prototype.resize = function () {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = innerWidth; this.H = innerHeight;
    this.cv.width = Math.round(this.W * dpr); this.cv.height = Math.round(this.H * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.cw = Math.max(3.4, this.W / this.targetCols);
    this.ch = this.cw * 1.85;
    this.cols = Math.ceil(this.W / this.cw);
    this.rows = Math.ceil(this.H / this.ch);
    const N = (this.N = this.cols * this.rows);
    this.c = new Uint16Array(N);
    this.r = new Float32Array(N); this.g = new Float32Array(N); this.b = new Float32Array(N);
    this.z = new Float32Array(N);
    this.font = `${(this.cw / 0.6).toFixed(2)}px ui-monospace, Menlo, Consolas, "DejaVu Sans Mono", monospace`;
  };
  Grid.prototype.clear = function () { this.c.fill(0); this.z.fill(1e9); };
  Grid.prototype.set = function (x, y, ch, r, g, b) {
    x |= 0; y |= 0;
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return -1;
    const i = y * this.cols + x;
    this.c[i] = typeof ch === "number" ? ch : ch.charCodeAt(0);
    this.r[i] = r; this.g[i] = g; this.b[i] = b;
    return i;
  };
  Grid.prototype.color = function (r, g, b) {
    const q = v => Math.max(0, Math.min(31, (v * 31 + 0.5) | 0));
    const k = (q(r) << 10) | (q(g) << 5) | q(b);
    let s = this.cache.get(k);
    if (!s) { s = `rgb(${(q(r) * 8.23) | 0},${(q(g) * 8.23) | 0},${(q(b) * 8.23) | 0})`; this.cache.set(k, s); }
    return s;
  };
  Grid.prototype.render = function (bg) {
    const ctx = this.ctx, cols = this.cols;
    ctx.fillStyle = bg || "#05070d";
    ctx.fillRect(0, 0, this.W, this.H);
    ctx.font = this.font; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    let last = "";
    for (let y = 0; y < this.rows; y++) {
      const yy = (y + 0.5) * this.ch;
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x, k = this.c[i];
        if (!k || k === 32) continue;
        const s = this.color(this.r[i], this.g[i], this.b[i]);
        if (s !== last) { ctx.fillStyle = s; last = s; }
        ctx.fillText(String.fromCharCode(k), (x + 0.5) * this.cw, yy);
      }
    }
  };

  function play(piece) {
    const cv = document.createElement("canvas");
    cv.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;display:block";
    document.body.appendChild(cv);
    const grid = new Grid(cv, EMBED ? piece.embedCols || 100 : piece.cols || 170);

    if (!EMBED) {
      const a = document.createElement("a");
      a.className = "back"; a.href = "../"; a.textContent = "← Gallery";
      const h = document.createElement("span");
      h.className = "title"; h.textContent = piece.title;
      document.body.append(a, h);
    }

    piece.init && piece.init(grid);
    addEventListener("resize", () => { grid.resize(); piece.init && piece.init(grid); });

    let paused = false;
    addEventListener("message", e => { if (e.data && typeof e.data.play === "boolean") paused = !e.data.play; });

    const minDt = 1000 / (EMBED ? 24 : 45);
    let last = 0, prev = 0, clock = 0;
    function loop(now) {
      requestAnimationFrame(loop);
      if (paused || now - last < minDt - 2) { if (paused) last = now; return; }
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 1 / 45;
      last = now; clock += dt;
      grid.clear();
      piece.frame(grid, clock, dt);
      grid.render(piece.bg);
    }
    requestAnimationFrame(loop);
  }

  window.Ascii = { Grid, play, embed: EMBED };
})();
