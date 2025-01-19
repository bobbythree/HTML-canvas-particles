const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.radius = Math.random() * 0.8 + 0.5;
    this.x = this.radius + Math.random() * (canvas.width - this.radius * 2);
    this.y = this.radius + Math.random() * (canvas.height - this.radius * 2);
    this.color = `hsl(${Math.random() * 360} 40% 60%)`;
    this.vx = Math.random() * -3 + 1.5;
    this.vy = Math.random() * -3 + 1.5;
  }
  draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.x = this.radius + Math.random() * (canvas.width - this.radius * 2);
    if (this.y < 0 || this.y > canvas.height) this.y = this.radius + Math.random() * (canvas.height - this.radius * 2);
  }
}

//fill the particles array
function initParticles() {
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }
}
initParticles();

function handleParticles() {
  for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
      particles[i].update();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate)
}
animate();