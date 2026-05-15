<script lang="ts">
	import { onMount } from 'svelte';

	let element: HTMLDivElement;
	let mouseX = 0;
	let mouseY = 0;

	onMount(() => {
		if (!element) return;

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;

			const x = (mouseX / window.innerWidth) * 100;
			const y = (mouseY / window.innerHeight) * 100;

			element.style.setProperty('--gradient-x', `${x}%`);
			element.style.setProperty('--gradient-y', `${y}%`);
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div bind:this={element} class="animated-gradient" />

<style>
	.animated-gradient {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		background: radial-gradient(
			circle at var(--gradient-x, 50%) var(--gradient-y, 50%),
			rgba(100, 200, 255, 0.15) 0%,
			rgba(100, 200, 255, 0.08) 25%,
			transparent 60%
		);
		transition: background 0.08s ease-out;
		filter: blur(80px);
		box-shadow: inset 0 0 200px rgba(100, 200, 255, 0.1);
	}
</style>
