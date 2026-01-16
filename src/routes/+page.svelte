<script lang="ts">
	import { onMount } from 'svelte';
	import { api } from '$lib/api';
	import type { Profile } from '$lib/types';
	
	export let data;
</script>

<svelte:head>
	<title>{data.profile?.name || 'Personal Website'}</title>
	<meta name="description" content="Personal website dan portfolio" />
</svelte:head>

<div class="container">
	<!-- Hero Section -->
	<section class="hero">
		<div class="hero-content">
			{#if data.profile}
				<img src={data.profile.avatar} alt={data.profile.name} class="avatar" />
				<h1>{data.profile.name}</h1>
				<p class="title">{data.profile.title}</p>
				<p class="bio">{data.profile.bio}</p>
				
				<div class="social-links">
					{#if data.profile.social.github}
						<a href={data.profile.social.github} target="_blank" rel="noopener">GitHub</a>
					{/if}
					{#if data.profile.social.linkedin}
						<a href={data.profile.social.linkedin} target="_blank" rel="noopener">LinkedIn</a>
					{/if}
					{#if data.profile.social.twitter}
						<a href={data.profile.social.twitter} target="_blank" rel="noopener">Twitter</a>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<!-- Navigation -->
	<nav>
		<a href="#about">About</a>
		<a href="#experience">Experience</a>
		<a href="#education">Education</a>
		<a href="#skills">Skills</a>
		<a href="#projects">Projects</a>
		<a href="#contact">Contact</a>
	</nav>

	<!-- Experience Section -->
	<section id="experience" class="section">
		<h2>Work Experience</h2>
		{#if data.experiences}
			<div class="timeline">
				{#each data.experiences as exp}
					<div class="timeline-item">
						<div class="timeline-header">
							<h3>{exp.position}</h3>
							<span class="company">{exp.company}</span>
						</div>
						<div class="timeline-meta">
							<span>{exp.startDate} - {exp.endDate}</span>
							<span>{exp.location}</span>
						</div>
						<p>{exp.description}</p>
						<div class="tech-tags">
							{#each exp.technologies as tech}
								<span class="tag">{tech}</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Skills Section -->
	<section id="skills" class="section">
		<h2>Skills</h2>
		{#if data.skills}
			<div class="skills-grid">
				<div class="skill-category">
					<h3>Technical Skills</h3>
					{#each data.skills.technical as skill}
						<div class="skill-item">
							<span>{skill.name}</span>
							<div class="skill-bar">
								<div class="skill-level" style="width: {skill.level}%"></div>
							</div>
						</div>
					{/each}
				</div>
				
				<div class="skill-category">
					<h3>Tools</h3>
					<div class="tag-list">
						{#each data.skills.tools as tool}
							<span class="tag">{tool}</span>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</section>

	<!-- Projects Section -->
	<section id="projects" class="section">
		<h2>Projects</h2>
		{#if data.projects}
			<div class="projects-grid">
				{#each data.projects as project}
					<div class="project-card">
						<img src={project.image} alt={project.title} />
						<div class="project-content">
							<h3>{project.title}</h3>
							<p>{project.description}</p>
							<div class="tech-tags">
								{#each project.technologies as tech}
									<span class="tag">{tech}</span>
								{/each}
							</div>
							<div class="project-links">
								{#if project.githubUrl}
									<a href={project.githubUrl} target="_blank">GitHub</a>
								{/if}
								{#if project.liveUrl}
									<a href={project.liveUrl} target="_blank">Live Demo</a>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<!-- Contact Section -->
	<section id="contact" class="section">
		<h2>Get In Touch</h2>
		<form class="contact-form">
			<input type="text" placeholder="Your Name" required />
			<input type="email" placeholder="Your Email" required />
			<input type="text" placeholder="Subject" />
			<textarea placeholder="Your Message" rows="5" required></textarea>
			<button type="submit">Send Message</button>
		</form>
	</section>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero {
		text-align: center;
		padding: 4rem 0;
	}

	.avatar {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		margin-bottom: 1rem;
	}

	.hero h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	.title {
		font-size: 1.5rem;
		color: #666;
		margin-bottom: 1rem;
	}

	.social-links {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 2rem;
	}

	.social-links a {
		padding: 0.5rem 1rem;
		background: #f0f0f0;
		text-decoration: none;
		border-radius: 4px;
	}

	nav {
		display: flex;
		gap: 2rem;
		justify-content: center;
		padding: 1rem 0;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		margin: 2rem 0;
	}

	nav a {
		text-decoration: none;
		color: #333;
	}

	.section {
		margin: 4rem 0;
	}

	.section h2 {
		font-size: 2rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.timeline-item {
		margin-bottom: 2rem;
		padding: 1.5rem;
		background: #f9f9f9;
		border-radius: 8px;
	}

	.timeline-header h3 {
		margin: 0;
	}

	.company {
		color: #666;
		font-weight: 500;
	}

	.timeline-meta {
		display: flex;
		gap: 1rem;
		color: #666;
		font-size: 0.9rem;
		margin: 0.5rem 0;
	}

	.tech-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.tag {
		background: #e0e0e0;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
		font-size: 0.9rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.skill-item {
		margin-bottom: 1rem;
	}

	.skill-bar {
		width: 100%;
		height: 8px;
		background: #e0e0e0;
		border-radius: 4px;
		margin-top: 0.5rem;
	}

	.skill-level {
		height: 100%;
		background: #4caf50;
		border-radius: 4px;
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.project-card {
		border: 1px solid #eee;
		border-radius: 8px;
		overflow: hidden;
	}

	.project-card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.project-content {
		padding: 1.5rem;
	}

	.project-links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	.project-links a {
		padding: 0.5rem 1rem;
		background: #f0f0f0;
		text-decoration: none;
		border-radius: 4px;
	}

	.contact-form {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-form input,
	.contact-form textarea {
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.contact-form button {
		padding: 0.75rem;
		background: #333;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}

	.contact-form button:hover {
		background: #555;
	}
</style>
