const { contactSchema, jobSchema, blogSchema } = require('./validation');

describe('validation schemas', () => {
  test('contact validation accepts a complete request', () => {
    const result = contactSchema.safeParse({ name: 'Bilal', email: 'bilal@example.com', message: 'I would like to work with HisabDo.' });
    expect(result.success).toBe(true);
  });

  test('contact validation rejects invalid email and short message', () => {
    const result = contactSchema.safeParse({ name: 'B', email: 'invalid', message: 'short' });
    expect(result.success).toBe(false);
  });

  test('job and blog schemas reject unsafe slugs', () => {
    expect(jobSchema.safeParse({ title: 'Backend engineer', slug: 'Backend Engineer', description: 'A useful role description.', location: 'Remote', employmentType: 'full-time' }).success).toBe(false);
    expect(blogSchema.safeParse({ title: 'Post', slug: 'valid-post', excerpt: 'A useful excerpt.', content: 'This is enough content for a blog post body.' }).success).toBe(true);
  });
});
