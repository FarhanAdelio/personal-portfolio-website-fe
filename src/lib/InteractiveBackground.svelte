<script lang="ts">
	import { onMount } from 'svelte';
	
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let animationFrame: number;
	
	class Particle {
		x: number;
		y: number;
		size: number;
		speedX: number;
		speedY: number;
		opacity: number;
		
		constructor(width: number, height: number) {
			this.x = Math.random() * width;
			this.y = Math.random() * height;
			this.size = Math.random() * 2 + 0.5;
			this.speedX = (Math.random() - 0.5) * 0.5;
			this.speedY = (Math.random() - 0.5) * 0.5;
			this.opacity = Math.random() * 0.5 + 0.2;
		}
		
		update(width: number, height: number) {
			this.x += this.speedX;
			this.y += this.speedY;
			
			if (this.x > width) this.x = 0;
			if (this.x < 0) this.x = width;
			if (this.y > height) this.y = 0;
			if (this.y < 0) this.y = height;
		}
		
		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	
	onMount(() => {
		ctx = canvas.getContext('2d')!;
		resizeCanvas();
		
		// Create particles
		const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
		for (let i = 0; i < particleCount; i++) {
			particles.push(new Particle(canvas.width, canvas.height));
		}
		
		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			
			particles.forEach(particle => {
				particle.update(canvas.width, canvas.height);
				particle.draw(ctx);
			});
			
			// Draw connections
			particles.forEach((p1, i) => {
				particles.slice(i + 1).forEach(p2 => {
					const dx = p1.x - p2.x;
					const dy = p1.y - p2.y;
					const distance = Math.sqrt(dx * dx + dy * dy);
					
					if (distance < 100) {
						ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
						ctx.lineWidth = 0.5;
						ctx.beginPath();
						ctx.moveTo(p1.x, p1.y);
						ctx.lineTo(p2.x, p2.y);
						ctx.stroke();
					}
				});
			});
			
			animationFrame = requestAnimationFrame(animate);
		};
		
		animate();
		
		window.addEventListener('resize', resizeCanvas);
		
		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', resizeCanvas);
		};
	});
	
	function resizeCanvas() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
</script>

<canvas bind:this={canvas} class="particle-canvas"></canvas>

<style>
	.particle-canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		opacity: 0.3;
	}
</style>
