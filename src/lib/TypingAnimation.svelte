<script lang="ts">
	import { onMount } from 'svelte';
	
	export let texts: string[] = [];
	export let speed: number = 100;
	export let deleteSpeed: number = 50;
	export let delayBetween: number = 2000;
	
	let displayedText = '';
	let currentIndex = 0;
	let isDeleting = false;
	
	onMount(() => {
		let timeout: number;
		
		const type = () => {
			const currentText = texts[currentIndex];
			
			if (!isDeleting) {
				displayedText = currentText.substring(0, displayedText.length + 1);
				
				if (displayedText === currentText) {
					timeout = setTimeout(() => {
						isDeleting = true;
						type();
					}, delayBetween);
					return;
				}
			} else {
				displayedText = currentText.substring(0, displayedText.length - 1);
				
				if (displayedText === '') {
					isDeleting = false;
					currentIndex = (currentIndex + 1) % texts.length;
				}
			}
			
			timeout = setTimeout(type, isDeleting ? deleteSpeed : speed);
		};
		
		type();
		
		return () => clearTimeout(timeout);
	});
</script>

<span class="typing-text">
	{displayedText}<span class="cursor">|</span>
</span>

<style>
	.typing-text {
		display: inline-block;
		min-height: 1.2em;
	}
	
	.cursor {
		animation: blink 1s infinite;
		opacity: 1;
	}
	
	@keyframes blink {
		0%, 50% {
			opacity: 1;
		}
		51%, 100% {
			opacity: 0;
		}
	}
</style>
