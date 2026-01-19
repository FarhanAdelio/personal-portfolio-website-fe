<script lang="ts">
	import { onMount } from 'svelte';
	import InteractiveBackground from '$lib/InteractiveBackground.svelte';
	import TypingAnimation from '$lib/TypingAnimation.svelte';
	import ScrollProgress from '$lib/ScrollProgress.svelte';
	import CustomCursor from '$lib/CustomCursor.svelte';
	import AnimatedBackground from '$lib/AnimatedBackground.svelte';
	import FloatingElements from '$lib/FloatingElements.svelte';
	import StatsCounter from '$lib/StatsCounter.svelte';
	import SkillRadar from '$lib/SkillRadar.svelte';
	import TiltCard from '$lib/TiltCard.svelte';
	import LoadingScreen from '$lib/LoadingScreen.svelte';
	import AnimatedName from '$lib/AnimatedName.svelte';
	
	export let data;
	
	let activeSection = 'home';
	let scrollY = 0;
	let isVisible: { [key: string]: boolean } = {};
	
	// Stats data
	const stats = [
		{ label: 'Projects Completed', value: 15, suffix: '+' },
		{ label: 'Skills Mastered', value: 12, suffix: '+' },
		{ label: 'Happy Clients', value: 8, suffix: '+' },
		{ label: 'Code Commits', value: 500, suffix: '+' }
	];
	
	// Radar chart data
	const radarSkills = [
		{ name: 'Analysis', level: 85 },
		{ name: 'BPMN', level: 80 },
		{ name: 'SQL', level: 80 },
		{ name: 'Data Viz', level: 75 },
		{ name: 'Python', level: 70 },
		{ name: 'System Design', level: 75 }
	];
	
	const careerTitles = [
		'System Analyst',
		'Business Analyst',
		'Data Analyst',
		'Information Analyst'
	];
	
	onMount(() => {
		// Smooth scroll behavior
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				e.preventDefault();
				const target = document.querySelector(this.getAttribute('href'));
				if (target) {
					target.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			});
		});

		// Active section detection
		const handleScroll = () => {
			scrollY = window.scrollY;
			const sections = document.querySelectorAll('section[id]');
			sections.forEach(section => {
				const top = section.offsetTop - 100;
				const bottom = top + section.offsetHeight;
				if (scrollY >= top && scrollY < bottom) {
					activeSection = section.id;
				}
			});
		};

		// Intersection Observer for fade-in animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						isVisible[entry.target.id] = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.observe-fade').forEach(el => {
			observer.observe(el);
		});

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
		};
	});
</script>

<svelte:head>
	<title>{data.profile?.name || 'Portfolio'} - {data.profile?.title || 'Professional'}</title>
	<meta name="description" content={data.profile?.bio || 'Professional portfolio website'} />
</svelte:head>

<LoadingScreen />
<CustomCursor />
<ScrollProgress />
<AnimatedBackground />
<FloatingElements />
<InteractiveBackground />

<!-- Fixed Navigation -->
<nav class="navbar" class:scrolled={scrollY > 50}>
	<div class="nav-container">
		<div class="nav-brand">{data.profile?.name || 'Portfolio'}</div>
		<div class="nav-links">
			<a href="#home" class:active={activeSection === 'home'}>Home</a>
			<a href="#about" class:active={activeSection === 'about'}>About</a>
			<a href="#education" class:active={activeSection === 'education'}>Education</a>
			<a href="#experience" class:active={activeSection === 'experience'}>Experience</a>
			<a href="#skills" class:active={activeSection === 'skills'}>Skills</a>
			<a href="#projects" class:active={activeSection === 'projects'}>Projects</a>
			<a href="#contact" class:active={activeSection === 'contact'}>Contact</a>
		</div>
	</div>
</nav>

<main>
	<!-- Hero Section -->
	<section id="home" class="hero">
		<div class="hero-content animate-fade-in">
			{#if data.profile}
				<div class="hero-text">
					<p class="greeting">Hello, I'm</p>
					<div class="name-wrapper">
						<AnimatedName name={data.profile.name} />
					</div>
					<h2 class="title">{data.profile.title}</h2>
					<div class="subtitle">
						<TypingAnimation texts={careerTitles} speed={80} deleteSpeed={50} delayBetween={2000} />
					</div>
					<p class="tagline">{data.profile.tagline}</p>
					
					<div class="hero-cta">
						<a href="#contact" class="btn btn-primary">
							<span>Get In Touch</span>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<line x1="5" y1="12" x2="19" y2="12"></line>
								<polyline points="12 5 19 12 12 19"></polyline>
							</svg>
						</a>
						<a href="#projects" class="btn btn-secondary">View Projects</a>
					</div>
				</div>

				<div class="social-links">
					{#if data.profile.social.github}
						<a href={data.profile.social.github} target="_blank" rel="noopener" aria-label="GitHub" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
							</svg>
						</a>
					{/if}
					{#if data.profile.social.linkedin}
						<a href={data.profile.social.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
							</svg>
						</a>
					{/if}
					{#if data.profile.social.twitter}
						<a href={data.profile.social.twitter} target="_blank" rel="noopener" aria-label="Twitter" class="social-link">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
								<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
							</svg>
						</a>
					{/if}
				</div>
			{/if}
		</div>
		<div class="scroll-indicator">
			<span>Scroll Down</span>
			<div class="mouse">
				<div class="wheel"></div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="section">
		<div class="container">
			<h2 class="section-title observe-fade" id="about-title" class:visible={isVisible['about-title']}>About Me</h2>
			{#if data.profile}
				<div class="about-content observe-fade" id="about-content" class:visible={isVisible['about-content']}>
					<p class="about-text">{data.profile.bio}</p>
					
					{#if data.profile.careerInterests && data.profile.careerInterests.length > 0}
						<div class="career-interests">
							<h3>Career Interests</h3>
							<div class="interest-tags">
								{#each data.profile.careerInterests as interest}
									<span class="interest-tag">{interest}</span>
								{/each}
							</div>
						</div>
					{/if}
					
					<div class="about-info">
						<div class="info-item">
							<div class="info-icon">📧</div>
							<div>
								<span class="info-label">Email</span>
								<a href="mailto:{data.profile.email}" class="info-value">{data.profile.email}</a>
							</div>
						</div>
						<div class="info-item">
							<div class="info-icon">📱</div>
							<div>
								<span class="info-label">Phone</span>
								<span class="info-value">{data.profile.phone}</span>
							</div>
						</div>
						<div class="info-item">
							<div class="info-icon">📍</div>
							<div>
								<span class="info-label">Location</span>
								<span class="info-value">{data.profile.location}</span>
							</div>
						</div>
					</div>
				</div>
				
				<!-- Stats Counter -->
				<div class="stats-wrapper observe-fade" id="stats-section" class:visible={isVisible['stats-section']}>
					<StatsCounter {stats} />
				</div>
			{/if}
		</div>
	</section>

	<!-- Education Section -->
	<section id="education" class="section section-dark">
		<div class="container">
			<h2 class="section-title observe-fade" id="education-title" class:visible={isVisible['education-title']}>Education</h2>
			{#if data.education && data.education.length > 0}
				{#each data.education as edu, i}
					<div class="education-card observe-fade" id="education-{i}" class:visible={isVisible[`education-${i}`]}>
						<div class="education-header">
							<div class="education-icon">🎓</div>
							<div class="education-main">
								<h3 class="education-degree">{edu.degree}</h3>
								<p class="education-institution">{edu.institution}</p>
								<p class="education-field">{edu.field}</p>
								<p class="education-date">{edu.startDate} - {edu.endDate} {#if edu.status}<span class="status-badge">{edu.status}</span>{/if}</p>
							</div>
						</div>
						
						<p class="education-description">{edu.description}</p>
						
						{#if edu.relevantCourses && edu.relevantCourses.length > 0}
							<div class="education-section">
								<h4>📚 Relevant Coursework</h4>
								<ul class="course-list">
									{#each edu.relevantCourses as course}
										<li>{course}</li>
									{/each}
								</ul>
							</div>
						{/if}
						
						{#if edu.coreCompetencies && edu.coreCompetencies.length > 0}
							<div class="education-section">
								<h4>💡 Core Competencies</h4>
								<div class="competency-grid">
									{#each edu.coreCompetencies as competency}
										<div class="competency-item">{competency}</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		</div>
	</section>

	<!-- Experience Section -->
	<section id="experience" class="section">
		<div class="container">
			<h2 class="section-title observe-fade" id="experience-title" class:visible={isVisible['experience-title']}>Work Experience</h2>
			{#if data.experiences}
				<div class="timeline">
					{#each data.experiences as exp, i}
						<div class="timeline-item observe-fade" id="exp-{i}" class:visible={isVisible[`exp-${i}`]}>
							<div class="timeline-marker"></div>
							<div class="timeline-content">
								<div class="timeline-header">
									<div>
										<h3 class="timeline-title">{exp.position}</h3>
										<p class="timeline-company">{exp.company}</p>
										{#if exp.type}<span class="type-badge">{exp.type}</span>{/if}
									</div>
									<div class="timeline-date">
										{exp.startDate} - {exp.endDate}
									</div>
								</div>
								<p class="timeline-location">📍 {exp.location}</p>
								<p class="timeline-description">{exp.description}</p>
								
								{#if exp.achievements && exp.achievements.length > 0}
									<div class="achievements">
										<h4>🏆 Key Achievements:</h4>
										<ul>
											{#each exp.achievements as achievement}
												<li>{achievement}</li>
											{/each}
										</ul>
									</div>
								{/if}
								
								{#if exp.learnings && exp.learnings.length > 0}
									<div class="learnings">
										<h4>📖 Key Learnings:</h4>
										<ul>
											{#each exp.learnings as learning}
												<li>{learning}</li>
											{/each}
										</ul>
									</div>
								{/if}
								
								<div class="tech-tags">
									{#each exp.technologies as tech}
										<span class="tag">{tech}</span>
									{/each}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Skills Section -->
	<section id="skills" class="section section-dark">
		<div class="container">
			<h2 class="section-title observe-fade" id="skills-title" class:visible={isVisible['skills-title']}>Skills & Technologies</h2>
			{#if data.skills}
				<div class="skills-container">
					<!-- Programming Languages -->
					{#if data.skills.programming && data.skills.programming.length > 0}
						<div class="skills-category observe-fade" id="skills-programming" class:visible={isVisible['skills-programming']}>
							<h3 class="skills-subtitle">Programming Languages</h3>
							<div class="programming-grid">
								{#each data.skills.programming as skill}
									<div class="programming-card">
										<div class="prog-name">{skill.name}</div>
										<div class="prog-level">
											<div class="prog-bar" style="width: {skill.level}%"></div>
										</div>
										<span class="prog-percentage">{skill.level}%</span>
									</div>
								{/each}
							</div>
						</div>
					{/if}
					
					<!-- Soft Skills & Tools -->
					<div class="skills-row">
						{#if data.skills.softSkills && data.skills.softSkills.length > 0}
							<div class="skills-category observe-fade" id="skills-soft" class:visible={isVisible['skills-soft']}>
								<h3 class="skills-subtitle">Soft Skills</h3>
								<div class="soft-skills-grid">
									{#each data.skills.softSkills as skill}
										<div class="soft-skill-item">{skill}</div>
									{/each}
								</div>
							</div>
						{/if}
						
						{#if data.skills.tools && data.skills.tools.length > 0}
							<div class="skills-category observe-fade" id="skills-tools" class:visible={isVisible['skills-tools']}>
								<h3 class="skills-subtitle">Tools & Platforms</h3>
								<div class="tools-grid">
									{#each data.skills.tools as tool}
										<div class="tool-item">{tool}</div>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Projects Section -->
	<section id="projects" class="section">
		<div class="container">
			<h2 class="section-title observe-fade" id="projects-title" class:visible={isVisible['projects-title']}>Featured Projects</h2>
			{#if data.projects}
				<div class="projects-grid">
					{#each data.projects as project, i}
						<TiltCard>
							<div class="project-card observe-fade" id="project-{i}" class:visible={isVisible[`project-${i}`]} class:featured={project.featured}>
								{#if project.featured}
									<div class="featured-badge">★ Featured</div>
								{/if}
							<div class="project-number">0{i + 1}</div>
							{#if project.category}
								<span class="project-category">{project.category}</span>
							{/if}
							<h3 class="project-title">{project.title}</h3>
							<p class="project-description">{project.description}</p>
							
							{#if project.highlights && project.highlights.length > 0}
								<div class="project-highlights">
									{#each project.highlights as highlight}
										<span class="highlight-badge">{highlight}</span>
									{/each}
								</div>
							{/if}
							
							<div class="tech-tags">
								{#each project.technologies as tech}
									<span class="tag">{tech}</span>
								{/each}
							</div>
							
							{#if project.githubUrl}
								<a href={project.githubUrl} class="project-link" target="_blank" rel="noopener">
									<span>View on GitHub</span>
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<line x1="7" y1="17" x2="17" y2="7"></line>
										<polyline points="7 7 17 7 17 17"></polyline>
									</svg>
								</a>
							{/if}
							</div>
						</TiltCard>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="section section-dark">
		<div class="container">
			<h2 class="section-title observe-fade" id="contact-title" class:visible={isVisible['contact-title']}>Get In Touch</h2>
			<p class="contact-subtitle observe-fade" id="contact-subtitle" class:visible={isVisible['contact-subtitle']}>
				Have a project in mind or want to discuss opportunities? Let's connect!
			</p>
			
			<form class="contact-form observe-fade" id="contact-form" class:visible={isVisible['contact-form']} on:submit|preventDefault={async (e) => {
				const formData = new FormData(e.currentTarget);
				alert('Thank you for your message! I will get back to you soon.');
				e.currentTarget.reset();
			}}>
				<div class="form-row">
					<div class="form-group">
						<input type="text" name="name" placeholder=" " required />
						<label>Your Name</label>
					</div>
					<div class="form-group">
						<input type="email" name="email" placeholder=" " required />
						<label>Your Email</label>
					</div>
				</div>
				<div class="form-group">
					<input type="text" name="subject" placeholder=" " />
					<label>Subject</label>
				</div>
				<div class="form-group">
					<textarea name="message" rows="6" placeholder=" " required></textarea>
					<label>Your Message</label>
				</div>
				<button type="submit" class="btn btn-primary btn-submit">
					<span>Send Message</span>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="22" y1="2" x2="11" y2="13"></line>
						<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
					</svg>
				</button>
			</form>
		</div>
	</section>
</main>

<!-- Footer -->
<footer class="footer">
	<div class="container">
		<div class="footer-content">
			<p>&copy; {new Date().getFullYear()} {data.profile?.name || 'Portfolio'}. All rights reserved.</p>
			<p class="footer-subtitle">Built with using Golang & SvelteKit</p>
		</div>
	</div>
</footer>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
		background: #0a0a0a;
		color: #e0e0e0;
		line-height: 1.6;
		overflow-x: hidden;
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	/* Navbar */
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: rgba(10, 10, 10, 0.7);
		backdrop-filter: blur(20px) saturate(180%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.navbar.scrolled {
		background: rgba(10, 10, 10, 0.98);
		backdrop-filter: blur(30px) saturate(200%);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1);
		border-bottom-color: rgba(255, 255, 255, 0.1);
	}

	.nav-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 1.5rem 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.nav-brand {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		letter-spacing: -0.5px;
		background: linear-gradient(135deg, #fff 0%, #999 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		position: relative;
	}
	
	.nav-brand::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, #fff, transparent);
		transition: width 0.4s ease;
	}
	
	.nav-brand:hover::after {
		width: 100%;
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-links a {
		color: #999;
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 500;
		transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		padding: 0.5rem 0;
	}
	
	.nav-links a::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 0;
		height: 2px;
		background: linear-gradient(90deg, transparent, #fff, transparent);
		transform: translateX(-50%);
		transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.nav-links a::after {
		content: '';
		position: absolute;
		bottom: -5px;
		left: 0;
		width: 0;
		height: 2px;
		background: #fff;
		transition: width 0.3s ease;
	}

	.nav-links a:hover,
	.nav-links a.active {
		color: #fff;
		text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
	}
	
	.nav-links a:hover::before,
	.nav-links a.active::before {
		width: 100%;
	}

	.nav-links a.active::after {
		width: 100%;
	}

	/* Main */
	main {
		padding-top: 80px;
		position: relative;
		z-index: 1;
	}

	/* Hero Section */
	.hero {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		position: relative;
		background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
	}

	.hero-content {
		text-align: center;
		max-width: 900px;
	}

	.animate-fade-in {
		animation: fadeInUp 1s ease-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.greeting {
		font-size: 1.2rem;
		color: #999;
		margin-bottom: 1rem;
		font-weight: 300;
		animation: fadeInUp 0.8s ease-out;
	}
	
	.name-wrapper {
		margin-bottom: 1rem;
		animation: fadeInUp 1s ease-out 0.2s backwards;
	}

	/* Removed .name class since we're using AnimatedName component */

	.title {
		font-size: clamp(1.3rem, 3vw, 1.8rem);
		color: #999;
		margin-bottom: 1rem;
		font-weight: 300;
		animation: fadeInUp 1.2s ease-out 0.4s backwards;
	}

	.subtitle {
		font-size: clamp(1.2rem, 3vw, 1.6rem);
		color: #fff;
		margin-bottom: 1.5rem;
		min-height: 2.5rem;
		font-weight: 600;
		animation: fadeInUp 1.4s ease-out 0.6s backwards;
	}

	.tagline {
		font-size: 1rem;
		color: #666;
		margin-bottom: 3rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
		animation: fadeInUp 1.6s ease-out 0.8s backwards;
	}

	.hero-cta {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		margin-bottom: 4rem;
		animation: fadeInUp 1.8s ease-out 1s backwards;
	}

	.btn {
		padding: 1rem 2.5rem;
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		border-radius: 8px;
		transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		cursor: pointer;
		border: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		position: relative;
		overflow: hidden;
	}
	
	.btn::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.1);
		transform: translate(-50%, -50%);
		transition: width 0.6s, height 0.6s;
	}
	
	.btn:hover::before {
		width: 300px;
		height: 300px;
	}

	.btn-primary {
		background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
		color: #0a0a0a;
		box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
	}

	.btn-primary:hover {
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 15px 40px rgba(255, 255, 255, 0.3);
	}
	
	.btn-primary:active {
		transform: translateY(-1px) scale(0.98);
	}

	.btn-secondary {
		background: transparent;
		color: #fff;
		border: 2px solid #fff;
		position: relative;
	}
	
	.btn-secondary::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		background: #fff;
		transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		z-index: -1;
	}
	
	.btn-secondary:hover::after {
		width: 100%;
	}

	.btn-secondary:hover {
		color: #0a0a0a;
		transform: translateY(-3px) scale(1.02);
		box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
	}

	.social-links {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
	}

	.social-link {
		color: #666;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
	}
	
	.social-link::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 50%;
		background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	
	.social-link:hover::before {
		opacity: 1;
	}

	.social-link:hover {
		color: #fff;
		border-color: #fff;
		transform: translateY(-5px) scale(1.1);
		background: rgba(255, 255, 255, 0.08);
		box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
	}

	.scroll-indicator {
		position: absolute;
		bottom: 3rem;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		color: #666;
		font-size: 0.9rem;
		animation: bounce 2s infinite;
	}
	
	@keyframes bounce {
		0%, 100% {
			transform: translateX(-50%) translateY(0);
		}
		50% {
			transform: translateX(-50%) translateY(-10px);
		}
	}

	.mouse {
		width: 25px;
		height: 40px;
		border: 2px solid #666;
		border-radius: 15px;
		margin: 0.5rem auto 0;
		position: relative;
	}

	.wheel {
		width: 3px;
		height: 8px;
		background: #666;
		border-radius: 2px;
		position: absolute;
		top: 8px;
		left: 50%;
		transform: translateX(-50%);
		animation: scroll 1.5s infinite;
	}

	@keyframes scroll {
		0% {
			opacity: 1;
			top: 8px;
		}
		100% {
			opacity: 0;
			top: 20px;
		}
	}

	/* Sections */
	.section {
		padding: 8rem 2rem;
		position: relative;
	}

	.section-dark {
		background: #0f0f0f;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		text-align: center;
		margin-bottom: 4rem;
		color: #fff;
		letter-spacing: -1px;
	}

	/* Fade-in Animation */
	.observe-fade {
		opacity: 0;
		transform: translateY(30px);
		transition: all 0.8s ease-out;
	}

	.observe-fade.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* About Section */
	.about-content {
		max-width: 900px;
		margin: 0 auto;
	}

	.about-text {
		font-size: 1.2rem;
		line-height: 1.8;
		color: #999;
		text-align: center;
		margin-bottom: 3rem;
	}

	.career-interests {
		text-align: center;
		margin-bottom: 3rem;
	}

	.career-interests h3 {
		font-size: 1.3rem;
		color: #fff;
		margin-bottom: 1.5rem;
	}

	.interest-tags {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}

	.interest-tag {
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 25px;
		color: #fff;
		font-weight: 600;
		font-size: 0.95rem;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		overflow: hidden;
	}
	
	.interest-tag::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
		transition: left 0.5s ease;
	}
	
	.interest-tag:hover::before {
		left: 100%;
	}

	.interest-tag:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
		transform: translateY(-3px) scale(1.05);
		box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.4);
	}

	.about-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.info-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-5px);
	}

	.info-icon {
		font-size: 2rem;
	}

	.info-label {
		display: block;
		font-size: 0.85rem;
		color: #666;
		margin-bottom: 0.25rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.info-value {
		display: block;
		font-size: 1.1rem;
		color: #fff;
		text-decoration: none;
	}

	.info-value:hover {
		color: #ccc;
	}
	
	/* Stats Wrapper */
	.stats-wrapper {
		margin-top: 4rem;
	}

	/* Education Section */
	.education-card {
		max-width: 900px;
		margin: 0 auto 3rem;
		padding: 3rem;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01));
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 20px;
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		backdrop-filter: blur(20px);
		position: relative;
		overflow: hidden;
	}
	
	.education-card::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.5s ease;
	}
	
	.education-card:hover::before {
		opacity: 1;
	}

	.education-card:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
		border-color: rgba(255, 255, 255, 0.15);
		transform: translateY(-8px) scale(1.01);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1);
	}

	.education-header {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.education-icon {
		font-size: 3rem;
		flex-shrink: 0;
	}

	.education-degree {
		font-size: 1.8rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.education-institution {
		font-size: 1.3rem;
		color: #999;
		margin-bottom: 0.25rem;
	}

	.education-field {
		font-size: 1.1rem;
		color: #666;
		margin-bottom: 0.5rem;
	}

	.education-date {
		font-size: 0.95rem;
		color: #666;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.status-badge {
		padding: 0.25rem 0.75rem;
		background: rgba(76, 175, 80, 0.2);
		border: 1px solid rgba(76, 175, 80, 0.4);
		border-radius: 12px;
		font-size: 0.85rem;
		color: #4caf50;
		font-weight: 600;
	}

	.education-description {
		color: #999;
		line-height: 1.8;
		margin-bottom: 2rem;
	}

	.education-section {
		margin-bottom: 2rem;
	}

	.education-section h4 {
		font-size: 1.2rem;
		color: #fff;
		margin-bottom: 1rem;
	}

	.course-list {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 0.75rem;
	}

	.course-list li {
		padding: 0.75rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border-left: 3px solid rgba(255, 255, 255, 0.2);
		color: #999;
		border-radius: 4px;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}
	
	.course-list li::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 50%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
		transition: left 0.6s ease;
	}
	
	.course-list li:hover {
		background: rgba(255, 255, 255, 0.06);
		border-left-color: #fff;
		color: #fff;
		transform: translateX(5px);
	}
	
	.course-list li:hover::before {
		left: 100%;
	}

	.competency-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.competency-item {
		padding: 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		text-align: center;
		color: #999;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		overflow: hidden;
	}
	
	.competency-item::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent);
		opacity: 0;
		transition: opacity 0.4s ease;
	}
	
	.competency-item:hover::before {
		opacity: 1;
	}

	.competency-item:hover {
		background: rgba(255, 255, 255, 0.08);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.3);
		transform: translateY(-5px) scale(1.03);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	/* Timeline */
	.timeline {
		position: relative;
		max-width: 900px;
		margin: 0 auto;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 2px;
		background: rgba(255, 255, 255, 0.1);
	}

	.timeline-item {
		position: relative;
		padding-left: 3rem;
		margin-bottom: 3rem;
	}

	.timeline-marker {
		position: absolute;
		left: -6px;
		top: 0;
		width: 14px;
		height: 14px;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
	}

	.timeline-content {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 2rem;
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.timeline-content:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateX(5px);
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 0.5rem;
		gap: 1rem;
	}

	.timeline-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.timeline-company {
		font-size: 1.1rem;
		color: #999;
		margin-bottom: 0.5rem;
	}

	.type-badge {
		padding: 0.25rem 0.75rem;
		background: rgba(33, 150, 243, 0.2);
		border: 1px solid rgba(33, 150, 243, 0.4);
		border-radius: 12px;
		font-size: 0.85rem;
		color: #2196f3;
		font-weight: 600;
	}

	.timeline-date {
		font-size: 0.9rem;
		color: #666;
		white-space: nowrap;
	}

	.timeline-location {
		color: #666;
		margin-bottom: 1rem;
		font-size: 0.95rem;
	}

	.timeline-description {
		color: #999;
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}

	.achievements,
	.learnings {
		margin-bottom: 1.5rem;
	}

	.achievements h4,
	.learnings h4 {
		font-size: 1.1rem;
		color: #fff;
		margin-bottom: 0.75rem;
	}

	.achievements ul,
	.learnings ul {
		list-style: none;
		padding-left: 0;
	}

	.achievements li,
	.learnings li {
		color: #999;
		line-height: 1.6;
		margin-bottom: 0.5rem;
		padding-left: 1.5rem;
		position: relative;
	}

	.achievements li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #4caf50;
		font-weight: bold;
	}

	.learnings li::before {
		content: '→';
		position: absolute;
		left: 0;
		color: #2196f3;
	}

	/* Skills */
	.skills-container {
		max-width: 1000px;
		margin: 0 auto;
	}

	.skills-category {
		margin-bottom: 4rem;
	}

	.skills-subtitle {
		font-size: 1.5rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 2rem;
	}

	.skills-grid {
		display: grid;
		gap: 2rem;
	}

	.skill-item {
		animation: fadeInUp 0.6s ease-out backwards;
	}

	.skill-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.75rem;
		gap: 0.75rem;
	}

	.skill-icon {
		font-size: 1.2rem;
	}

	.skill-name {
		flex: 1;
		font-size: 1.1rem;
		font-weight: 500;
		color: #fff;
	}

	.skill-percentage {
		font-size: 1rem;
		color: #666;
		font-weight: 600;
	}

	.skill-bar {
		height: 10px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 5px;
		overflow: hidden;
	}

	.skill-progress {
		height: 100%;
		background: linear-gradient(90deg, #fff, #999);
		border-radius: 5px;
		transition: width 1s ease-out 0.3s;
	}

	.programming-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1.5rem;
	}

	.programming-card {
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		text-align: center;
		transition: all 0.3s ease;
	}

	.programming-card:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-5px);
	}

	.prog-name {
		font-size: 1.1rem;
		font-weight: 600;
		color: #fff;
		margin-bottom: 1rem;
	}

	.prog-level {
		height: 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.prog-bar {
		height: 100%;
		background: linear-gradient(90deg, #fff, #999);
		border-radius: 3px;
		transition: width 1s ease-out;
	}

	.prog-percentage {
		font-size: 0.9rem;
		color: #666;
	}

	.skills-row {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 3rem;
	}

	.soft-skills-grid {
		display: grid;
		gap: 1rem;
	}

	.soft-skill-item {
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border-left: 3px solid rgba(255, 255, 255, 0.2);
		color: #999;
		border-radius: 4px;
		transition: all 0.3s ease;
	}

	.soft-skill-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: #fff;
		color: #fff;
		transform: translateX(5px);
	}

	.tools-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.tool-item {
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		text-align: center;
		color: #999;
		transition: all 0.3s ease;
	}

	.tool-item:hover {
		background: rgba(255, 255, 255, 0.05);
		color: #fff;
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-3px);
	}

	/* Tech Tags */
	.tech-tags {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		margin-top: 1.5rem;
	}

	.tag {
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 6px;
		font-size: 0.85rem;
		color: #999;
		transition: all 0.3s ease;
	}

	.tag:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #fff;
	}

	/* Projects */
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 2rem;
		max-width: 1000px;
		margin: 0 auto;
	}

	.project-card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		padding: 2.5rem;
		border-radius: 16px;
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		overflow: hidden;
		backdrop-filter: blur(10px);
	}
	
	.project-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.5s ease;
	}
	
	.project-card:hover::before {
		opacity: 1;
	}

	.project-card.featured {
		border-color: rgba(255, 215, 0, 0.3);
	}

	.project-card:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-5px);
	}

	.featured-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 215, 0, 0.2);
		border: 1px solid rgba(255, 215, 0, 0.4);
		border-radius: 20px;
		font-size: 0.85rem;
		color: #ffd700;
		font-weight: 600;
	}

	.project-number {
		font-size: 3rem;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.05);
		margin-bottom: 1rem;
	}

	.project-category {
		display: inline-block;
		padding: 0.5rem 1rem;
		background: rgba(33, 150, 243, 0.2);
		border: 1px solid rgba(33, 150, 243, 0.3);
		border-radius: 20px;
		font-size: 0.85rem;
		color: #2196f3;
		margin-bottom: 1rem;
	}

	.project-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 1rem;
	}

	.project-description {
		color: #999;
		line-height: 1.8;
		margin-bottom: 1.5rem;
	}

	.project-highlights {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1rem;
	}

	.highlight-badge {
		padding: 0.4rem 0.8rem;
		background: rgba(76, 175, 80, 0.15);
		border: 1px solid rgba(76, 175, 80, 0.3);
		border-radius: 16px;
		font-size: 0.8rem;
		color: #4caf50;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #fff;
		text-decoration: none;
		margin-top: 1rem;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.project-link:hover {
		transform: translateX(5px);
	}

	/* Contact */
	.contact-subtitle {
		text-align: center;
		font-size: 1.2rem;
		color: #666;
		margin-bottom: 3rem;
	}

	.contact-form {
		max-width: 700px;
		margin: 0 auto;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
		position: relative;
	}

	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #fff;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.form-group label {
		position: absolute;
		left: 1.5rem;
		top: 1rem;
		color: #666;
		pointer-events: none;
		transition: all 0.3s ease;
	}

	.form-group input:focus,
	.form-group textarea:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.3);
	}

	.form-group input:not(:placeholder-shown) + label,
	.form-group textarea:not(:placeholder-shown) + label,
	.form-group input:focus + label,
	.form-group textarea:focus + label {
		top: -0.5rem;
		left: 1rem;
		font-size: 0.85rem;
		background: #0f0f0f;
		padding: 0 0.5rem;
		color: #fff;
	}

	.btn-submit {
		width: 100%;
		margin-top: 1rem;
	}

	/* Footer */
	.footer {
		background: #0a0a0a;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		padding: 3rem 2rem;
		text-align: center;
	}

	.footer-content {
		color: #666;
	}

	.footer-subtitle {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		color: #555;
	}

	/* Responsive */
	@media (max-width: 768px) {
		.nav-links {
			display: none;
		}

		.hero {
			min-height: 80vh;
			padding: 1.5rem;
		}
		
		.greeting {
			font-size: 1rem;
		}

		.title {
			font-size: 1.2rem;
		}

		.subtitle {
			font-size: 1rem;
			min-height: 2rem;
		}
		
		.tagline {
			font-size: 0.9rem;
		}

		.hero-cta {
			flex-direction: column;
			align-items: center;
		}

		.btn {
			width: 100%;
			max-width: 300px;
		}

		.section {
			padding: 4rem 1.5rem;
		}

		.timeline::before {
			left: 10px;
		}

		.timeline-item {
			padding-left: 3rem;
		}

		.timeline-marker {
			left: 4px;
		}

		.timeline-header {
			flex-direction: column;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.projects-grid {
			grid-template-columns: 1fr;
		}

		.skills-row {
			grid-template-columns: 1fr;
		}

		.education-header {
			flex-direction: column;
		}

		.course-list {
			grid-template-columns: 1fr;
		}
	}
</style>
