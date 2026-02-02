import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllDocs, getDocBySlug } from '$lib/server/docs';

export const prerender = true;

export const entries = async () => {
	const docs = await getAllDocs();
	return docs.map((doc) => ({ slug: doc.slug }));
};

export const load: PageServerLoad = async ({ params }) => {
	const doc = await getDocBySlug(params.slug);

	if (!doc) {
		throw error(404, 'Document not found');
	}

	return {
		doc
	};
};
