<script lang="ts">
	import { onMount } from 'svelte';
	
	export let stats: Array<{label: string, value: number, suffix?: string}> = [];
	
	let animated = false;
	let displayValues: number[] = [];
	
	onMount(() => {
		displayValues = stats.map(() => 0);
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !animated) {
					animated = true;
					animateCounters();
				}
			});
		}, { threshold: 0.5 });
		
		const element = document.querySelector('.stats-container');
		if (element) observer.observe(element);
		
		return () => observer.disconnect();
	});
	
	function animateCounters() {
		stats.forEach((stat, index) => {
			let current = 0;
			const increment = stat.value / 60; // 1 second animation
			const timer = setInterval(() => {
				current += increment;
				if (current >= stat.value) {
					displayValues[index] = stat.value;
					clearInterval(timer);
				} else {
					displayValues[index] = Math.floor(current);
				}
			}, 16);
		});
	}
</script>

<div class="stats-container">
	{#each stats as stat, i}
		<div class="stat-item">
			<div class="stat-value">
				{displayValues[i] || 0}{stat.suffix || ''}
			</div>
			<div class="stat-label">{stat.label}</div>
		</div>
	{/each}
</div>

<style>
	.stats-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 2rem;
		padding: 3rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 16px;
		backdrop-filter: blur(10px);
	}
	
	.stat-item {
		text-align: center;
	}
	
	.stat-value {
		font-size: 3rem;
		font-weight: 800;
		background: linear-gradient(135deg, #fff 0%, #999 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 0.5rem;
	}
	
	.stat-label {
		color: #666;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}
	
	@media (max-width: 768px) {
		.stats-container {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.5rem;
			padding: 2rem;
		}
		
		.stat-value {
			font-size: 2rem;
		}
	}
</style>
