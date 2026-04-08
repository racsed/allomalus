import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.enum(['guide', 'actualite', 'conseil']),
    tags: z.array(z.string()),
    slug: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
