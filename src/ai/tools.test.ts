import { describe, it, expect, vi } from 'vitest';
import { toolsDefinition } from './tools';

// Mock the email service so unit tests never send real emails via Resend.
vi.mock('../services/emailService', () => ({
  sendEmail: vi.fn(async () => ({ success: true })),
}));

describe('showProject', () => {
  const execute = toolsDefinition.showProject.execute as (args: any) => any;

  it('returns fallback when title is missing', async () => {
    const result = await execute({});
    expect(result).toEqual({ title: 'Proyecto', description: '', tech: [], url: '#', image: '' });
  });

  it('sanitizes and whitelists URL', async () => {
    const result = await execute({
      title: 'Test', description: 'Desc', tech: 'React,Node',
      url: 'https://uncuartodemilla.com/', image: '/projects/14milla.webp',
    });
    expect(result.url).toBe('https://uncuartodemilla.com/');
  });

  it('replaces unlisted URL with #', async () => {
    const result = await execute({
      title: 'Test', description: 'Desc', tech: 'React',
      url: 'https://evil.com/', image: '/projects/14milla.webp',
    });
    expect(result.url).toBe('#');
  });

  it('replaces unlisted image with empty string', async () => {
    const result = await execute({
      title: 'Test', description: 'Desc', tech: 'React',
      url: 'https://uncuartodemilla.com/', image: '/projects/hacked.webp',
    });
    expect(result.image).toBe('');
  });

  it('parses tech string into array', async () => {
    const result = await execute({
      title: 'Test', description: 'Desc', tech: 'React,Node.js,TypeScript',
      url: 'https://uncuartodemilla.com/', image: '/projects/14milla.webp',
    });
    expect(result.tech).toEqual(['React', 'Node.js', 'TypeScript']);
  });

  it('handles missing tech field', async () => {
    const result = await execute({
      title: 'Test', description: 'Desc',
      url: 'https://uncuartodemilla.com/', image: '/projects/14milla.webp',
    });
    expect(result.tech).toEqual([]);
  });

  it('sanitizes HTML from inputs', async () => {
    const result = await execute({
      title: '<script>alert("xss")</script>Test',
      description: '<b>Desc</b>',
      tech: 'React',
      url: 'https://uncuartodemilla.com/', image: '/projects/14milla.webp',
    });
    expect(result.title).not.toContain('<script>');
    expect(result.description).not.toContain('<b>');
  });
});

describe('showContact', () => {
  const execute = toolsDefinition.showContact.execute as () => any;

  it('returns all contact fields', async () => {
    const result = await execute();
    expect(result).toHaveProperty('linkedin');
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('github');
    expect(result).toHaveProperty('phone');
    expect(result.email).toBe('jackshaw@live.com.ar');
  });
});

describe('showSkills', () => {
  const execute = toolsDefinition.showSkills.execute as () => any;

  it('returns categorized skills', async () => {
    const result = await execute();
    expect(result.categories).toBeInstanceOf(Array);
    expect(result.categories.length).toBeGreaterThan(0);
    expect(result.categories[0]).toHaveProperty('name');
    expect(result.categories[0]).toHaveProperty('skills');
  });
});

describe('showExperience', () => {
  const execute = toolsDefinition.showExperience.execute as () => any;

  it('returns experience items', async () => {
    const result = await execute();
    expect(result.items).toBeInstanceOf(Array);
    expect(result.items.length).toBeGreaterThan(0);
    expect(result.items[0]).toHaveProperty('period');
    expect(result.items[0]).toHaveProperty('role');
  });
});

describe('showProfile', () => {
  const execute = toolsDefinition.showProfile.execute as () => any;

  it('returns profile fields', async () => {
    const result = await execute();
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('role');
    expect(result).toHaveProperty('location');
    expect(result).toHaveProperty('stack');
    expect(result.stack).toBeInstanceOf(Array);
  });
});

describe('showAvailability', () => {
  const execute = toolsDefinition.showAvailability.execute as () => any;

  it('returns availability info', async () => {
    const result = await execute();
    expect(result).toHaveProperty('available');
    expect(result).toHaveProperty('availableFrom');
    expect(result).toHaveProperty('preferredRoles');
    expect(result.preferredRoles).toBeInstanceOf(Array);
  });
});

describe('showRecommendation', () => {
  const execute = toolsDefinition.showRecommendation.execute as () => any;

  it('returns recommendation data', async () => {
    const result = await execute();
    expect(result).toHaveProperty('strengths');
    expect(result).toHaveProperty('idealFor');
    expect(result).toHaveProperty('differentiators');
    expect(result).toHaveProperty('recommendationScore');
    expect(result.strengths).toBeInstanceOf(Array);
    expect(result.recommendationScore).toBeGreaterThan(0);
  });
});

describe('showArchitecture', () => {
  const execute = toolsDefinition.showArchitecture.execute as () => any;

  it('returns architecture data with portfolio and projects', async () => {
    const result = await execute();
    expect(result).toHaveProperty('portfolio');
    expect(result).toHaveProperty('projects');
    expect(result.portfolio).toHaveProperty('layers');
    expect(result.portfolio).toHaveProperty('flow');
    expect(result.projects).toBeInstanceOf(Array);
  });
});

describe('showImpact', () => {
  const execute = toolsDefinition.showImpact.execute as () => any;

  it('returns metrics and lighthouse', async () => {
    const result = await execute();
    expect(result.metrics).toBeInstanceOf(Array);
    expect(result.lighthouse).toHaveProperty('performance');
    expect(result.lighthouse).toHaveProperty('seo');
  });
});

describe('sendContactForm', () => {
  const execute = toolsDefinition.sendContactForm.execute as (args: any) => any;

  it('validates email format', async () => {
    const result = await execute({
      name: 'Test', email: 'notanemail', message: 'Hello, this is a test message!',
    });
    expect(result.success).toBe(false);
    expect(result.reason).toBe('invalid_email');
  });

  it('validates message length', async () => {
    const result = await execute({
      name: 'Test', email: 'test@example.com', message: 'short',
    });
    expect(result.success).toBe(false);
    expect(result.reason).toBe('missing_message');
  });

  it('sanitizes HTML tags from inputs', async () => {
    const result = await execute({
      name: '<script>alert("xss")</script>Test',
      email: 'test@example.com',
      message: 'This is a valid test message with enough length',
    });
    expect(result.success).toBe(true);
  });
});
