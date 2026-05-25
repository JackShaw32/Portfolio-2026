import { describe, it, expect } from 'vitest';
import { detectForcedTool, wantsAllProjects, isSendMessageIntent, isTextOnlyIntent } from './intentDetection';

describe('detectForcedTool', () => {
  it('detects showSkills', () => {
    expect(detectForcedTool('mostrame tus skills')).toBe('showSkills');
    expect(detectForcedTool('show me tech stack')).toBe('showSkills');
    expect(detectForcedTool('ver stack tecnologico')).toBe('showSkills');
    expect(detectForcedTool('mostrame que herramientas usa')).toBe('showSkills');
    expect(detectForcedTool('mostrame lenguajes que domina')).toBe('showSkills');
  });

  it('detects showContact', () => {
    expect(detectForcedTool('mostrame el contacto')).toBe('showContact');
    expect(detectForcedTool('datos de contacto')).toBe('showContact');
    expect(detectForcedTool('cómo lo contacto')).toBe('showContact');
    expect(detectForcedTool('dónde vive')).toBe('showContact');
  });

  it('detects showAvailability', () => {
    expect(detectForcedTool('está disponible')).toBe('showAvailability');
    expect(detectForcedTool('busca trabajo')).toBe('showAvailability');
    expect(detectForcedTool('quiero contratarlo')).toBe('showAvailability');
    expect(detectForcedTool('hire')).toBe('showAvailability');
  });

  it('detects showProfile', () => {
    expect(detectForcedTool('quien es el')).toBe('showProfile');
    expect(detectForcedTool('tell me about yourself')).toBe('showProfile');
    expect(detectForcedTool('que sabe hacer')).toBe('showProfile');
    expect(detectForcedTool('about eduardo')).toBe('showProfile');
    expect(detectForcedTool('contame sobre vos')).toBe('showProfile');
  });

  it('detects showExperience', () => {
    expect(detectForcedTool('mostrame experiencia')).toBe('showExperience');
    expect(detectForcedTool('show experience')).toBe('showExperience');
    expect(detectForcedTool('educación')).toBe('showExperience');
    expect(detectForcedTool('formación')).toBe('showExperience');
    expect(detectForcedTool('donde estudio')).toBe('showExperience');
  });

  it('detects showProject', () => {
    expect(detectForcedTool('mostrame el proyecto milla')).toBe('showProject');
    expect(detectForcedTool('show me uncuartodemilla')).toBe('showProject');
    expect(detectForcedTool('ver omega')).toBe('showProject');
  });

  it('detects showImpact', () => {
    expect(detectForcedTool('mostrame impacto')).toBe('showImpact');
    expect(detectForcedTool('metricas')).toBe('showImpact');
    expect(detectForcedTool('logros')).toBe('showImpact');
    expect(detectForcedTool('lighthouse scores')).toBe('showImpact');
  });

  it('returns null for send message intent', () => {
    expect(detectForcedTool('quiero enviarle un mensaje')).toBeNull();
    expect(detectForcedTool('send him a message')).toBeNull();
    expect(detectForcedTool('escribirle a edu')).toBeNull();
  });

  it('returns null for general conversation', () => {
    expect(detectForcedTool('hola')).toBeNull();
    expect(detectForcedTool('gracias')).toBeNull();
    expect(detectForcedTool('2+1')).toBeNull();
    expect(detectForcedTool('chau')).toBeNull();
  });

  it('returns null for technology questions (handled by LLM text)', () => {
    expect(detectForcedTool('que sabe de React')).toBeNull();
    expect(detectForcedTool('conoces Node.js')).toBeNull();
  });

  it('detects showRecommendation', () => {
    expect(detectForcedTool('recomiendame a eduardo')).toBe('showRecommendation');
    expect(detectForcedTool('would you recommend him')).toBe('showRecommendation');
    expect(detectForcedTool('lo recomiendas')).toBe('showRecommendation');
    expect(detectForcedTool('es bueno para mi proyecto')).toBe('showRecommendation');
    expect(detectForcedTool('que opinas de eduardo')).toBe('showRecommendation');
    expect(detectForcedTool('why should i hire him')).toBe('showRecommendation');
    expect(detectForcedTool('por que contratarias a eduardo')).toBe('showRecommendation');
  });
});

describe('wantsAllProjects', () => {
  it('detects requests for all projects', () => {
    expect(wantsAllProjects('mostrame todos los proyectos')).toBe(true);
    expect(wantsAllProjects('show all projects')).toBe(true);
    expect(wantsAllProjects('tus proyectos')).toBe(true);
    expect(wantsAllProjects('todos')).toBe(true);
  });

  it('does not match single project requests', () => {
    expect(wantsAllProjects('mostrame milla')).toBe(false);
    expect(wantsAllProjects('show me omega')).toBe(false);
  });
});

describe('isSendMessageIntent', () => {
  it('detects send message intent', () => {
    expect(isSendMessageIntent('quiero enviarle un mensaje')).toBe(true);
    expect(isSendMessageIntent('mandale un mensaje a edu')).toBe(true);
    expect(isSendMessageIntent('send him a message')).toBe(true);
    expect(isSendMessageIntent('escribirle a eduardo')).toBe(true);
    expect(isSendMessageIntent('dejarle un recado')).toBe(true);
  });

  it('does not match unrelated messages', () => {
    expect(isSendMessageIntent('hola')).toBe(false);
    expect(isSendMessageIntent('mostrame skills')).toBe(false);
  });
});

describe('isTextOnlyIntent', () => {
  it('detects impact/metrics requests', () => {
    expect(isTextOnlyIntent('mostrame impacto')).toBe(true);
    expect(isTextOnlyIntent('metricas')).toBe(true);
    expect(isTextOnlyIntent('logros')).toBe(true);
    expect(isTextOnlyIntent('lighthouse')).toBe(true);
  });

  it('does not match unrelated', () => {
    expect(isTextOnlyIntent('hola')).toBe(false);
    expect(isTextOnlyIntent('skills')).toBe(false);
  });
});
