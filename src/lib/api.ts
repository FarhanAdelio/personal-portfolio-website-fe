const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

async function fetchAPI(endpoint: string, options = {}) {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		},
		...options
	});

	if (!response.ok) {
		throw new Error(`API Error: ${response.statusText}`);
	}

	return response.json();
}

export const api = {
	// Profile
	getProfile: () => fetchAPI('/profile'),

	// Experiences
	getExperiences: () => fetchAPI('/experiences'),
	getExperience: (id: string) => fetchAPI(`/experiences/${id}`),

	// Education
	getEducation: () => fetchAPI('/education'),
	getEducationDetail: (id: string) => fetchAPI(`/education/${id}`),

	// Skills
	getSkills: () => fetchAPI('/skills'),

	// Projects
	getProjects: () => fetchAPI('/projects'),
	getProject: (id: string) => fetchAPI(`/projects/${id}`),

	// Contact
	sendContactMessage: (data: {
		name: string;
		email: string;
		subject?: string;
		message: string;
	}) =>
		fetchAPI('/contact', {
			method: 'POST',
			body: JSON.stringify(data)
		})
};
