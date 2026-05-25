import { describe, it, expect } from 'vitest';

const TOOL_NAMES = ['sendContactForm', 'showProject', 'showContact', 'showSkills', 'showProfile', 'showExperience', 'showAvailability'].join('|');

const XML_TOOL_RE = /<?function[=/](\w+)>([\s\S]*?)(?:<\/function>|<?function(?![=/\w])|$)/g;
const NATURAL_TOOL_RE = new RegExp(`(${TOOL_NAMES})\\s*\\(\\s*\\{[^}]+\\}\\s*\\)`, 'gi');

describe('XML_TOOL_RE', () => {
  it('matches <function=sendContactForm>...</function>', () => {
    const text = '<function=sendContactForm>{"name":"Juan"}</function>';
    XML_TOOL_RE.lastIndex = 0;
    const match = XML_TOOL_RE.exec(text);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('sendContactForm');
  });

  it('matches <?function/showProject>...', () => {
    const text = '<?function/showProject>{"title":"Test"}';
    XML_TOOL_RE.lastIndex = 0;
    const match = XML_TOOL_RE.exec(text);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('showProject');
  });
});

describe('NATURAL_TOOL_RE', () => {
  it('matches sendContactForm({...})', () => {
    const text = 'Estableci la conexion con sendContactForm({ name: "Juan", email: "test@test.com", message: "Hola" })';
    NATURAL_TOOL_RE.lastIndex = 0;
    const match = NATURAL_TOOL_RE.exec(text);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('sendContactForm');
  });

  it('matches bare sendContactForm({...})', () => {
    const text = 'sendContactForm({name:"Juan",email:"test@test.com",message:"Hola"})';
    NATURAL_TOOL_RE.lastIndex = 0;
    const match = NATURAL_TOOL_RE.exec(text);
    expect(match).not.toBeNull();
    expect(match![1]).toBe('sendContactForm');
  });
});
