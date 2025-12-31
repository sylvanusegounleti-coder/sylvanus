const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let fireworks = [], particles = [];
let cw, ch;

function setup() {
  cw = window.innerWidth;
  ch = window.innerHeight;
  canvas.width = cw;
  canvas.height = ch;
}

class Firework {
  constructor() {
    this.x = Math.random() * cw;
    this.y = ch;
    this.targetY = Math.random() * ch / 2;
    this.speed = 3 + Math.random() * 2;
    this.color = `hsl(${Math.random() * 360},100%,50%)`;
    this.exploded = false;
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY && !this.exploded) {
      this.exploded = true;
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(this.x, this.y, this.color));
      }
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
ctx.fill();
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.alpha = 1;
    this.color = color;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function loop() {
  ctx.clearRect(0, 0, cw, ch);
  if (fireworks.length < 10) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.exploded) fireworks.splice(i, 1);
  });

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(loop);
}

window.addEventListener("resize", setup);
setup();
loop();
