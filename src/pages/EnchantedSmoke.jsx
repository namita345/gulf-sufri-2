import React from 'react';

/**
 * Three-layer, procedural atmospheric smoke for Jinni's process scene.
 * The textured particles are rendered on Canvas rather than as SVG paths,
 * so wisps curl, overlap, thin out, and disperse instead of forming a beam.
 * All three canvases have no semantic or pointer interaction.
 */
const max = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const rand = (a, b) => a + Math.random() * (b - a);

function smokeTextures() {
  const textures = [];
  let seed = 912837;
  const next = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  for (let variant = 0; variant < 5; variant++) {
    const size = 128;
    const can = document.createElement('canvas');
    can.width = size; can.height = size;
    const ctx = can.getContext('2d');
    if (!ctx) continue;
    const image = ctx.createImageData(size, size);
    const layers = [8, 16, 32, 64].map(n => {
      const cells = new Float32Array((n + 1) * (n + 1));
      for (let i = 0; i < cells.length; i++) cells[i] = next();
      return { n, cells };
    });
    const noise = (x, y, layer) => {
      const gx = x / (size - 1) * layer.n, gy = y / (size - 1) * layer.n;
      const ix = Math.floor(gx), iy = Math.floor(gy);
      const sx = gx - ix, sy = gy - iy;
      const u = sx * sx * (3 - 2 * sx), v = sy * sy * (3 - 2 * sy);
      const at = (xx, yy) => layer.cells[yy * (layer.n + 1) + xx];
      const top = at(ix, iy) * (1 - u) + at(ix + 1, iy) * u;
      const bottom = at(ix, iy + 1) * (1 - u) + at(ix + 1, iy + 1) * u;
      return top * (1 - v) + bottom * v;
    };
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = (x - size / 2) / (size / 2), dy = (y - size / 2) / (size / 2);
        const r = Math.sqrt(dx * dx + dy * dy);
        const cloudNoise = noise(x, y, layers[0]) * .46 + noise(x, y, layers[1]) * .28 +
          noise(x, y, layers[2]) * .18 + noise(x, y, layers[3]) * .08;
        const irregularEdge = max((1.01 + (cloudNoise - .5) * .64 - r) / .45, 0, 1);
        const density = Math.pow(irregularEdge, 1.8) *
          max((cloudNoise - .28) * 2.1, 0, 1);
        const pos = (y * size + x) * 4;
        // Warm ivory with quiet champagne warmth, not fluorescent yellow.
        image.data[pos] = variant % 2 ? 233 : 244;
        image.data[pos + 1] = variant % 3 ? 226 : 234;
        image.data[pos + 2] = variant % 2 ? 201 : 222;
        image.data[pos + 3] = Math.round(density * 205);
      }
    }
    ctx.putImageData(image, 0, 0);
    textures.push(can);
  }
  return textures;
}

function makePuff(kind, sx, sy, age=0) {
  const life = kind === 'fog' ? rand(5.5, 9.0) : kind === 'cloud' ? rand(2.8, 5) : rand(2.5, 4.2);
  return {
    kind, x: sx + rand(-7, 7), y: sy + rand(-5, 5), age, life,
    drift: rand(-1, 1), wobble: rand(0, Math.PI * 2),
    spin: rand(-.28, .28), texture: Math.floor(rand(0, 5)),
    baseSize: kind === 'fog' ? rand(110, 215) : kind === 'cloud' ? rand(65, 135) : rand(30, 66),
    speed: kind === 'fog' ? rand(20, 62) : kind === 'cloud' ? rand(8, 25) : rand(22, 43),
    side: Math.random() < .5 ? -1 : 1,
    opacity: kind === 'fog' ? rand(.075, .135) : kind === 'cloud' ? rand(.105, .18) : rand(.095, .16),
    aspect: kind === 'fog' ? rand(.26, .5) : rand(.65, 1.08),
  };
}

function drawPuff(ctx, texture, p, scale, x, y, alpha) {
  if (alpha <= .002) return;
  const diameter = p.baseSize * (0.66 + scale * .83);
  ctx.save();
  ctx.globalAlpha = Math.min(.30, alpha);
  ctx.translate(x, y);
  ctx.rotate(p.spin + Math.sin(p.age * .9 + p.wobble) * .11);
  ctx.drawImage(texture, -diameter / 2, -diameter * p.aspect / 2,
    diameter, diameter * p.aspect);
  ctx.restore();
}

export default function EnchantedSmoke({ active, run, stageRef, lampRef, jinniRef }) {
  const rear = React.useRef(null);
  const front = React.useRef(null);
  const ground = React.useRef(null);

  React.useEffect(() => {
    if (!active || !stageRef.current || !lampRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const stage = stageRef.current;
    const backCanvas = rear.current;
    const frontCanvas = front.current;
    const groundCanvas = ground.current;
    if (!backCanvas || !frontCanvas || !groundCanvas) return;
    const back = backCanvas.getContext('2d', { alpha: true });
    const fore = frontCanvas.getContext('2d', { alpha: true });
    const floor = groundCanvas.getContext('2d', { alpha: true });
    if (!back || !fore || !floor) return;
    const textures = smokeTextures();
    if (!textures.length) return;
    const puffs = [];
    const MAX_PUFFS = 230;
    let raf = 0, last = 0, elapsed = 0, visible = true, stopped = false;
    let plumeBank = 0, cloudBank = 0, fogBank = 0;
    let w = 0, h = 0, fw = 0, fh = 0;
    let origin = {x: 90, y: 230};
    let cloudCenter = {x: 430, y: 226};
    let fogOrigin = {x: 180, y: 65};

    function fit(canvas, ctx) {
      const rect = canvas.getBoundingClientRect();
      const dpi = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.max(1, Math.round(rect.width * dpi));
      canvas.height = Math.max(1, Math.round(rect.height * dpi));
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
      return {w:rect.width,h:rect.height};
    }
    function measure() {
      const stageBox = stage.getBoundingClientRect();
      const lampBox = lampRef.current?.getBoundingClientRect();
      const jinniBox = jinniRef.current?.parentElement?.getBoundingClientRect();
      if (!stageBox.width || !lampBox) return;
      ({w,h} = fit(backCanvas, back));
      fit(frontCanvas, fore);
      const dims = fit(groundCanvas, floor);
      fw = dims.w; fh = dims.h;
      // Tip of the actual left-facing spout in the transparent lamp illustration.
      origin = {
        x: lampBox.left - stageBox.left + lampBox.width * .06,
        y: lampBox.top - stageBox.top + lampBox.height * .40,
      };
      cloudCenter = jinniBox ? {
        x: jinniBox.left - stageBox.left + jinniBox.width * .42,
        y: jinniBox.top - stageBox.top + jinniBox.height * .74,
      } : {x:w*.50,y:h*.67};
      const fogBox = groundCanvas.getBoundingClientRect();
      fogOrigin = {x:origin.x + stageBox.left - fogBox.left, y:fh*.67};
    }
    const start = performance.now();
    function spawn(kind) {
      if (puffs.length >= MAX_PUFFS) return;
      const pt = kind === 'plume' ? origin : kind === 'cloud' ? cloudCenter : fogOrigin;
      puffs.push(makePuff(kind, pt.x, pt.y));
    }

    function render(now) {
      raf = 0;
      if (stopped || !visible) return;
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, .055);
      last = now;
      elapsed = (now - start) / 1000;
      back.clearRect(0, 0, w, h);
      fore.clearRect(0, 0, w, h);
      floor.clearRect(0, 0, fw, fh);
      const emergence = max((elapsed - .25) / 1.25, 0, 1);
      const steady = elapsed > 4;
      plumeBank += dt * (steady ? 12 : 23) * emergence;
      cloudBank += dt * (steady ? 5 : 13) * max((elapsed - .8) / 1, 0, 1);
      fogBank += dt * (steady ? 13 : 32) * max((elapsed - .45) / 1, 0, 1);
      while (plumeBank >= 1) { spawn('plume'); plumeBank--; }
      while (cloudBank >= 1) { spawn('cloud'); cloudBank--; }
      while (fogBank >= 1) { spawn('fog'); fogBank--; }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.age += dt;
        const progress = p.age / p.life;
        if (progress >= 1) { puffs.splice(i, 1); continue; }
        const appear = Math.min(1, p.age / .45);
        const fade = Math.pow(Math.sin(Math.PI * progress), .75) * appear;
        const noise = Math.sin(elapsed*.9 + p.wobble + progress*5.2) *
          Math.sin(progress*9 + p.wobble*1.4);
        let x, y, opacity;
        if (p.kind === 'plume') {
          // A variable, drifting plume: buoyancy plus low-frequency curl.
          const curve = Math.pow(progress, 1.12);
          x = p.x + (cloudCenter.x - origin.x) * curve * .47 +
            p.drift * progress * 65 + noise * 33 * progress;
          y = p.y - progress * 140 +
            Math.sin(progress * 7 + p.wobble) * 15 * progress;
          opacity = p.opacity * fade * .9;
          drawPuff(back, textures[p.texture], p, progress, x, y, opacity);
        } else if (p.kind === 'cloud') {
          x = p.x + p.drift * progress * 55 + noise * progress * 35;
          y = p.y - p.speed * p.age + Math.sin(elapsed*.7+p.wobble)*7;
          opacity = p.opacity * fade * .83;
          drawPuff(back, textures[p.texture], p, progress, x, y, opacity);
          // Light fore-vapor masks only Jinni's lower tail, never her face.
          if (p.texture % 3 === 0) {
            drawPuff(fore, textures[p.texture], p, progress*.9,
              x + 4, y + 28, opacity * .72);
          }
        } else {
          // Low fog spreads laterally and hugs the bottom, like dry-ice vapor.
          x = p.x + p.side * p.speed * p.age +
            Math.sin(elapsed * .47 + p.wobble) * 12;
          y = Math.min(fh - 13, p.y + Math.sin(progress*6+p.wobble) * 5 + progress * 16);
          opacity = p.opacity * fade;
          drawPuff(floor, textures[p.texture], p, progress, x, y, opacity);
        }
      }
      raf = requestAnimationFrame(render);
    }
    function resume() { if (!raf && visible && !stopped) { last=0; raf=requestAnimationFrame(render); } }
    measure();
    const sizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    sizeObserver?.observe(stage);
    const intersectionObserver = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {visible = entry.isIntersecting; if (!visible && raf) {cancelAnimationFrame(raf);raf=0;} else resume();}, {rootMargin:'180px'})
      : null;
    intersectionObserver?.observe(stage);
    const visibilityChange = () => { if (document.hidden) {visible=false;cancelAnimationFrame(raf);raf=0;} else {visible=true;resume();} };
    document.addEventListener('visibilitychange',visibilityChange);
    window.addEventListener('resize',measure, {passive:true});
    resume();
    return () => {
      stopped=true;cancelAnimationFrame(raf);
      sizeObserver?.disconnect(); intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange',visibilityChange);
      window.removeEventListener('resize',measure);
    };
  }, [active, run, stageRef, lampRef, jinniRef]);

  return <>
    <canvas ref={rear} className="jrw-atmosphere jrw-atmosphere-back" aria-hidden="true" />
    <canvas ref={front} className="jrw-atmosphere jrw-atmosphere-front" aria-hidden="true" />
    <canvas ref={ground} className="jrw-atmosphere jrw-atmosphere-ground" aria-hidden="true" />
  </>;
}
