<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	
	let loading = true;
	let progress = 0;
	
	onMount(() => {
		const interval = setInterval(() => {
			progress += Math.random() * 30;
			if (progress >= 100) {
				progress = 100;
				clearInterval(interval);
				setTimeout(() => {
					loading = false;
				}, 500);
			}
		}, 200);
		
		return () => clearInterval(interval);
	});
</script>

{#if loading}
	<div class="loading-screen" transition:fade={{ duration: 800 }}>
		<div class="loading-content">
			<div class="logo">
				<div class="code-brackets">
					<span class="bracket left">{'<'}</span>
					<span class="name">FA</span>
					<span class="bracket right">{'/>'}</span>
				</div>
			</div>
			<div class="loading-text">Loading Portofolio...</div>
			<div class="progress-bar">
				<div class="progress-fill" style="width: {progress}%"></div>
			</div>
			<div class="progress-percentage">{Math.floor(progress)}%</div>
		</div>
		<div class="particles-loading">
			{#each Array(20) as _, i}
				<div class="particle" style="
					left: {Math.random() * 100}%;
					animation-delay: {i * 0.1}s;
					animation-duration: {2 + Math.random() * 3}s;
				"></div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		background: #0a0a0a;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	
	.loading-content {
		text-align: center;
		z-index: 10001;
	}
	
	.logo {
		margin-bottom: 3rem;
		animation: float 3s ease-in-out infinite;
	}
	
	.code-brackets {
		font-size: 4rem;
		font-weight: 800;
		font-family: 'Courier New', monospace;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	
	.bracket {
		color: #666;
		animation: pulse 2s ease-in-out infinite;
	}
	
	.bracket.left {
		animation-delay: 0s;
	}
	
	.bracket.right {
		animation-delay: 0.5s;
	}
	
	.name {
		background: linear-gradient(135deg, #fff 0%, #999 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: glow 2s ease-in-out infinite;
	}
	
	.loading-text {
		font-size: 1.2rem;
		color: #666;
		margin-bottom: 2rem;
		letter-spacing: 2px;
	}
	
	.progress-bar {
		width: 300px;
		height: 4px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
		overflow: hidden;
		margin: 0 auto 1rem;
	}
	
	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #fff, #666);
		border-radius: 2px;
		transition: width 0.3s ease;
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
	}
	
	.progress-percentage {
		font-size: 0.9rem;
		color: #999;
		font-family: 'Courier New', monospace;
	}
	
	.particles-loading {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
	
	.particle {
		position: absolute;
		width: 2px;
		height: 2px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		animation: rise linear infinite;
	}
	
	@keyframes float {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}
	
	@keyframes pulse {
		0%, 100% {
			opacity: 0.5;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.1);
		}
	}
	
	@keyframes glow {
		0%, 100% {
			filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
		}
		50% {
			filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
		}
	}
	
	@keyframes rise {
		from {
			transform: translateY(100vh) scale(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		to {
			transform: translateY(-100vh) scale(1);
			opacity: 0;
		}
	}
</style>
