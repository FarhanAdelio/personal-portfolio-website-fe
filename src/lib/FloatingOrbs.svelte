<script lang="ts">
	import { onMount } from 'svelte';

	let container: HTMLDivElement;
	let orbs: Array<{
		id: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		color: string;
	}> = [];

	onMount(() => {
		if (!container) return;

		// Create floating orbs
		const colors = [
			'rgba(100, 200, 255, 0.4)',
			'rgba(100, 200, 255, 0.3)',
			'rgba(150, 220, 255, 0.35)',
			'rgba(100, 180, 255, 0.25)',
		];

		orbs = Array.from({ length: 5 }, (_, i) => ({
			id: i,
			x: Math.random() * window.innerWidth,
			y: Math.random() * window.innerHeight,
			vx: (Math.random() - 0.5) * 0.3,
			vy: (Math.random() - 0.5) * 0.3,
			size: Math.random() * 150 + 100,
			color: colors[i % colors.length],
		}));

		const animate = () => {
			orbs = orbs.map((orb) => {
				let { x, y, vx, vy } = orb;

				x += vx;
				y += vy;

				// Bounce off walls with slight damping
				if (x < 0 || x > window.innerWidth) {
					vx *= -0.9;
					x = Math.max(0, Math.min(window.innerWidth, x));
				}
				if (y < 0 || y > window.innerHeight) {
					vy *= -0.9;
					y = Math.max(0, Math.min(window.innerHeight, y));
				}

				return { ...orb, x, y, vx, vy };
			});

			requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			// Reposition orbs on resize
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div bind:this={container} class="floating-orbs">
	{#each orbs as orb (orb.id)}
		<div
			class="orb"
			style="
				left: {orb.x}px;
				top: {orb.y}px;
				width: {orb.size}px;
				height: {orb.size}px;
				background: radial-gradient(circle at 30% 30%, {orb.color}, transparent 70%);
				box-shadow: 0 0 {orb.size * 0.8}px {orb.color};
			"
		/>
	{/each}
</div>

<style>
	.floating-orbs {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 2;
		overflow: hidden;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(40px);
		transition: none;
		mix-blend-mode: screen;
	}
</style>
