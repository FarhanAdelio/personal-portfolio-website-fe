import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const [profileRes, experiencesRes, educationRes, skillsRes, projectsRes] = await Promise.all([
			api.getProfile(),
			api.getExperiences(),
			api.getEducation(),
			api.getSkills(),
			api.getProjects()
		]);

		return {
			profile: profileRes.data,
			experiences: experiencesRes.data,
			education: educationRes.data,
			skills: skillsRes.data,
			projects: projectsRes.data
		};
	} catch (error) {
		console.error('Failed to load data:', error);
		return {
			profile: null,
			experiences: [],
			education: [],
			skills: null,
			projects: []
		};
	}
};
