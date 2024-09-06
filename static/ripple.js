class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 0;
      this.maxRadius = 100;
      this.speed = 5;
      this.opacity = 1;
    }
  
    update() {
      if (this.radius < this.maxRadius) {
        this.radius += this.speed;
        this.opacity -= 1 / (this.maxRadius / this.speed);
      }
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(25, 25, 255, ${this.opacity})`;
      ctx.stroke();
    }
  
    isFaded() {
      return this.opacity <= 0;
    }
  }
  
  const canvas = document.getElementById('rippleCanvas');
  const ctx = canvas.getContext('2d');
  let ripples = [];
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ripples = ripples.filter(ripple => {
      ripple.update();
      ripple.draw(ctx);
      return !ripple.isFaded(); // Only keep ripples that haven't fully faded
    });
    
    requestAnimationFrame(animate);
  }
  
  function createRipple(x, y) {
    ripples.push(new Ripple(x, y));
  }
  
  // Add event listeners for both mouse and touch interactions
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (e) => createRipple(e.clientX, e.clientY));
  window.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling on touch
    const touch = e.touches[0];
    createRipple(touch.clientX, touch.clientY);
  }, { passive: false }); // Disable passive listener for touchmove
  
  resizeCanvas();
  animate();
  