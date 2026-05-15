<script lang="ts">
	export interface SkillProgress {
		name: string;
		level: number;
		icon?: string;
	}

	export let skills: SkillProgress[] = [];
	export let animated = true;

	let visible = false;

	// Intersection observer untuk trigger animation
	let container: HTMLDivElement;

	if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
				}
			},
			{ threshold: 0.1 }
		);

		// Will observe in mounted
	}
</script>

<div bind:this={container} class="skill-progress-container">
	{#each skills as skill, index (skill.name)}
		<div class="skill-item" class:animate={animated && visible} style="--delay: {index * 0.1}s">
			<div class="skill-header">
				<span class="skill-icon">{skill.icon || '✦'}</span>
				<span class="skill-name">{skill.name}</span>
				<span class="skill-value">{skill.level}%</span>
			</div>
			<div class="skill-bar-container">
				<div class="skill-bar-background">
					<div
						class="skill-bar-fill"
						style="--width: {skill.level}%; --delay: {index * 100}ms"
					>
						<div class="skill-bar-shine" />
					</div>
					<div class="skill-bar-glow" style="--width: {skill.level}%" />
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.skill-progress-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.skill-item {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		opacity: 0;
		animation: skillItemAppear 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
		animation-delay: var(--delay, 0);
	}

	.skill-item.animate {
		animation: skillItemAppear 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
	}

	@keyframes skillItemAppear {
		from {
			opacity: 0;
			transform: translateX(-20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.skill-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.95rem;
		font-weight: 600;
	}

	.skill-icon {
		font-size: 1.2rem;
		animation: iconPulse 2s ease-in-out infinite;
		animation-delay: var(--delay, 0);
	}

	@keyframes iconPulse {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.7;
		}
	}

	.skill-name {
		flex: 1;
		color: #e0e0e0;
	}

	.skill-value {
		color: rgba(100, 200, 255, 0.8);
		font-weight: 700;
		font-family: 'Courier New', monospace;
	}

	.skill-bar-container {
		position: relative;
		height: 8px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		overflow: hidden;
		border: 1px solid rgba(100, 200, 255, 0.15);
	}

	.skill-bar-background {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.skill-bar-fill {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		background: linear-gradient(90deg, rgba(100, 200, 255, 0.6) 0%, rgba(150, 220, 255, 0.8) 100%);
		border-radius: 10px;
		width: 0%;
		animation: progressFill 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
		animation-delay: var(--delay, 0);
	}

	@keyframes progressFill {
		from {
			width: 0%;
		}
		to {
			width: var(--width, 0%);
		}
	}

	.skill-bar-shine {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 20%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
		animation: shineMove 2s infinite;
		animation-delay: var(--delay, 0);
	}

	@keyframes shineMove {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	.skill-bar-glow {
		position: absolute;
		top: -2px;
		left: 0;
		height: 12px;
		width: 0%;
		background: rgba(100, 200, 255, 0.3);
		border-radius: 10px;
		filter: blur(4px);
		animation: progressFill 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
		animation-delay: var(--delay, 0);
		box-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
	}
</style>
