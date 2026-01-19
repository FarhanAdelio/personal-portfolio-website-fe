<script lang="ts">
	import { onMount } from 'svelte';
	
	let cursorX = 0;
	let cursorY = 0;
	let followerX = 0;
	let followerY = 0;
	let isPointer = false;
	
	onMount(() => {
		const updateCursor = (e: MouseEvent) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
			
			// Check if hovering over interactive element
			const target = e.target as HTMLElement;
			isPointer = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') !== null || target.closest('button') !== null;
		};
		
		const animate = () => {
			followerX += (cursorX - followerX) * 0.15;
			followerY += (cursorY - followerY) * 0.15;
			requestAnimationFrame(animate);
		};
		
		window.addEventListener('mousemove', updateCursor);
		animate();
		
		return () => {
			window.removeEventListener('mousemove', updateCursor);
		};
	});
</script>

<div class="cursor" style="left: {cursorX}px; top: {cursorY}px;" class:active={isPointer}></div>
<div class="cursor-follower" style="left: {followerX}px; top: {followerY}px;" class:active={isPointer}></div>

<style>
	.cursor,
	.cursor-follower {
		position: fixed;
		pointer-events: none;
		z-index: 9999;
		mix-blend-mode: difference;
		transition: transform 0.2s ease;
	}
	
	.cursor {
		width: 10px;
		height: 10px;
		background: white;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	
	.cursor.active {
		transform: translate(-50%, -50%) scale(1.5);
	}
	
	.cursor-follower {
		width: 40px;
		height: 40px;
		border: 2px solid white;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	
	.cursor-follower.active {
		transform: translate(-50%, -50%) scale(1.5);
	}
	
	@media (max-width: 768px) {
		.cursor,
		.cursor-follower {
			display: none;
		}
	}
</style>
