export interface Profile {
	name: string;
	title: string;
	subtitle?: string;
	tagline: string;
	bio: string;
	email: string;
	phone: string;
	location: string;
	careerInterests?: string[];
	social: {
		github?: string;
		linkedin?: string;
		twitter?: string;
	};
}

export interface Experience {
	id: number;
	company: string;
	position: string;
	type?: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string;
	technologies: string[];
	achievements?: string[];
	learnings?: string[];
}

export interface Education {
	id: number;
	institution: string;
	degree: string;
	field: string;
	startDate: string;
	endDate: string;
	status?: string;
	gpa?: string;
	description: string;
	relevantCourses?: string[];
	coreCompetencies?: string[];
}

export interface Skill {
	name: string;
	level: number;
	icon?: string;
	logo?: string;
}

export interface Tool {
	name: string;
	icon?: string;
	logo?: string;
}

export interface Skills {
	analytical?: Skill[];
	dataSkills?: Skill[];
	programming?: Skill[];
	softSkills?: string[];
	tools?: Tool[];
}

export interface Project {
	id: number;
	title: string;
	category?: string;
	description: string;
	image?: string;
	technologies: string[];
	highlights?: string[];
	githubUrl?: string;
	liveUrl?: string;
	featured?: boolean;
	features?: string[];
}

export interface ContactMessage {
	name: string;
	email: string;
	subject?: string;
	message: string;
}
