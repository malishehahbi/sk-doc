import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getAllDocs } from '$lib/server/docs';

export const load: PageServerLoad = async () => {
	const docs = await getAllDocs();
	if (docs.length > 0) {
		throw redirect(302, `/docs/${docs[0].slug}`);
	}
	return {};
};
