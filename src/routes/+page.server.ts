import type { PageServerLoad } from './$types';
import { getAllDocs } from '$lib/server/docs';

export const load: PageServerLoad = async () => {
	const docs = await getAllDocs();

	return {
		docs
	};
};
