// Static content of the portfolio. Edit this file to personalise it.
// The "Featured Projects" section is NOT here - it comes from the database.

export const PROFILE = {
    firstName: 'Nelmar',
    name: 'Nelmar Penera',
    status: 'Available for work',
    intro: 'I craft clean, purposeful digital experiences — from pixel-perfect interfaces to interactive web apps.',
    email: 'nelmarjohn19@gmail.com', // <- put your real email here
    github: 'https://github.com/your-username',
    photo: '/images/profile.png',
    aboutTitle: ['Turning ideas into', 'living', 'websites.'],
    about: [
        "I'm an Information Technology student passionate about bridging the gap between design and development. I love building interfaces that are not only beautiful but also fast, accessible, and user-friendly.",
        "When I'm not coding, you'll find me playing League of Legends, watching western movies, or drinking coffee three times a day.",
    ],
    facts: [
        { icon: '📍', text: 'Pangasinan, Philippines' },
        { icon: '🎓', text: 'BS Information Technology — 3rd Year' },
        { icon: '💼', text: 'Web Designer & Developer' },
    ],
};

export const SKILLS = [
    { icon: '⚡', title: 'HTML & CSS', level: 100, text: 'Semantic markup, Flexbox, Grid, animations, and responsive design.' },
    { icon: '🖼️', title: 'Photoshop', level: 85, text: 'Image editing, photo manipulation, digital art, and graphic design.' },
    { icon: '🎨', title: 'UI Design', level: 80, text: 'Figma prototyping, wireframing, color theory, and design systems.' },
    { icon: '🖌️', title: 'Illustrator', level: 75, text: 'Vector graphics, logo design, typography, and illustration.' },
];

export const TOOLS = ['Figma', 'VS Code', 'Git & GitHub', 'Photoshop', 'Illustrator', 'Sketch Up', 'Canva', 'Laravel', 'React', 'Tailwind CSS'];

// Used by the admin form (select options) and by the public project cards.
export const CATEGORIES = ['UI Design', '3D Design', 'Illustration', 'Web Development', 'Branding', 'Other'];
export const GRADIENTS = ['green', 'purple', 'amber', 'blue', 'rose'];
