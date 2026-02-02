import matter from 'gray-matter';
import { marked } from 'marked';

export type DocEntry = {
	slug: string;
	title: string;
	summary: string;
	order: number;
	category: string;
	content: string;
	html: string;
	plainText: string;
	toc: { id: string; text: string; level: number }[];
};

const slugify = (value: string) =>
	value
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');

const renderer = new marked.Renderer();
renderer.heading = (text: string | { text?: string; depth?: number }, level?: number) => {
	const headingText = typeof text === 'string' ? text : text?.text ?? String(text);
	const headingLevel = typeof level === 'number' ? level : text?.depth ?? 2;
	const id = slugify(headingText);
	return `<h${headingLevel} id="${id}">${headingText}</h${headingLevel}>`;
};

marked.setOptions({
	mangle: false,
	headerIds: false,
	renderer
});

const docFiles = import.meta.glob('/src/content/docs/*.md', {
	query: '?raw',
	import: 'default'
});

const stripHtml = (value: string) =>
	value
		.replace(/<[^>]*>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

const slugFromPath = (path: string) => path.split('/').pop()?.replace(/\.md$/, '') ?? '';

export const getAllDocs = async (): Promise<DocEntry[]> => {
	const entries = await Promise.all(
		Object.entries(docFiles).map(async ([path, resolver]) => {
			const raw = (await resolver()) as string;
			const { data, content } = matter(raw);
			const toc = Array.from(content.matchAll(/^(#{1,3})\s+(.+)$/gm)).map((match) => ({
				level: match[1].length,
				text: match[2].trim(),
				id: slugify(match[2])
			}));
			const html = String(marked.parse(content));
			const plainText = stripHtml(html);
			const slug = slugFromPath(path);
			const title =
				typeof data.title === 'string'
					? data.title
					: content.split('\n').find((line) => line.startsWith('# '))?.replace('# ', '') ??
						slug.replace(/-/g, ' ');
			const summary =
				typeof data.summary === 'string'
					? data.summary
					: plainText.split(' ').slice(0, 28).join(' ') + '...';
			const order = typeof data.order === 'number' ? data.order : 999;
			const category = typeof data.category === 'string' ? data.category : 'General';

			return {
				slug,
				title,
				summary,
				order,
				category,
				content,
				html,
				plainText,
				toc
			};
		})
	);

	return entries.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
};

export const getDocBySlug = async (slug: string): Promise<DocEntry | undefined> => {
	const docs = await getAllDocs();
	return docs.find((doc) => doc.slug === slug);
};
