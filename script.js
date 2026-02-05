// Particle Background with Mouse Interaction
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {x: canvas.width/2, y: canvas.height/2};

window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

let particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.2 - 0.1,
    dy: Math.random() * 0.2 - 0.1
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    // Move slightly towards mouse
    const distX = (mouse.x - p.x) * 0.0005;
    const distY = (mouse.y - p.y) * 0.0005;
    p.x += p.dx + distX;
    p.y += p.dy + distY;

    if (p.x > canvas.width) p.x = 0;
    if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    if (p.y < 0) p.y = canvas.height;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(50,100,200,0.15)'; // Darker particle
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Mesh / Grid behind wave
const meshCanvas = document.getElementById("mesh-canvas");
const meshCtx = meshCanvas.getContext("2d");

function drawMesh() {
  meshCtx.clearRect(0, 0, meshCanvas.width, meshCanvas.height);
  meshCtx.strokeStyle = "rgba(96,165,250,0.1)";
  meshCtx.lineWidth = 1;

  const step = 30;
  for (let x = 0; x < meshCanvas.width; x += step) {
    meshCtx.beginPath();
    meshCtx.moveTo(x, 0);
    meshCtx.lineTo(x, meshCanvas.height);
    meshCtx.stroke();
  }

  for (let y = 0; y < meshCanvas.height; y += step) {
    meshCtx.beginPath();
    meshCtx.moveTo(0, y);
    meshCtx.lineTo(meshCanvas.width, y);
    meshCtx.stroke();
  }

  requestAnimationFrame(drawMesh);
}
drawMesh();

// Micro-interactions for cards
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) translateY(0)";
  });
});

// Wave Animation (heartbeat effect)
const wave = document.getElementById("wave");
let waveDirection = 1;
setInterval(() => {
  const d1 = "M0 60 Q 75 20 150 60 T 300 60 T 450 60 T 600 60";
  const d2 = "M0 60 Q 75 100 150 60 T 300 60 T 450 60 T 600 60";
  wave.setAttribute("d", waveDirection > 0 ? d2 : d1);
  waveDirection *= -1;
}, 1500);
