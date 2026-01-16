import { api } from '$lib/api';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const [profileRes, experiencesRes, skillsRes, projectsRes] = await Promise.all([
			api.getProfile(),
			api.getExperiences(),
			api.getSkills(),
			api.getProjects()
		]);

		return {
			profile: profileRes.data,
			experiences: experiencesRes.data,
			skills: skillsRes.data,
			projects: projectsRes.data
		};
	} catch (error) {
		console.error('Failed to load data:', error);
		return {
			profile: null,
			experiences: [],
			skills: null,
			projects: []
		};
	}
};
