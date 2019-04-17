<template>
  <!--404页面-->
  <div class="flex-column container">
    <canvas id="page-not-found-canvas"></canvas>
    <header class="page-not-found-header">
      <h1>Page not found</h1>
      <p>Hmmmm... didn't work out like you'd hoped?</p>
      <router-link to="/" class="to-home">Take me home</router-link>
    </header>
  </div>
</template>

<script>
  import config from '../../config';
  import {Util} from '../../utils';

  const W = window.innerWidth;
  const H = window.innerHeight;
  const particleCount = 150;
  const minDist = 70;

  function Particle(ctx) {
    if (!ctx) {return;}
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = -1 + Math.random() * 2;
    this.vy = -1 + Math.random() * 2;
    this.radius = 4;
    this.draw = function () {
      ctx.fillStyle = `rgb(${config.style.colorRbg})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      return ctx.fill();
    };
  }

  export default {
    name: 'notFound',
    data() {
      return {};
    },
    mounted() {
      this.render();
    },
    beforeDestroy() {
      Util.cancelAnimationFrame()(this.animationId);
    },
    methods: {
      render() {
        const canvas = document.querySelector('#page-not-found-canvas');
        if (!canvas) {return;}
        canvas.width = W;
        canvas.height = H;
        this.ctx = canvas.getContext('2d');
        this.particles = Array(particleCount).fill('').map(() => new Particle(this.ctx));
        this.animationLoop();
      },
      animationLoop() {
        this.draw();
        this.animationId = Util.requestAnimationFrame()(this.animationLoop);
      },
      draw() {
        this.ctx.fillStyle = config.style.background;
        this.ctx.fillRect(0, 0, W, H);
        return this.particles.map((v, ii) => {
          v.draw(this.ctx);
          v.x += v.vx;
          v.y += v.vy;
          if (v.x + v.radius > W) {
            v.x = v.radius;
          } else {
            if (v.x - v.radius < 0) {
              v.x = W - v.radius;
            }
          }
          if (v.y + v.radius > H) {
            v.y = v.radius;
          } else {
            if (v.y - v.radius < 0) {
              v.y = H - v.radius;
            }
          }
          let j = ii + 1;
          while (j < particleCount) {
            const p2 = this.particles[j];
            this.setDistance(v, p2);
            j++;
          }
          return ii;
        });
      },
      setDistance(p1, p2) {
        let ax = 0;
        let ay = 0;
        let dx = p1.x - p2.x;
        let dy = p1.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= minDist) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(${config.style.colorRbg}, ${1.2 - dist / minDist})`;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
          this.ctx.closePath();
          ax = dx / 2000;
          ay = dy / 2000;
          p1.vx -= ax;
          p1.vy -= ay;
          p2.vx += ax;
          p2.vy += ay;
        }
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../style/_variable";
  .container {
    height: 100vh;
    overflow: hidden;
    #page-not-found-canvas {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .page-not-found-header {
      margin-top: 15vh;
      z-index: 1;
      h1 {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: -1px;
        line-height: 1;
        color: #444;
      }
      p {
        margin-bottom: 18px;
        font-weight: 300;
        font-size: .5rem;
        line-height: 1.6;
        color: #333;
      }
      .to-home {
        color: #0088cc;
        text-decoration: none;
        font-size: .8rem;
        font-weight: 300;
      }
    }
  }
</style>
