<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animationId: number;

	onMount(() => {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		let time = 0;
		let particles: Array<{
			x: number;
			y: number;
			vx: number;
			vy: number;
			life: number;
			maxLife: number;
			size: number;
		}> = [];

		const createParticle = () => {
			return {
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.5,
				vy: (Math.random() - 0.5) * 0.5,
				life: 1,
				maxLife: Math.random() * 300 + 200,
				size: Math.random() * 1.5 + 0.5
			};
		};

		// Initialize particles
		for (let i = 0; i < 38; i++) {
			particles.push(createParticle());
		}

		const drawGrid = () => {
			const gridSize = 80;
			const offsetX = (time * 5) % gridSize;
			const offsetY = (time * 3) % gridSize;

			ctx!.strokeStyle = 'rgba(100, 200, 255, 0.05)';
			ctx!.lineWidth = 0.6;

			// Vertical lines
			for (let x = -gridSize + offsetX; x < canvas.width; x += gridSize) {
				ctx!.beginPath();
				ctx!.moveTo(x, 0);
				ctx!.lineTo(x, canvas.height);
				ctx!.stroke();
			}

			// Horizontal lines
			for (let y = -gridSize + offsetY; y < canvas.height; y += gridSize) {
				ctx!.beginPath();
				ctx!.moveTo(0, y);
				ctx!.lineTo(canvas.width, y);
				ctx!.stroke();
			}
		};

		const drawParticles = () => {
			particles = particles.filter((p) => p.life > 0);

			// Add new particles occasionally
			if (Math.random() < 0.12 && particles.length < 50) {
				particles.push(createParticle());
			}

			particles.forEach((p) => {
				p.x += p.vx;
				p.y += p.vy;
				p.life -= 1;

				const alpha = (p.life / p.maxLife) * 0.6;
				ctx!.fillStyle = `rgba(100, 200, 255, ${alpha})`;
				ctx!.beginPath();
				ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx!.fill();
				
				// Add glow to particles
				ctx!.strokeStyle = `rgba(100, 200, 255, ${alpha * 0.35})`;
				ctx!.lineWidth = 0.4;
				ctx!.stroke();

				// Wrap around
				if (p.x < 0) p.x = canvas.width;
				if (p.x > canvas.width) p.x = 0;
				if (p.y < 0) p.y = canvas.height;
				if (p.y > canvas.height) p.y = 0;
			});
		};

		const drawDataLines = () => {
			ctx!.strokeStyle = `rgba(100, 200, 255, ${0.06 + Math.sin(time * 0.01) * 0.02})`;
			ctx!.lineWidth = 1;
			ctx!.shadowColor = 'rgba(100, 200, 255, 0.25)';
			ctx!.shadowBlur = 6;

			// Draw some diagonal lines that appear to be data flowing
			const lines = 6;
			for (let i = 0; i < lines; i++) {
				const startX = (time * 22 + i * 160) % (canvas.width + 200) - 200;
				const startY = (i * 90) % canvas.height;

				ctx!.beginPath();
				ctx!.moveTo(startX, startY);
				ctx!.lineTo(startX + 220, startY + 110);
				ctx!.stroke();
			}
			
			ctx!.shadowBlur = 0;
		};

		const animate = () => {
			// Clear with dark background
			ctx!.fillStyle = 'rgba(10, 10, 10, 0.02)';
			ctx!.fillRect(0, 0, canvas.width, canvas.height);

			drawGrid();
			drawParticles();
			drawDataLines();

			time += 0.016; // ~60fps

			animationId = requestAnimationFrame(animate);
		};

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener('resize', handleResize);
		animate();

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationId);
		};
	});
</script>

<canvas bind:this={canvas} class="futuristic-atmosphere" />

<style>
	.futuristic-atmosphere {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		opacity: 0.45;
	}
</style>
