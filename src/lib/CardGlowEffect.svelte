<script lang="ts">
	import { onMount } from 'svelte';

	let glowElement: HTMLDivElement;
	let mouseX = 0;
	let mouseY = 0;

	onMount(() => {
		if (!glowElement) return;

		const handleMouseMove = (e: MouseEvent) => {
			const rect = glowElement.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;

			glowElement.style.setProperty('--glow-x', `${mouseX}px`);
			glowElement.style.setProperty('--glow-y', `${mouseY}px`);
		};

		glowElement.addEventListener('mousemove', handleMouseMove);
		glowElement.addEventListener('mouseenter', () => {
			glowElement.style.opacity = '1';
		});
		glowElement.addEventListener('mouseleave', () => {
			glowElement.style.opacity = '0';
		});

		return () => {
			glowElement.removeEventListener('mousemove', handleMouseMove);
			glowElement.removeEventListener('mouseenter', () => {});
			glowElement.removeEventListener('mouseleave', () => {});
		};
	});
</script>

<div bind:this={glowElement} class="card-glow-effect">
	<slot />
</div>

<style>
	.card-glow-effect {
		position: relative;
		overflow: hidden;
		transition: opacity 0.3s ease;
		opacity: 0;

		--glow-x: 0px;
		--glow-y: 0px;
	}

	.card-glow-effect::before {
		content: '';
		position: absolute;
		top: var(--glow-y, 0);
		left: var(--glow-x, 0);
		width: 150px;
		height: 150px;
		background: radial-gradient(circle, rgba(100, 200, 255, 0.3) 0%, transparent 70%);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 1;
		filter: blur(30px);
	}
</style>
