<script lang="ts">
	import { onMount } from 'svelte';
	
	let card: HTMLDivElement;
	let glare: HTMLDivElement;
	
	function handleMouseMove(e: MouseEvent) {
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;
		
		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
		
		if (glare) {
			glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`;
		}
	}
	
	function handleMouseLeave() {
		card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
	}
</script>

<div 
	class="tilt-card" 
	bind:this={card}
	on:mousemove={handleMouseMove}
	on:mouseleave={handleMouseLeave}
>
	<div class="glare" bind:this={glare}></div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.tilt-card {
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.1s ease;
		will-change: transform;
	}
	
	.glare {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		pointer-events: none;
		z-index: 1;
	}
	
	.content {
		position: relative;
		z-index: 2;
	}
</style>
