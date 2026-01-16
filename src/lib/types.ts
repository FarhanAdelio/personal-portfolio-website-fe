export interface Profile {
	name: string;
	title: string;
	bio: string;
	email: string;
	phone: string;
	location: string;
	avatar: string;
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
	location: string;
	startDate: string;
	endDate: string;
	description: string;
	technologies: string[];
	achievements?: string[];
}

export interface Education {
	id: number;
	institution: string;
	degree: string;
	field: string;
	startDate: string;
	endDate: string;
	gpa?: string;
	description: string;
}

export interface Skill {
	name: string;
	level: number;
}

export interface Skills {
	technical: Skill[];
	soft: string[];
	tools: string[];
}

export interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	technologies: string[];
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
