import type { LayoutServerLoad } from './$types';
import { getAllDocs } from '$lib/server/docs';

export const prerender = true;

export const load: LayoutServerLoad = async () => {
	const docs = await getAllDocs();
	return { docs };
};
