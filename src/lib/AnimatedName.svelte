<script lang="ts">
	import { onMount } from 'svelte';
	
	export let name: string = '';
	
	let letters: string[] = [];
	let mounted = false;
	
	$: {
		letters = name.split('');
	}
	
	onMount(() => {
		mounted = true;
	});
</script>

<div class="animated-name">
	{#each letters as letter, i}
		<span 
			class="letter" 
			class:mounted
			style="animation-delay: {i * 0.05}s"
		>
			{letter === ' ' ? '\u00A0' : letter}
		</span>
	{/each}
</div>

<style>
	.animated-name {
		display: inline-block;
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 800;
		letter-spacing: -1px;
		line-height: 1.2;
		position: relative;
		perspective: 1000px;
	}
	
	.letter {
		display: inline-block;
		opacity: 0;
		transform: translateY(30px) rotateX(-90deg);
		animation: none;
		background: linear-gradient(135deg, #fff 0%, #999 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
		filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0));
		transition: filter 0.3s ease;
	}
	
	.letter.mounted {
		animation: buildUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
	}
	
	.animated-name:hover .letter {
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
	}
	
	@keyframes buildUp {
		0% {
			opacity: 0;
			transform: translateY(40px) rotateX(-90deg) scale(0.8);
			filter: blur(10px) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
		}
		50% {
			opacity: 0.7;
			filter: blur(5px) drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
		}
		100% {
			opacity: 1;
			transform: translateY(0) rotateX(0) scale(1);
			filter: blur(0) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2));
		}
	}
	
	/* Individual letter hover effect */
	.letter:hover {
		animation: letterBounce 0.5s ease-in-out;
		filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6));
	}
	
	@keyframes letterBounce {
		0%, 100% {
			transform: translateY(0) scale(1);
		}
		50% {
			transform: translateY(-8px) scale(1.1);
		}
	}
</style>
