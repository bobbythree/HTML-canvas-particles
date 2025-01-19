const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.radius = Math.random() * 2;
    this.x = this.radius + Math.random() * (canvas.width - this.radius * 2);
    this.y = this.radius + Math.random() * (canvas.height - this.radius * 2);
    this.color = `hsl(${Math.random() * 360} 40%, 60%)`;
    this.vx = Math.random() * -3 + 1.5;
    this.vy = Math.random() * -3 + 1.5;
    this.active = false;
  }
  draw() {
    if(this.active === false) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      this.active = true;
    }
    
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
    if (this.radius > .02) {
      this.radius -= Math.random() * .005;
    }
    this.active = false;
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
    if(!particles[i].active) {
      particles[i].draw();
      particles[i].update();
    }
    
  }
}

function animate() {
  ctx.fillStyle = 'rgba(24, 24, 24, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  requestAnimationFrame(animate)
}
animate();