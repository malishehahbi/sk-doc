import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getDocBySlug } from '$lib/server/docs';

export const load: PageServerLoad = async ({ params }) => {
	const doc = await getDocBySlug(params.slug);

	if (!doc) {
		throw error(404, 'Document not found');
	}

	return {
		doc
	};
};
