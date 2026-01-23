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
		<div class="nav-links nav-left">
			<a href="#about" class:active={activeSection === 'about'}>About</a>
			<a href="#education" class:active={activeSection === 'education'}>Education</a>
			<a href="#experience" class:active={activeSection === 'experience'}>Experience</a>
		</div>
		
		<a href="#home" class="nav-logo">
			<img src="http://localhost:8080/img/logo/slogan.png" alt="Logo" />
		</a>
		
		<div class="nav-links nav-right">
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
	<section id="about" class="section about-section-3d">
		<div class="about-container-3d">
			<div class="about-header-3d observe-fade" id="about-header" class:visible={isVisible['about-header']}>
				<div class="title-decoration">
					<div class="deco-line"></div>
					<h2 class="section-title-3d">About Me</h2>
					<div class="deco-line"></div>
				</div>
				<p class="about-subtitle-3d">Crafting Digital Solutions with Precision & Passion</p>
			</div>

			{#if data.profile}
				<!-- Main Content Grid -->
				<div class="about-grid-3d">
					<!-- Left: Bio Card with 3D Effect -->
					<div class="bio-card-3d observe-fade" id="bio-card" class:visible={isVisible['bio-card']}>
						<div class="card-glow"></div>
						<div class="bio-content-3d">
							<div class="bio-badge">
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
								<span>Information Systems Student</span>
							</div>
							<p class="bio-text-3d">
								Information Systems student focused on analysis, system design, and business process understanding. 
								I have internship experience in government institutions and am passionate about transforming data 
								into valuable insights for decision-making.
							</p>
							
							<!-- Skills Quick View -->
							<div class="skills-quick">
								<div class="skill-chip">
									<span>Data Analysis</span>
								</div>
								<div class="skill-chip">
									<span>System Design</span>
								</div>
								<div class="skill-chip">
									<span>Business Process</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Right: Career Interests with 3D Cards -->
					<div class="interests-section-3d observe-fade" id="interests" class:visible={isVisible['interests']}>
						<h3 class="interests-title-3d">Career Focus Areas</h3>
						<div class="interests-grid-3d">
							{#if data.profile.careerInterests && data.profile.careerInterests.length > 0}
								{#each data.profile.careerInterests as interest, index}
									<div class="interest-card-3d" style="--delay: {index * 0.1}s">
										<div class="card-inner-3d">
											<div class="interest-number">{String(index + 1).padStart(2, '0')}</div>
											<div class="interest-content">
												<h4>{interest}</h4>
												<div class="interest-shine"></div>
											</div>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>
				</div>

				<!-- Bottom: Contact Info Cards with Hover 3D -->
				<div class="contact-quick-3d observe-fade" id="contact-quick" class:visible={isVisible['contact-quick']}>
					<div class="contact-card-3d">
						<div class="contact-icon-3d">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
								<polyline points="22,6 12,13 2,6"></polyline>
							</svg>
						</div>
						<div class="contact-details-3d">
							<span class="contact-label-3d">Email Address</span>
							<a href="mailto:{data.profile.email}" class="contact-value-3d">{data.profile.email}</a>
						</div>
						<div class="card-bg-3d"></div>
					</div>

					<div class="contact-card-3d">
						<div class="contact-icon-3d">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
							</svg>
						</div>
						<div class="contact-details-3d">
							<span class="contact-label-3d">Phone Number</span>
							<a href="tel:{data.profile.phone}" class="contact-value-3d">{data.profile.phone}</a>
						</div>
						<div class="card-bg-3d"></div>
					</div>

					<div class="contact-card-3d">
						<div class="contact-icon-3d">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
								<circle cx="12" cy="10" r="3"></circle>
							</svg>
						</div>
						<div class="contact-details-3d">
							<span class="contact-label-3d">Based In</span>
							<span class="contact-value-3d">{data.profile.location}</span>
						</div>
						<div class="card-bg-3d"></div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Animated Background Elements -->
		<div class="bg-elements-3d">
			<div class="bg-orb orb-1"></div>
			<div class="bg-orb orb-2"></div>
			<div class="bg-orb orb-3"></div>
		</div>
	</section>

	<!-- Education Section -->
	<section id="education" class="section section-dark">
		<div class="container">
			<h2 class="section-title observe-fade" id="education-title" class:visible={isVisible['education-title']}>Education</h2>
			{#if data.education && data.education.length > 0}
				<div class="education-wrapper">
					{#each data.education as edu, i}
						<div class="education-card-modern observe-fade" id="education-{i}" class:visible={isVisible[`education-${i}`]}>
							<!-- Floating Decorative Elements -->
							<div class="float-decoration"></div>
							<div class="float-decoration-2"></div>
							
							<div class="edu-main-content">
								<div class="edu-top-row">
									<div class="edu-left">
										<div class="degree-wrapper">
											<h3 class="degree-text">{edu.degree}</h3>
											<div class="degree-line"></div>
										</div>
										<div class="institution-text">{edu.institution}</div>
									</div>
									
									<div class="edu-right">
										<div class="timeline-wrapper">
											<div class="timeline-dot"></div>
											<span class="timeline-text">{edu.startDate} - {edu.endDate}</span>
										</div>
										{#if edu.status}
											<div class="status-pill">{edu.status}</div>
										{/if}
									</div>
								</div>

								{#if edu.description}
									<p class="edu-desc-text">{edu.description}</p>
								{/if}
								
								<div class="edu-details-wrapper">
									{#if edu.relevantCourses && edu.relevantCourses.length > 0}
										<div class="detail-block">
											<div class="block-label">
												<span class="label-dot"></span>
												<span class="label-text">Relevant Coursework</span>
											</div>
											<div class="courses-flow">
												{#each edu.relevantCourses as course, idx}
													<span class="flow-item" style="animation-delay: {idx * 0.03}s">{course}</span>
												{/each}
											</div>
										</div>
									{/if}
									
									{#if edu.coreCompetencies && edu.coreCompetencies.length > 0}
										<div class="detail-block">
											<div class="block-label">
												<span class="label-dot"></span>
												<span class="label-text">Core Competencies</span>
											</div>
											<div class="competencies-flow">
												{#each edu.coreCompetencies as comp, idx}
													<div class="comp-flow-item" style="animation-delay: {idx * 0.03}s">
														<span class="comp-marker"></span>
														<span>{comp}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Experience Section -->
	<section id="experience" class="section">
		<div class="container">
			<h2 class="section-title observe-fade" id="experience-title" class:visible={isVisible['experience-title']}>Work Experience</h2>
			{#if data.experiences && data.experiences.length > 0}
				<div class="experience-wrapper">
					{#each data.experiences as exp, i}
						<div class="experience-card-modern observe-fade" id="exp-{i}" class:visible={isVisible[`exp-${i}`]}>
							<!-- Floating Decorative Elements -->
							<div class="exp-float-decoration"></div>
							<div class="exp-float-decoration-2"></div>
							
							<div class="exp-main-content">
								<!-- Top Section with Logo and Header -->
								<div class="exp-top-section">
									<div class="exp-logo-container">
										{#if exp.logo}
											<div class="exp-logo-wrapper">
												<img src="http://localhost:8080{exp.logo}" alt="{exp.company}" class="exp-logo" />
											</div>
										{/if}
										<div class="exp-header-content">
											<div class="exp-company-name">{exp.company}</div>
											<div class="exp-position-wrapper">
												<h3 class="exp-position">{exp.position}</h3>
												<div class="position-line"></div>
											</div>
											<div class="exp-meta">
												{#if exp.type}<span class="exp-type-badge">{exp.type}</span>{/if}
												<span class="exp-location">{exp.location}</span>
											</div>
										</div>
									</div>
									
									<div class="exp-timeline-wrapper">
										<div class="exp-timeline-dot"></div>
										<span class="exp-timeline-text">{exp.startDate} - {exp.endDate}</span>
									</div>
								</div>

								<!-- Description -->
								{#if exp.description}
									<p class="exp-desc-text">{exp.description}</p>
								{/if}
								
								<!-- Achievements & Learnings Grid -->
								<div class="exp-details-grid">
									{#if exp.achievements && exp.achievements.length > 0}
										<div class="exp-detail-block">
											<div class="exp-block-label">
												<span class="exp-label-dot"></span>
												<span class="exp-label-text">Key Achievements</span>
											</div>
											<div class="exp-achievements-flow">
												{#each exp.achievements as achievement, idx}
													<div class="exp-achievement-item" style="animation-delay: {idx * 0.05}s">
														<span class="achievement-marker"></span>
														<span>{achievement}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}
									
									{#if exp.learnings && exp.learnings.length > 0}
										<div class="exp-detail-block">
											<div class="exp-block-label">
												<span class="exp-label-dot"></span>
												<span class="exp-label-text">Key Learnings</span>
											</div>
											<div class="exp-learnings-flow">
												{#each exp.learnings as learning, idx}
													<div class="exp-learning-item" style="animation-delay: {idx * 0.05}s">
														<span class="learning-marker"></span>
														<span>{learning}</span>
													</div>
												{/each}
											</div>
										</div>
									{/if}
								</div>
								
								<!-- Tech Tags -->
								{#if exp.technologies && exp.technologies.length > 0}
									<div class="exp-tech-section">
										<div class="exp-tech-flow">
											{#each exp.technologies as tech, idx}
												<span class="exp-tech-tag" style="animation-delay: {idx * 0.02}s">{tech}</span>
											{/each}
										</div>
									</div>
								{/if}
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
					<!-- Tech Badge -->
					<div class="tech-badge-wrapper">
						<div class="tech-badge">Tech stack & tools</div>
					</div>

					<!-- Programming Languages Marquee (Left to Right) -->
					{#if data.skills.programming && data.skills.programming.length > 0}
						<div class="marquee-container">
							<div class="marquee-content marquee-ltr">
								{#each data.skills.programming as skill}
									<div class="tech-marquee-card">
										{#if skill.logo}
											<div class="tech-marquee-logo">
												<img src="http://localhost:8080{skill.logo}" alt="{skill.name}" />
											</div>
										{:else}
											<div class="tech-marquee-icon">{skill.icon || '◆'}</div>
										{/if}
										<div class="tech-marquee-name">{skill.name}</div>
									</div>
								{/each}
								<!-- Duplicate for seamless loop -->
								{#each data.skills.programming as skill}
									<div class="tech-marquee-card">
										{#if skill.logo}
											<div class="tech-marquee-logo">
												<img src="http://localhost:8080{skill.logo}" alt="{skill.name}" />
											</div>
										{:else}
											<div class="tech-marquee-icon">{skill.icon || '◆'}</div>
										{/if}
										<div class="tech-marquee-name">{skill.name}</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Tools Marquee (Right to Left) -->
					{#if data.skills.tools && data.skills.tools.length > 0}
						<div class="marquee-container">
							<div class="marquee-content marquee-rtl">
								{#each data.skills.tools as tool}
									<div class="tech-marquee-card">
										{#if tool.logo}
											<div class="tech-marquee-logo">
												<img src="http://localhost:8080{tool.logo}" alt="{tool.name}" />
											</div>
										{:else}
											<div class="tech-marquee-icon">{tool.icon || '🔧'}</div>
										{/if}
										<div class="tech-marquee-name">{tool.name}</div>
									</div>
								{/each}
								<!-- Duplicate for seamless loop -->
								{#each data.skills.tools as tool}
									<div class="tech-marquee-card">
										{#if tool.logo}
											<div class="tech-marquee-logo">
												<img src="http://localhost:8080{tool.logo}" alt="{tool.name}" />
											</div>
										{:else}
											<div class="tech-marquee-icon">{tool.icon || '🔧'}</div>
										{/if}
										<div class="tech-marquee-name">{tool.name}</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
					
					<!-- Soft Skills -->
					{#if data.skills.softSkills && data.skills.softSkills.length > 0}
						<div class="skills-category observe-fade" id="skills-soft" class:visible={isVisible['skills-soft']}>
							<h3 class="skills-subtitle">🗣️ Soft Skills</h3>
							<div class="soft-skills-grid">
								{#each data.skills.softSkills as skill}
									<div class="soft-skill-item">{skill}</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</section>

	<!-- Projects Section -->
	<section id="projects" class="section">
		<div class="container">
			<h2 class="section-title observe-fade" id="projects-title" class:visible={isVisible['projects-title']}>Projects</h2>
			{#if data.projects}
				<div class="projects-grid">
					{#each data.projects as project, i}
					<TiltCard>
						<div class="project-card-detailed observe-fade" id="project-{i}" class:visible={isVisible[`project-${i}`]} class:featured={project.featured}>
							{#if project.featured}
								<div class="featured-badge-new">★ Featured</div>
							{/if}
							
							<!-- Video/Screenshot Section -->
							{#if project.video}
								<div class="project-media-container">
									{#if project.videoType === 'youtube'}
										<iframe 
											src="https://www.youtube.com/embed/{project.video}?autoplay=1&mute=1&loop=1" 
											title="{project.title} Demo"
											frameborder="0" 
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
											allowfullscreen
											class="project-video-iframe"
										></iframe>
									{:else if project.videoType === 'vimeo'}
										<iframe 
											src="https://player.vimeo.com/video/{project.video}?autoplay=1&muted=1&loop=1" 
											title="{project.title} Demo"
											frameborder="0" 
											allow="autoplay; fullscreen; picture-in-picture" 
											allowfullscreen
											class="project-video-iframe"
										></iframe>
									{:else}
										<video 
											class="project-video-player" 
											autoplay
											muted
											loop
											playsinline
											preload="metadata"
										>
											<source src="http://localhost:8080{project.video}" type="video/mp4" />
											Your browser doesn't support video playback.
										</video>
									{/if}
								</div>
							{/if}
							<div class="project-details-section">
								<!-- Letter Badge & Title -->
								<div class="project-header-row">
									<div class="project-letter-badge">{project.title.charAt(0)}</div>
									<div class="project-header-text">
										<h3 class="project-title-new">{project.title}</h3>
										{#if project.date}
											<span class="project-date">{project.date}</span>
										{/if}
									</div>
								</div>
								
								<!-- Type Badges -->
								{#if project.type && project.type.length > 0}
									<div class="project-type-section">
										<span class="type-label">Type:</span>
										{#each project.type as typeItem}
											<span class="type-badge-new">{typeItem}</span>
										{/each}
									</div>
								{/if}
								
								<!-- Description -->
								<p class="project-description-new">{project.description}</p>
								
								<!-- Features List -->
								{#if project.features && project.features.length > 0}
									<div class="project-features-section">
										<h4 class="features-title">Key Features:</h4>
										<ul class="features-list">
											{#each project.features as feature}
												<li class="feature-item">{feature}</li>
											{/each}
										</ul>
									</div>
								{/if}
								
								<!-- Tech Stack Icons -->
								{#if project.technologies && project.technologies.length > 0}
									<div class="project-tech-icons">
										{#each project.technologies as tech, idx}
											<div class="tech-icon-item" title={tech}>
												{#if project.techIcons && project.techIcons[idx]}
													<span class="tech-emoji">{project.techIcons[idx]}</span>
												{/if}
											</div>
										{/each}
									</div>
								{/if}
								
								<!-- Action Buttons -->
								<div class="project-actions">
									{#if project.liveUrl}
										<a href={project.liveUrl} class="btn-action btn-primary" target="_blank" rel="noopener">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
												<polyline points="15 3 21 3 21 9"></polyline>
												<line x1="10" y1="14" x2="21" y2="3"></line>
											</svg>
											<span>Live Demo</span>
										</a>
									{/if}
									{#if project.githubUrl}
										<a href={project.githubUrl} class="btn-action btn-secondary" target="_blank" rel="noopener">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
												<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
											</svg>
											<span>View Code</span>
										</a>
									{/if}
								</div>
							</div>
						</div>
						</TiltCard>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Contact Section -->
	<section id="contact" class="section section-dark contact-section">
		<div class="contact-container">
			<!-- Left Side: Info -->
			<div class="contact-info observe-fade" id="contact-info" class:visible={isVisible['contact-info']}>
				<div class="contact-content">
					<div class="contact-badge">
						<span class="badge-dot"></span>
						<span>Available for opportunities</span>
					</div>
					
					<h2 class="contact-title">Let's Create Something Amazing Together</h2>
					<p class="contact-description">
						Whether you have a project in mind, need consultation, or just want to connect, 
						I'm here to help turn your ideas into reality.
					</p>
					
					<div class="contact-methods">
						<div class="contact-method">
							<div class="method-icon">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
									<polyline points="22,6 12,13 2,6"></polyline>
								</svg>
							</div>
							<div class="method-details">
								<span class="method-label">Email</span>
								<a href="mailto:{data.profile?.email}" class="method-value">{data.profile?.email}</a>
							</div>
						</div>
						
						<div class="contact-method">
							<div class="method-icon">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
								</svg>
							</div>
							<div class="method-details">
								<span class="method-label">Phone</span>
								<a href="tel:{data.profile?.phone}" class="method-value">{data.profile?.phone}</a>
							</div>
						</div>
						
						<div class="contact-method">
							<div class="method-icon">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
									<circle cx="12" cy="10" r="3"></circle>
								</svg>
							</div>
							<div class="method-details">
								<span class="method-label">Location</span>
								<span class="method-value">{data.profile?.location}</span>
							</div>
						</div>
					</div>
					
					<div class="contact-socials">
						<a href={data.profile?.social?.github} target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
							</svg>
						</a>
						<a href={data.profile?.social?.linkedin} target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
							</svg>
						</a>
						<a href={data.profile?.social?.twitter} target="_blank" rel="noopener noreferrer" class="social-link">
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
							</svg>
						</a>
					</div>
				</div>
				
				<div class="floating-shapes">
					<div class="shape shape-1"></div>
					<div class="shape shape-2"></div>
					<div class="shape shape-3"></div>
				</div>
			</div>
			
			<!-- Right Side: Form -->
			<div class="contact-form-wrapper observe-fade" id="contact-form-wrapper" class:visible={isVisible['contact-form-wrapper']}>
				<form class="contact-form-modern" on:submit|preventDefault={async (e) => {
					const formData = new FormData(e.currentTarget);
					alert('Thank you for reaching out! I will get back to you soon.');
					e.currentTarget.reset();
				}}>
					<div class="form-header">
						<h3>Send a Message</h3>
						<p>Fill out the form below and I'll respond within 24 hours</p>
					</div>
					
					<div class="form-grid">
						<div class="input-group">
							<label for="name">Full Name</label>
							<input type="text" id="name" name="name" placeholder="..." required />
						</div>
						
						<div class="input-group">
							<label for="email">Email Address</label>
							<input type="email" id="email" name="email" placeholder="...." required />
						</div>
					</div>
					
					<div class="input-group">
						<label for="subject">Subject</label>
						<input type="text" id="subject" name="subject" placeholder="..." />
					</div>
					
					<div class="input-group">
						<label for="message">Message</label>
						<textarea id="message" name="message" rows="5" placeholder="..." required></textarea>
					</div>
					
					<button type="submit" class="submit-btn">
						<span>Send Message</span>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<line x1="5" y1="12" x2="19" y2="12"></line>
							<polyline points="12 5 19 12 12 19"></polyline>
						</svg>
					</button>
				</form>
			</div>
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
		background: rgba(10, 10, 10, 0.5);
		backdrop-filter: blur(15px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.navbar.scrolled {
		background: rgba(10, 10, 10, 0.85);
		backdrop-filter: blur(25px);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
		border-bottom-color: rgba(255, 255, 255, 0.12);
	}

	.nav-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 1rem 2rem;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 2rem;
	}

	.nav-logo {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		cursor: pointer;
	}

	.nav-logo img {
		height: 55px;
		width: auto;
		transition: all 0.3s ease;
		filter: brightness(1);
	}

	.nav-logo:hover img {
		transform: scale(1.08);
		filter: brightness(1.1);
	}

	.nav-links {
		display: flex;
		gap: 2rem;
	}

	.nav-left {
		justify-content: flex-end;
	}

	.nav-right {
		justify-content: flex-start;
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

	/* About Section 3D */
	.about-section-3d {
		position: relative;
		overflow: hidden;
		background: #0a0a0a;
	}

	.about-container-3d {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		position: relative;
		z-index: 2;
	}

	/* Header with Decorations */
	.about-header-3d {
		text-align: center;
		margin-bottom: 4rem;
	}

	.title-decoration {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 1rem;
	}

	.deco-line {
		width: 80px;
		height: 2px;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
		position: relative;
	}

	.deco-line::before {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		background: #fff;
		border-radius: 50%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 20px rgba(255,255,255,0.6);
		animation: pulse-glow 2s infinite;
	}

	@keyframes pulse-glow {
		0%, 100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
		50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.5); }
	}

	.section-title-3d {
		font-size: 3rem;
		font-weight: 800;
		background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 50%, #ffffff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		background-size: 200% 200%;
		animation: gradient-shift 4s ease infinite;
		letter-spacing: -1px;
	}

	@keyframes gradient-shift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	.about-subtitle-3d {
		font-size: 1.2rem;
		color: #888;
		font-weight: 300;
		letter-spacing: 2px;
	}

	/* Main Grid Layout */
	.about-grid-3d {
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 2.5rem;
		margin-bottom: 3rem;
	}

	/* Bio Card with 3D Effect */
	.bio-card-3d {
		position: relative;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		padding: 3rem;
		perspective: 1000px;
		transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.bio-card-3d:hover {
		transform: translateY(-10px);
		box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.card-glow {
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
		opacity: 0;
		transition: opacity 0.6s ease;
		pointer-events: none;
	}

	.bio-card-3d:hover .card-glow {
		opacity: 1;
	}

	.bio-content-3d {
		position: relative;
		z-index: 2;
	}

	.bio-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 100px;
		color: #e0e0e0;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1.5rem;
	}

	.bio-badge svg {
		flex-shrink: 0;
	}

	.bio-text-3d {
		font-size: 1.15rem;
		line-height: 1.9;
		color: #bbb;
		margin-bottom: 2rem;
	}

	.skills-quick {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.skill-chip {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.25rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		transition: all 0.3s ease;
		cursor: default;
	}

	.skill-chip:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-3px) scale(1.05);
	}

	.chip-icon {
		font-size: 1.25rem;
	}

	.skill-chip span {
		color: #ddd;
		font-size: 0.9rem;
		font-weight: 500;
	}

	/* Career Interests Section */
	.interests-section-3d {
		position: relative;
	}

	.interests-title-3d {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 1.5rem;
		position: relative;
		padding-left: 1rem;
	}

	.interests-title-3d::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 24px;
		background: linear-gradient(180deg, #ffffff, #999999);
		border-radius: 2px;
	}

	.interests-grid-3d {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.interest-card-3d {
		opacity: 0;
		animation: slideInRight 0.6s ease forwards;
		animation-delay: var(--delay);
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.card-inner-3d {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.25rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
		cursor: pointer;
		overflow: hidden;
	}

	.card-inner-3d:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.15);
		transform: translateX(10px);
		box-shadow: -5px 0 20px rgba(255, 255, 255, 0.1);
	}

	.interest-number {
		font-size: 1.5rem;
		font-weight: 800;
		color: rgba(255, 255, 255, 0.1);
		font-family: 'Courier New', monospace;
		min-width: 40px;
		transition: all 0.4s ease;
	}

	.card-inner-3d:hover .interest-number {
		color: rgba(255, 255, 255, 0.3);
		transform: scale(1.2);
	}

	.interest-content {
		position: relative;
		flex: 1;
		overflow: hidden;
	}

	.interest-content h4 {
		font-size: 1rem;
		font-weight: 600;
		color: #fff;
		margin: 0;
		position: relative;
		z-index: 2;
	}

	.interest-shine {
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
		transition: left 0.6s ease;
	}

	.card-inner-3d:hover .interest-shine {
		left: 100%;
	}

	/* Contact Quick Cards */
	.contact-quick-3d {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	.contact-card-3d {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 20px;
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		overflow: hidden;
		cursor: pointer;
	}

	.contact-card-3d:hover {
		transform: translateY(-8px) rotateX(5deg);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
		border-color: rgba(255, 255, 255, 0.15);
	}

	.card-bg-3d {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
		opacity: 0;
		transition: opacity 0.5s ease;
	}

	.contact-card-3d:hover .card-bg-3d {
		opacity: 1;
	}

	.contact-icon-3d {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		color: #e0e0e0;
		flex-shrink: 0;
		transition: all 0.4s ease;
		position: relative;
		z-index: 2;
	}

	.contact-card-3d:hover .contact-icon-3d {
		background: rgba(255, 255, 255, 0.15);
		transform: rotate(360deg) scale(1.1);
	}

	.contact-details-3d {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		position: relative;
		z-index: 2;
	}

	.contact-label-3d {
		font-size: 0.75rem;
		color: #666;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.contact-value-3d {
		color: #fff;
		font-size: 0.95rem;
		font-weight: 600;
		transition: color 0.3s ease;
		text-decoration: none;
	}

	.contact-card-3d:hover .contact-value-3d {
		color: #ffffff;
	}

	/* Animated Background Elements */
	.bg-elements-3d {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
		overflow: hidden;
	}

	.bg-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.15;
		animation: float-orb 20s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.03), transparent);
		top: -10%;
		left: -10%;
		animation-delay: 0s;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.02), transparent);
		bottom: -5%;
		right: -5%;
		animation-delay: 7s;
	}

	.orb-3 {
		width: 350px;
		height: 350px;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.025), transparent);
		top: 50%;
		left: 50%;
		animation-delay: 14s;
	}

	@keyframes float-orb {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(50px, -50px) rotate(120deg);
		}
		66% {
			transform: translate(-30px, 30px) rotate(240deg);
		}
	}
	
	/* Stats Wrapper */
	.stats-wrapper {
		margin-top: 4rem;
	}

	/* Education Section */
	.education-wrapper {
		max-width: 1000px;
		margin: 0 auto;
	}

	.education-card-modern {
		position: relative;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 32px;
		padding: 3.5rem;
		margin-bottom: 3rem;
		transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
		overflow: hidden;
	}

	.education-card-modern::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		right: -2px;
		bottom: -2px;
		background: linear-gradient(45deg, 
			rgba(255, 255, 255, 0.1) 0%, 
			transparent 50%, 
			rgba(255, 255, 255, 0.1) 100%);
		border-radius: 32px;
		opacity: 0;
		z-index: -1;
		transition: opacity 0.6s ease;
	}

	.education-card-modern:hover::before {
		opacity: 1;
	}

	.education-card-modern:hover {
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
		border-color: rgba(255, 255, 255, 0.12);
		transform: translateY(-12px);
		box-shadow: 
			0 30px 80px rgba(0, 0, 0, 0.4),
			0 0 1px rgba(255, 255, 255, 0.1) inset;
	}

	/* Floating Decorations */
	.float-decoration {
		position: absolute;
		width: 300px;
		height: 300px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
		top: -100px;
		right: -100px;
		pointer-events: none;
		animation: float-rotate 20s ease-in-out infinite;
	}

	.float-decoration-2 {
		position: absolute;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
		bottom: -50px;
		left: -50px;
		pointer-events: none;
		animation: float-rotate 15s ease-in-out infinite reverse;
	}

	@keyframes float-rotate {
		0%, 100% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(180deg) scale(1.1);
		}
	}

	/* Top Row */
	.edu-top-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 3rem;
		margin-bottom: 2.5rem;
	}

	.edu-left {
		flex: 1;
	}

	.degree-wrapper {
		position: relative;
		margin-bottom: 1rem;
	}

	.degree-text {
		font-size: clamp(1.75rem, 4vw, 2.25rem);
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.5rem 0;
		line-height: 1.2;
		letter-spacing: -0.02em;
	}

	.degree-line {
		width: 60px;
		height: 3px;
		background: linear-gradient(90deg, #fff, transparent);
		border-radius: 2px;
		animation: expand-line 1s ease-out;
	}

	@keyframes expand-line {
		from {
			width: 0;
			opacity: 0;
		}
		to {
			width: 60px;
			opacity: 1;
		}
	}

	.institution-text {
		font-size: 1.2rem;
		color: #999;
		font-weight: 500;
		letter-spacing: 0.02em;
	}

	.edu-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 1rem;
	}

	.timeline-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.timeline-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		position: relative;
		animation: pulse-dot 2s ease-in-out infinite;
	}

	.timeline-dot::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		animation: pulse-ring-expand 2s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%, 100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.8;
		}
	}

	@keyframes pulse-ring-expand {
		0% {
			transform: translate(-50%, -50%) scale(0.5);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.5);
			opacity: 0;
		}
	}

	.timeline-text {
		color: #777;
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.5px;
	}

	.status-pill {
		padding: 0.6rem 1.5rem;
		background: rgba(76, 175, 80, 0.12);
		border: 1px solid rgba(76, 175, 80, 0.25);
		border-radius: 100px;
		color: #4caf50;
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1.2px;
		transition: all 0.4s ease;
	}

	.education-card-modern:hover .status-pill {
		background: rgba(76, 175, 80, 0.2);
		border-color: rgba(76, 175, 80, 0.4);
		box-shadow: 0 0 30px rgba(76, 175, 80, 0.2);
	}

	.edu-desc-text {
		color: #aaa;
		line-height: 1.9;
		margin-bottom: 3rem;
		font-size: 1.05rem;
		max-width: 85%;
	}

	/* Details Wrapper */
	.edu-details-wrapper {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.detail-block {
		position: relative;
	}

	.block-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.label-dot {
		width: 8px;
		height: 8px;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
	}

	.label-text {
		font-size: 0.85rem;
		font-weight: 700;
		color: #fff;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	/* Courses Flow */
	.courses-flow {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.flow-item {
		padding: 0.85rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		color: #888;
		font-size: 0.92rem;
		font-weight: 500;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		cursor: default;
		opacity: 0;
		animation: slide-in-up 0.6s ease forwards;
		position: relative;
		overflow: hidden;
	}

	.flow-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
		transition: left 0.5s ease;
	}

	.flow-item:hover::before {
		left: 100%;
	}

	.flow-item:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.15);
		color: #fff;
		transform: translateY(-4px) scale(1.02);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	}

	@keyframes slide-in-up {
		from {
			opacity: 0;
			transform: translateY(15px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Competencies Flow */
	.competencies-flow {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.comp-flow-item {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.015);
		border-left: 2px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		color: #888;
		font-size: 0.95rem;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		opacity: 0;
		animation: slide-in-right 0.6s ease forwards;
	}

	.comp-flow-item:hover {
		background: rgba(255, 255, 255, 0.04);
		border-left-color: #fff;
		color: #fff;
		transform: translateX(8px);
		padding-left: 2rem;
	}

	@keyframes slide-in-right {
		from {
			opacity: 0;
			transform: translateX(-15px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.comp-marker {
		min-width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		transition: all 0.3s ease;
	}

	.comp-flow-item:hover .comp-marker {
		background: #fff;
		box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
		transform: scale(1.6);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.education-card-modern {
			padding: 2.5rem 2rem;
		}

		.edu-top-row {
			flex-direction: column;
			gap: 2rem;
		}

		.edu-right {
			align-items: flex-start;
		}

		.edu-desc-text {
			max-width: 100%;
		}

		.competencies-flow {
			grid-template-columns: 1fr;
		}
	}

	/* Experience Section - Fluid Design */
	.experience-wrapper {
		max-width: 1000px;
		margin: 0 auto;
	}

	.experience-card-modern {
		position: relative;
		background: rgba(255, 255, 255, 0.015);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 30px;
		padding: 3.5rem 3rem;
		margin-bottom: 3rem;
		backdrop-filter: blur(10px);
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		overflow: hidden;
	}

	.experience-card-modern::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
	}

	.experience-card-modern:hover {
		background: rgba(255, 255, 255, 0.03);
		border-color: rgba(255, 255, 255, 0.12);
		transform: translateY(-8px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	}

	.experience-card-modern:hover::before {
		opacity: 1;
	}

	/* Floating Decorations */
	.exp-float-decoration,
	.exp-float-decoration-2 {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent);
		pointer-events: none;
	}

	.exp-float-decoration {
		width: 200px;
		height: 200px;
		top: -50px;
		right: -50px;
		animation: float-rotate 20s linear infinite;
	}

	.exp-float-decoration-2 {
		width: 150px;
		height: 150px;
		bottom: -30px;
		left: -30px;
		animation: float-rotate 25s linear infinite reverse;
	}

	/* Main Content */
	.exp-main-content {
		position: relative;
		z-index: 1;
	}

	/* Top Section with Logo */
	.exp-top-section {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 2rem;
		gap: 2rem;
	}

	.exp-logo-container {
		flex: 1;
		display: flex;
		gap: 2rem;
		align-items: flex-start;
	}

	.exp-logo-wrapper {
		position: relative;
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		overflow: hidden;
	}

	.experience-card-modern:hover .exp-logo-wrapper {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
		transform: scale(1.08);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
	}

	.exp-logo {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: all 0.4s ease;
	}

	/* Header Content */
	.exp-header-content {
		flex: 1;
	}

	.exp-company-name {
		font-size: 1.35rem;
		color: #fff;
		font-weight: 600;
		margin-bottom: 0.6rem;
		line-height: 1.4;
		opacity: 0.95;
		transition: all 0.3s ease;
	}

	.experience-card-modern:hover .exp-company-name {
		color: #fff;
		opacity: 1;
	}

	.exp-position-wrapper {
		margin-bottom: 0.75rem;
		position: relative;
	}

	.exp-position {
		font-size: 1.4rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
		line-height: 1.3;
		transition: all 0.3s ease;
	}

	.position-line {
		height: 3px;
		width: 60px;
		background: linear-gradient(90deg, rgba(255, 255, 255, 0.6), transparent);
		margin-top: 0.75rem;
		border-radius: 2px;
		transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.experience-card-modern:hover .position-line {
		width: 120px;
		background: linear-gradient(90deg, #fff, transparent);
	}

	.exp-meta {
		display: flex;
		gap: 1.5rem;
		align-items: center;
		flex-wrap: wrap;
	}

	.exp-type-badge {
		padding: 0.5rem 1.2rem;
		background: rgba(33, 150, 243, 0.12);
		border: 1px solid rgba(33, 150, 243, 0.3);
		border-radius: 50px;
		font-size: 0.85rem;
		color: #2196f3;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		transition: all 0.3s ease;
	}

	.experience-card-modern:hover .exp-type-badge {
		background: rgba(33, 150, 243, 0.2);
		border-color: rgba(33, 150, 243, 0.5);
	}

	.exp-location {
		color: #777;
		font-size: 0.95rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.exp-location::before {
		content: '📍';
		font-size: 1rem;
	}

	/* Timeline */
	.exp-timeline-wrapper {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 50px;
		transition: all 0.4s ease;
	}

	.experience-card-modern:hover .exp-timeline-wrapper {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.exp-timeline-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		position: relative;
		animation: pulse-dot 2s ease-in-out infinite;
	}

	.exp-timeline-dot::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		animation: pulse-ring-expand 2s ease-in-out infinite;
	}

	.exp-timeline-text {
		color: #777;
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.5px;
	}

	/* Description */
	.exp-desc-text {
		color: #aaa;
		line-height: 1.9;
		margin-bottom: 3rem;
		font-size: 1.05rem;
	}

	/* Details Grid */
	.exp-details-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2.5rem;
		margin-bottom: 2.5rem;
	}

	.exp-detail-block {
		position: relative;
	}

	.exp-block-label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.exp-label-dot {
		width: 8px;
		height: 8px;
		background: #fff;
		border-radius: 50%;
		box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
	}

	.exp-label-text {
		font-size: 0.85rem;
		font-weight: 700;
		color: #fff;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	/* Achievements Flow */
	.exp-achievements-flow,
	.exp-learnings-flow {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.exp-achievement-item,
	.exp-learning-item {
		display: flex;
		align-items: flex-start;
		gap: 1.25rem;
		padding: 1rem 1.5rem;
		background: rgba(255, 255, 255, 0.015);
		border-left: 2px solid rgba(76, 175, 80, 0.3);
		border-radius: 10px;
		color: #888;
		font-size: 0.95rem;
		line-height: 1.7;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		opacity: 0;
		animation: slide-in-right 0.6s ease forwards;
	}

	.exp-learning-item {
		border-left-color: rgba(33, 150, 243, 0.3);
	}

	.exp-achievement-item:hover,
	.exp-learning-item:hover {
		background: rgba(255, 255, 255, 0.04);
		border-left-color: rgba(76, 175, 80, 0.8);
		color: #fff;
		transform: translateX(8px);
		padding-left: 2rem;
	}

	.exp-learning-item:hover {
		border-left-color: rgba(33, 150, 243, 0.8);
	}

	.achievement-marker,
	.learning-marker {
		min-width: 5px;
		height: 5px;
		border-radius: 50%;
		background: rgba(76, 175, 80, 0.6);
		margin-top: 0.5rem;
		transition: all 0.3s ease;
	}

	.learning-marker {
		background: rgba(33, 150, 243, 0.6);
	}

	.exp-achievement-item:hover .achievement-marker,
	.exp-learning-item:hover .learning-marker {
		background: #4caf50;
		box-shadow: 0 0 12px rgba(76, 175, 80, 0.8);
		transform: scale(1.6);
	}

	.exp-learning-item:hover .learning-marker {
		background: #2196f3;
		box-shadow: 0 0 12px rgba(33, 150, 243, 0.8);
	}

	/* Tech Tags Section */
	.exp-tech-section {
		padding-top: 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.exp-tech-flow {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.exp-tech-tag {
		padding: 0.7rem 1.3rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		color: #888;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
		cursor: default;
		opacity: 0;
		animation: slide-in-up 0.6s ease forwards;
		position: relative;
		overflow: hidden;
	}

	.exp-tech-tag::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
		transition: left 0.5s ease;
	}

	.exp-tech-tag:hover::before {
		left: 100%;
	}

	.exp-tech-tag:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.15);
		color: #fff;
		transform: translateY(-4px) scale(1.05);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.experience-card-modern {
			padding: 2.5rem 2rem;
		}

		.exp-top-section {
			flex-direction: column;
		}

		.exp-logo-container {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}

		.exp-timeline-wrapper {
			align-self: flex-start;
		}

		.exp-details-grid {
			grid-template-columns: 1fr;
		}

		.exp-desc-text {
			text-align: left;
		}
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

	/* Tech Badge */
	.tech-badge-wrapper {
		display: flex;
		justify-content: center;
		margin-bottom: 3rem;
	}

	.tech-badge {
		padding: 0.75rem 1.5rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50px;
		font-size: 0.9rem;
		color: #999;
		letter-spacing: 0.5px;
	}

	/* Marquee Animation */
	.marquee-container {
		overflow: hidden;
		position: relative;
		width: 100%;
		margin: 2rem 0;
		mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
		-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
	}

	.marquee-content {
		display: flex;
		gap: 2rem;
		will-change: transform;
	}

	/* Left to Right Animation (Programming) */
	.marquee-ltr {
		animation: marquee-ltr 25s linear infinite;
	}

	/* Right to Left Animation (Tools) */
	.marquee-rtl {
		animation: marquee-rtl 25s linear infinite;
	}

	.marquee-container:hover .marquee-content {
		animation-play-state: paused;
	}

	@keyframes marquee-ltr {
		0% {
			transform: translateX(-50%);
		}
		100% {
			transform: translateX(0);
		}
	}

	@keyframes marquee-rtl {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.tech-marquee-card {
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 160px;
		height: 160px;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 20px;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		position: relative;
		overflow: hidden;
	}

	.tech-marquee-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.tech-marquee-card:hover {
		background: rgba(255, 255, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateY(-10px) scale(1.05);
		box-shadow: 0 20px 60px rgba(255, 255, 255, 0.15);
	}

	.tech-marquee-card:hover::before {
		opacity: 1;
	}

	.tech-marquee-logo {
		width: 80px;
		height: 80px;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.tech-marquee-logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: grayscale(0.2) brightness(0.95);
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.tech-marquee-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		filter: grayscale(0.2) brightness(0.95);
	}

	.tech-marquee-card:hover .tech-marquee-logo img {
		transform: scale(1.15) rotate(5deg);
		filter: grayscale(0) brightness(1.1) drop-shadow(0 0 25px rgba(255, 255, 255, 0.4));
	}

	.tech-marquee-card:hover .tech-marquee-icon {
		transform: scale(1.15) rotate(5deg);
		filter: grayscale(0) brightness(1.1) drop-shadow(0 0 25px rgba(255, 255, 255, 0.4));
	}

	.tech-marquee-name {
		font-size: 0.95rem;
		font-weight: 500;
		color: #888;
		text-align: center;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.tech-marquee-card:hover .tech-marquee-name {
		color: #fff;
		transform: translateY(-3px);
	}

	.soft-skills-grid {
		display: grid;
		gap: 1rem;
		margin-top: 2rem;
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
		grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Compact Project Card with 3D Tilt */
	.project-card-detailed {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 20px;
		overflow: hidden;
		transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
	}

	.project-card-detailed::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.5s ease;
		pointer-events: none;
	}

	.project-card-detailed:hover {
		background: rgba(255, 255, 255, 0.03);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateY(-5px);
		box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
	}

	.project-card-detailed:hover::before {
		opacity: 1;
	}

	.project-card-detailed.featured {
		border-color: rgba(255, 215, 0, 0.2);
	}

	.project-card-detailed.featured:hover {
		border-color: rgba(255, 215, 0, 0.4);
	}

	.featured-badge-new {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 0.5rem 1.2rem;
		background: rgba(255, 215, 0, 0.15);
		border: 1px solid rgba(255, 215, 0, 0.3);
		border-radius: 20px;
		font-size: 0.8rem;
		color: #ffd700;
		font-weight: 600;
		z-index: 10;
		backdrop-filter: blur(10px);
	}

	/* Video Container - Compact */
	.project-media-container {
		position: relative;
		width: 100%;
		height: 280px;
		background: #000;
		overflow: hidden;
	}

	.project-video-player,
	.project-video-iframe {
		width: 100%;
		height: 100%;
		display: block;
		border: none;
		object-fit: contain;
	}

	/* Project Details - Compact */
	.project-details-section {
		padding: 1.8rem 2rem 2rem;
	}

	.project-header-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.project-letter-badge {
		width: 45px;
		height: 45px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.4rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.6);
		flex-shrink: 0;
	}

	.project-header-text {
		flex: 1;
	}

	.project-title-new {
		font-size: 1.3rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.2rem 0;
		line-height: 1.3;
	}

	.project-date {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.4);
		font-weight: 500;
	}

	/* Type Badges - Compact */
	.project-type-section {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-bottom: 1rem;
		flex-wrap: wrap;
	}

	.type-label {
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.5);
		font-weight: 600;
	}

	.type-badge-new {
		padding: 0.35rem 0.8rem;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 12px;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.7);
		font-weight: 600;
	}

	/* Description - Compact */
	.project-description-new {
		font-size: 0.9rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 1.2rem;
	}

	/* Tech Tags - Simple & Clean */
	.project-tech-tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-bottom: 1.2rem;
	}

	.tech-tag-compact {
		padding: 0.4rem 0.9rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 8px;
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		transition: all 0.3s ease;
	}

	.tech-tag-compact:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 0.9);
	}

	/* Action Button - Simple */
	.project-actions {
		display: flex;
		gap: 0.8rem;
		margin-top: 1.2rem;
	}

	.btn-action-compact {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1.2rem;
		border-radius: 8px;
		font-size: 0.85rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s ease;
		color: #fff;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.btn-action-compact:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		transform: translateX(3px);
	}

	.btn-action-compact svg {
		width: 14px;
		height: 14px;
	}

	/* Old project card - keep for backward compatibility */
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

	/* Video Container Styling */
	.project-video-container {
		position: relative;
		width: 100%;
		margin-bottom: 2rem;
		border-radius: 12px;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.3);
		aspect-ratio: 16 / 9;
	}

	.project-video,
	.project-video-iframe {
		width: 100%;
		height: 100%;
		display: block;
		border: none;
		border-radius: 12px;
	}

	.project-video {
		object-fit: cover;
		transition: all 0.3s ease;
	}

	.project-video:hover {
		transform: scale(1.02);
	}

	/* Video loading state */
	.project-video-container::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 50px;
		height: 50px;
		border: 3px solid rgba(255, 255, 255, 0.1);
		border-top-color: rgba(255, 255, 255, 0.5);
		border-radius: 50%;
		animation: video-loading 1s linear infinite;
		z-index: 0;
	}

	@keyframes video-loading {
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	.project-video-iframe {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
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

	/* Contact Section */
	.contact-section {
		position: relative;
		overflow: hidden;
	}

	.contact-container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
		display: grid;
		grid-template-columns: 1fr 1.2fr;
		gap: 4rem;
		align-items: center;
	}

	/* Left Side - Info */
	.contact-info {
		position: relative;
		z-index: 2;
	}

	.contact-content {
		position: relative;
		z-index: 2;
	}

	.contact-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 100px;
		color: #22c55e;
		font-size: 0.875rem;
		font-weight: 500;
		margin-bottom: 1.5rem;
		animation: pulse-border 2s infinite;
	}

	.badge-dot {
		width: 8px;
		height: 8px;
		background: #22c55e;
		border-radius: 50%;
		animation: pulse-dot 2s infinite;
	}

	@keyframes pulse-border {
		0%, 100% {
			box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
		}
		50% {
			box-shadow: 0 0 0 8px rgba(34, 197, 94, 0);
		}
	}

	@keyframes pulse-dot {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.contact-title {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 1.5rem;
		background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.contact-description {
		font-size: 1.1rem;
		line-height: 1.7;
		color: #999;
		margin-bottom: 2.5rem;
	}

	.contact-methods {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.contact-method {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.contact-method:hover {
		background: rgba(255, 255, 255, 0.04);
		border-color: rgba(255, 255, 255, 0.1);
		transform: translateX(5px);
	}

	.method-icon {
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		color: #fff;
		flex-shrink: 0;
	}

	.method-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.method-label {
		font-size: 0.875rem;
		color: #666;
		font-weight: 500;
	}

	.method-value {
		color: #fff;
		font-size: 1rem;
		transition: color 0.3s ease;
	}

	.method-value:hover {
		color: #22c55e;
	}

	.contact-socials {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: #999;
		transition: all 0.3s ease;
	}

	.social-link:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
		color: #fff;
		transform: translateY(-3px);
	}

	/* Floating Shapes */
	.floating-shapes {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}

	.shape {
		position: absolute;
		border-radius: 50%;
		filter: blur(60px);
		opacity: 0.3;
		animation: float 6s ease-in-out infinite;
	}

	.shape-1 {
		width: 200px;
		height: 200px;
		background: rgba(99, 102, 241, 0.2);
		top: 10%;
		left: 10%;
		animation-delay: 0s;
	}

	.shape-2 {
		width: 150px;
		height: 150px;
		background: rgba(168, 85, 247, 0.2);
		bottom: 20%;
		left: 60%;
		animation-delay: 2s;
	}

	.shape-3 {
		width: 180px;
		height: 180px;
		background: rgba(34, 197, 94, 0.15);
		top: 50%;
		left: 30%;
		animation-delay: 4s;
	}

	@keyframes float {
		0%, 100% {
			transform: translate(0, 0) rotate(0deg);
		}
		33% {
			transform: translate(30px, -30px) rotate(120deg);
		}
		66% {
			transform: translate(-20px, 20px) rotate(240deg);
		}
	}

	/* Right Side - Form */
	.contact-form-wrapper {
		position: relative;
	}

	.contact-form-modern {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 20px;
		padding: 2.5rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	.contact-form-modern:hover {
		background: rgba(255, 255, 255, 0.03);
		border-color: rgba(255, 255, 255, 0.12);
	}

	.form-header {
		margin-bottom: 2rem;
	}

	.form-header h3 {
		font-size: 1.75rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #fff;
	}

	.form-header p {
		color: #999;
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 1.5rem;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #ccc;
	}

	.input-group input,
	.input-group textarea {
		width: 100%;
		padding: 0.875rem 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		color: #fff;
		font-size: 0.95rem;
		font-family: inherit;
		transition: all 0.3s ease;
	}

	.input-group input::placeholder,
	.input-group textarea::placeholder {
		color: #666;
	}

	.input-group input:focus,
	.input-group textarea:focus {
		outline: none;
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
	}

	.input-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.submit-btn {
		width: 100%;
		margin-top: 1rem;
		padding: 1rem 2rem;
		background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
		color: #0a0a0a;
		border: none;
		border-radius: 10px;
		font-size: 1rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.submit-btn::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.1);
		transform: translate(-50%, -50%);
		transition: width 0.6s, height 0.6s;
	}

	.submit-btn:hover::before {
		width: 300px;
		height: 300px;
	}

	.submit-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
	}

	.submit-btn svg {
		transition: transform 0.3s ease;
		z-index: 1;
	}

	.submit-btn:hover svg {
		transform: translateX(5px);
	}

	.submit-btn span {
		position: relative;
		z-index: 1;
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
		.nav-container {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.nav-logo {
			order: -1;
		}

		.nav-logo img {
			height: 40px;
		}

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

		.contact-container {
			grid-template-columns: 1fr;
			gap: 3rem;
			padding: 0 1.5rem;
		}

		.contact-title {
			font-size: 1.75rem;
		}

		.contact-description {
			font-size: 1rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.contact-form-modern {
			padding: 2rem 1.5rem;
		}

		.floating-shapes {
			display: none;
		}

		/* About Section 3D Responsive */
		.about-container-3d {
			padding: 0 1.5rem;
		}

		.section-title-3d {
			font-size: 2rem;
		}

		.about-subtitle-3d {
			font-size: 1rem;
		}

		.about-grid-3d {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.bio-card-3d {
			padding: 2rem;
		}

		.bio-text-3d {
			font-size: 1rem;
		}

		.skills-quick {
			flex-direction: column;
		}

		.contact-quick-3d {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.contact-card-3d {
			padding: 1.5rem;
		}

		.bg-elements-3d {
			display: none;
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

		/* Projects Grid Mobile */
		.projects-grid {
			grid-template-columns: 1fr;
		}

		/* New Project Card Responsive */
		.project-card-detailed {
			border-radius: 16px;
		}

		.project-media-container {
			height: 200px;
		}

		.project-details-section {
			padding: 1.5rem;
		}

		.project-title-new {
			font-size: 1.2rem;
		}

		.project-header-row {
			gap: 0.8rem;
		}

		.project-letter-badge {
			width: 40px;
			height: 40px;
			font-size: 1.2rem;
		}

		.project-description-new {
			font-size: 0.85rem;
		}

		.featured-badge-new {
			top: 0.8rem;
			right: 0.8rem;
			padding: 0.4rem 0.9rem;
			font-size: 0.75rem;
		}
	}
</style>
