// All site content: name, bio, contact links and the list of works.
//
// Media: `file` / `poster` / `loop` are file names inside media/. To use a file
// hosted elsewhere, put its full URL in `src` / `posterSrc` / `loopSrc` instead.
// For sites, `url` is the link the "Visit site" button opens.

export const MEDIA_BASE = 'media/';

export const PROFILE = {
    name: ['Euan', 'Mathieu'],
    bio: 'Designer, video editor, motion graphics editor and web developer. Posters, short-form video, motion graphics and websites for churches, ministries and brands.',
    // Shown in the profile panel.
    about: [
        'I make the things people see first: event posters, sermon graphics, short-form ads, ministry films and the websites that hold them.',
        'Based in the Philippines. Open for freelance and collaborations.'
    ],
    services: ['Graphic design', 'Video editing', 'Motion & animation', 'Web design & development'],
    // Icon buttons at the bottom; only the icon and label show, never the
    // address. icon: email | instagram | whatsapp | telegram | tiktok
    links: [
        { label: 'Email', icon: 'email', href: 'mailto:euanthieu@gmail.com' },
        { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/uanthieu/' },
        { label: 'WhatsApp', icon: 'whatsapp', href: 'https://wa.me/639950808552' },
        { label: 'Telegram', icon: 'telegram', href: 'https://t.me/+639950808552' }
    ]
};

// type: 'image' | 'video' | 'site'
// featured: true puts a work in the big column, and the page opens centred on it.
// For videos: `file` is the full video (lightbox), `loop` the short muted
// tile preview, `poster` the still frame.
export const WORKS = [
    { id: 'family-day-2026', type: 'image', title: 'Family Day 2026', category: 'Poster', year: 2026, file: 'family-day-2026.jpg', w: 1400, h: 990 },
    { id: 'pastor-salamat-po', type: 'video', title: 'Pastor, Salamat Po', category: 'Animation', file: 'pastor-salamat-po.mp4', loop: 'pastor-salamat-po-loop.mp4', poster: 'pastor-salamat-po.jpg', w: 1920, h: 1080 },
    { id: 'connect', type: 'image', title: 'Connect — YTH GIG', category: 'Poster', client: 'Glorious Youth', year: 2023, file: 'connect.jpg', w: 1080, h: 1350 },
    { id: 'psyche-tag-ulan', type: 'video', title: 'Psyche — Tag-ulan', category: 'TikTok ad', file: 'psyche-tag-ulan.mp4', loop: 'psyche-tag-ulan-loop.mp4', poster: 'psyche-tag-ulan.jpg', w: 1080, h: 1920 },
    { id: 'zoltalk', type: 'site', title: 'ZolTalk', category: 'Website', url: 'https://zoltalk.com/', file: 'zoltalk.jpg', w: 1440, h: 900 },
    { id: 'yth-gig-collage', type: 'image', title: 'YTH GIG — Collage', category: 'Poster', client: 'Glorious Youth', file: 'yth-gig-collage.jpg', w: 1349, h: 1688 },
    { id: 'protect-your-testimony', type: 'image', title: 'Protect Your Testimony', category: 'Sermon notes', client: 'Glorious Church', file: 'protect-your-testimony.jpg', w: 1080, h: 1350 },
    { id: 'benefit-dinner', type: 'video', featured: true, title: 'Benefit Dinner', category: 'Film', client: 'Helping Hands', file: 'benefit-dinner.mp4', loop: 'benefit-dinner-loop.mp4', poster: 'benefit-dinner.jpg', w: 1080, h: 1350 },
    { id: 'yth-night', type: 'image', title: 'YTH Night', category: 'Poster', client: 'Glorious Youth', file: 'yth-night.jpg', w: 1080, h: 1080 },
    { id: 'living-on-the-word', type: 'image', title: 'Living on the Word of God', category: 'Sermon notes', client: 'Glorious Church', file: 'living-on-the-word.jpg', w: 1080, h: 1350 },
    { id: 'legal-terminal', type: 'video', title: 'Legal Terminal — Walkthrough', category: 'Product film', file: 'legal-terminal.mp4', loop: 'legal-terminal-loop.mp4', poster: 'legal-terminal.jpg', w: 1920, h: 1080 },
    { id: 'lead-up', type: 'image', title: 'Lead Up', category: 'Poster', client: 'Glorious Youth', file: 'lead-up.jpg', w: 749, h: 1074 },
    { id: 'psyche-makapaniwala', type: 'video', title: 'Psyche — Makapaniwala', category: 'TikTok ad', file: 'psyche-makapaniwala.mp4', loop: 'psyche-makapaniwala-loop.mp4', poster: 'psyche-makapaniwala.jpg', w: 1080, h: 1920 },
    { id: 'be-separated', type: 'image', title: 'Be Separated', category: 'Typography', client: 'Glorious Church', file: 'be-separated.jpg', w: 1080, h: 1350 },
    { id: 'ignyt-city', type: 'site', title: 'IGNYT City — Merch', category: 'Website', url: 'https://ignytcity.vercel.app/', file: 'ignyt-city.jpg', w: 1440, h: 900 },
    { id: 'yth-gig-0308', type: 'image', title: 'YTH GIG 03.08', category: 'Poster', client: 'Glorious Youth', file: 'yth-gig-0308.jpg', w: 1080, h: 1080 },
    { id: 'weekly-schedule', type: 'image', title: 'Weekly Schedule', category: 'Social', client: 'Glorious Church', file: 'weekly-schedule.jpg', w: 1080, h: 1350 },
    { id: 'giving-tuesday', type: 'video', title: 'Giving Tuesday', category: 'Film', client: 'Helping Hands', file: 'giving-tuesday.mp4', loop: 'giving-tuesday-loop.mp4', poster: 'giving-tuesday.jpg', w: 1080, h: 1920 },
    { id: 'this-week-at-glorious', type: 'image', title: 'This Week at Glorious', category: 'Social', client: 'Glorious Church', file: 'this-week-at-glorious.jpg', w: 1080, h: 1350 },
    { id: 'psyche-4-gamit', type: 'video', title: 'Psyche — 4 Gamit', category: 'TikTok ad', file: 'psyche-4-gamit.mp4', loop: 'psyche-4-gamit-loop.mp4', poster: 'psyche-4-gamit.jpg', w: 1080, h: 1920 },
    { id: 'yth-gig-pixel', type: 'image', title: 'Glorious YTH GIG', category: 'Poster', client: 'Glorious Youth', file: 'yth-gig-pixel.jpg', w: 1080, h: 1350 }
];
