<script lang="ts">
	import { onMount } from 'svelte';
	
	let mounted = false;
	
	onMount(() => {
		mounted = true;
	});
</script>

<div class="animated-bg">
	<div class="gradient gradient-1"></div>
	<div class="gradient gradient-2"></div>
	<div class="gradient gradient-3"></div>
	<div class="mesh-overlay"></div>
</div>

<style>
	.animated-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		overflow: hidden;
		background: #0a0a0a;
	}
	
	.gradient {
		position: absolute;
		filter: blur(100px);
		opacity: 0.15;
		animation: float 20s ease-in-out infinite;
	}
	
	.gradient-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
		top: -10%;
		left: -10%;
		animation-delay: 0s;
	}
	
	.gradient-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
		top: 50%;
		right: -10%;
		animation-delay: -7s;
	}
	
	.gradient-3 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
		bottom: -20%;
		left: 30%;
		animation-delay: -14s;
	}
	
	.mesh-overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: 
			linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
		background-size: 50px 50px;
		opacity: 0.5;
	}
	
	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}
</style>
