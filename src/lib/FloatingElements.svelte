<script lang="ts">
	import { onMount } from 'svelte';
	
	let elements: Array<{x: number, y: number, size: number, speed: number, symbol: string}> = [];
	
	const symbols = ['{ }', '< />', '[ ]', '( )', '=> ', 'fn', 'SQL', 'API', 'DB'];
	
	onMount(() => {
		// Create floating elements
		elements = Array.from({ length: 15 }, (_, i) => ({
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 20 + 10,
			speed: Math.random() * 20 + 10,
			symbol: symbols[Math.floor(Math.random() * symbols.length)]
		}));
	});
</script>

<div class="floating-container">
	{#each elements as el, i}
		<div 
			class="floating-element"
			style="
				left: {el.x}%;
				top: {el.y}%;
				font-size: {el.size}px;
				animation-duration: {el.speed}s;
				animation-delay: {i * -0.5}s;
			"
		>
			{el.symbol}
		</div>
	{/each}
</div>

<style>
	.floating-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}
	
	.floating-element {
		position: absolute;
		color: rgba(255, 255, 255, 0.03);
		font-weight: 600;
		font-family: 'Courier New', monospace;
		animation: float-up linear infinite;
	}
	
	@keyframes float-up {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 0.05;
		}
		90% {
			opacity: 0.05;
		}
		100% {
			transform: translateY(-100vh) rotate(360deg);
			opacity: 0;
		}
	}
</style>
