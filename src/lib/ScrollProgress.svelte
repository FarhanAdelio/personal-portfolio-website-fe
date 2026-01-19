<script lang="ts">
	import { onMount } from 'svelte';
	
	let scrollProgress = 0;
	
	onMount(() => {
		const updateProgress = () => {
			const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrolled = (window.scrollY / windowHeight) * 100;
			scrollProgress = Math.min(scrolled, 100);
		};
		
		window.addEventListener('scroll', updateProgress);
		updateProgress();
		
		return () => window.removeEventListener('scroll', updateProgress);
	});
</script>

<div class="scroll-progress">
	<div class="progress-bar" style="width: {scrollProgress}%"></div>
</div>

<style>
	.scroll-progress {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: rgba(255, 255, 255, 0.1);
		z-index: 9999;
	}
	
	.progress-bar {
		height: 100%;
		background: linear-gradient(90deg, #fff, #999);
		transition: width 0.1s ease-out;
	}
</style>
