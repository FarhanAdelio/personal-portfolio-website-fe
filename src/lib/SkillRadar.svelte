<script lang="ts">
	import { onMount } from 'svelte';
	
	export let skills: Array<{name: string, level: number}> = [];
	
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let animationFrame: number;
	let currentLevels: number[] = [];
	
	onMount(() => {
		ctx = canvas.getContext('2d')!;
		currentLevels = skills.map(() => 0);
		
		const resizeCanvas = () => {
			const size = Math.min(window.innerWidth * 0.4, 400);
			canvas.width = size;
			canvas.height = size;
		};
		
		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);
		
		animate();
		
		return () => {
			window.removeEventListener('resize', resizeCanvas);
			cancelAnimationFrame(animationFrame);
		};
	});
	
	function animate() {
		// Animate levels
		currentLevels = currentLevels.map((current, i) => {
			const target = skills[i].level;
			return current + (target - current) * 0.05;
		});
		
		drawRadar();
		animationFrame = requestAnimationFrame(animate);
	}
	
	function drawRadar() {
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const maxRadius = Math.min(centerX, centerY) - 40;
		const levels = 5;
		const angleStep = (Math.PI * 2) / skills.length;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Draw background levels
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
		ctx.lineWidth = 1;
		for (let i = 1; i <= levels; i++) {
			ctx.beginPath();
			const radius = (maxRadius / levels) * i;
			for (let j = 0; j <= skills.length; j++) {
				const angle = angleStep * j - Math.PI / 2;
				const x = centerX + Math.cos(angle) * radius;
				const y = centerY + Math.sin(angle) * radius;
				if (j === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.stroke();
		}
		
		// Draw axes
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
		skills.forEach((_, i) => {
			const angle = angleStep * i - Math.PI / 2;
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.lineTo(
				centerX + Math.cos(angle) * maxRadius,
				centerY + Math.sin(angle) * maxRadius
			);
			ctx.stroke();
		});
		
		// Draw skill polygon
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		currentLevels.forEach((level, i) => {
			const angle = angleStep * i - Math.PI / 2;
			const radius = (maxRadius * level) / 100;
			const x = centerX + Math.cos(angle) * radius;
			const y = centerY + Math.sin(angle) * radius;
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		});
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		// Draw labels
		ctx.fillStyle = '#fff';
		ctx.font = '12px -apple-system, sans-serif';
		ctx.textAlign = 'center';
		skills.forEach((skill, i) => {
			const angle = angleStep * i - Math.PI / 2;
			const labelRadius = maxRadius + 25;
			const x = centerX + Math.cos(angle) * labelRadius;
			const y = centerY + Math.sin(angle) * labelRadius;
			ctx.fillText(skill.name, x, y);
		});
	}
</script>

<div class="radar-container">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.radar-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2rem;
	}
	
	canvas {
		max-width: 100%;
		height: auto;
	}
</style>
