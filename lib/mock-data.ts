import {
  Story,
  Chapter,
  Author,
  Comment,
  Discussion,
  NotificationItem,
  WriterAnalytics,
  AdminMedia,
  AdminReport,
  AdminAuditLog
} from './types';

export const GENRES = [
  'Fantasy',
  'Romance',
  'Action',
  'Adventure',
  'Mystery',
  'Sci-Fi',
  'Horror',
  'Historical',
  'Comedy',
  'Drama',
];

export const LANGUAGES = [
  'English',
  'Hindi',
  'Telugu',
  'Tamil',
  'Kannada',
  'Malayalam',
  'Marathi',
  'Bengali',
  'Gujarati',
  'Punjabi',
];

export const AUTHORS: Author[] = [
  {
    id: 'auth-1',
    username: 'mirasen',
    name: 'Mira Sen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: 'Novelist from Kolkata writing atmospheric fantasy, ancient cartography, and quiet monsters. Tea lover and nocturnal architect.',
    followersCount: 14820,
    followingCount: 42,
    storiesCount: 4,
    completedCount: 2,
    ongoingCount: 2,
    popularStorySlug: 'the-last-dragon',
  },
  {
    id: 'auth-2',
    username: 'arjunrao',
    name: 'Arjun Rao',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bio: 'Bengaluru engineer by daylight, anime-inspired cyberpunk and supernatural novelist by midnight. Obsessed with time loops.',
    followersCount: 22400,
    followingCount: 88,
    storiesCount: 3,
    completedCount: 1,
    ongoingCount: 2,
    popularStorySlug: 'echoes-of-aether',
  },
  {
    id: 'auth-3',
    username: 'nilakapoor',
    name: 'Nila Kapoor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    bio: 'Historian and speculative fiction writer. Blending clockwork steam mechanics with Mughal-era clockmakers.',
    followersCount: 18900,
    followingCount: 31,
    storiesCount: 5,
    completedCount: 3,
    ongoingCount: 2,
    popularStorySlug: 'the-clockwork-city',
  },
  {
    id: 'auth-4',
    username: 'kabirdesh',
    name: 'Kabir Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    bio: 'Martial fantasy and Vedic cyberpunk mythmaker. Creating high-octane battle novels rooted in ancient subcontinent lore.',
    followersCount: 31500,
    followingCount: 15,
    storiesCount: 2,
    completedCount: 0,
    ongoingCount: 2,
    popularStorySlug: 'lotus-in-the-blade',
  },
  {
    id: 'auth-5',
    username: 'ananyaroy',
    name: 'Ananya Roy',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    bio: 'Cozy fantasy, slice-of-life comedy, and intergalactic chai stalls. Stories that feel like a warm hug on a rainy evening.',
    followersCount: 9400,
    followingCount: 120,
    storiesCount: 3,
    completedCount: 2,
    ongoingCount: 1,
    popularStorySlug: 'chai-and-cosmic-dust',
  }
];

export const STORIES: Story[] = [
  {
    id: 'story-1',
    slug: 'the-last-dragon',
    title: 'The Last Dragon',
    subtitle: 'Where ancient maps bleed into living skies.',
    author: { username: 'mirasen', name: 'Mira Sen', avatar: AUTHORS[0].avatar },
    genre: 'Fantasy',
    tags: ['Sky Dragons', 'Cartography', 'Slow Burn', 'Ancient Magic', 'Drowned Kingdom'],
    status: 'Ongoing',
    description: 'A quiet royal cartographer discovers that the ink lines of an uncharted island on a 400-year-old map are shifting every sunrise. As tides swallow the capital, she realizes the kingdom is built directly atop the dormant spine of the world’s last celestial dragon.',
    coverStyle: 'ember',
    language: 'English',
    chaptersCount: 18,
    readsCount: 248900,
    rating: 4.9,
    wordCount: 52400,
    publishedAt: '2025-11-14',
    updatedAt: '2 days ago',
    featured: true,
    characters: [
      {
        id: 'char-1',
        name: 'Tara Varma',
        role: 'Protagonist',
        avatarColor: '#e9b65a',
        description: 'Lead apprentice to the Grand Archive of Sundarban. Unflinching eye for topographical discrepancies.',
        abilities: ['Ink Resonance', 'Starlit Wayfinding', 'Cartographic Decryption'],
        relationships: 'Apprentice to Master Corvus; reluctant ally to Vaelen.'
      },
      {
        id: 'char-2',
        name: 'Vaelen the Ashen',
        role: 'Deuteragonist',
        avatarColor: '#9b91e8',
        description: 'Exiled dragon-speaker from the High Cloud Spire, bearing obsidian scale-marks along his arms.',
        abilities: ['Thunder Tongue', 'Thermal Gliding'],
        relationships: 'Sworn guardian to Tara after her discovery.'
      }
    ],
    world: {
      locations: [
        { name: 'Sundarban Sea Citadel', type: 'Capital City', description: 'Carved out of petrified mangroves and saltwater stone, connected by swaying glass rope-bridges.' },
        { name: 'The Mute Abyss', type: 'Uncharted Locus', description: 'A magnetic blindspot where compasses spin backward and sea mist smells like fresh iron.' }
      ],
      factions: [
        { name: 'The Imperial Guild of Mapmakers', motive: 'Preservation of trade secrets', description: 'Scholars who hold monopoly over navigation and the suppressed dragon prophecies.' },
        { name: 'The Cloud Cloaks', motive: 'Awakening the Titan', description: 'Rebel sky-nomads seeking to crack the continental seals.' }
      ],
      loreItems: [
        { title: 'The Living Vellum', category: 'Artifact', description: 'Parchment harvested from moon-reeds that bleeds genuine seawater when punctured.' },
        { title: 'The Great Submersion', category: 'Historical Event', description: 'Three centuries ago, half the northern continent sank overnight when the first dragon slumbered.' }
      ],
      timeline: [
        { era: 'Year 0', event: 'The Binding Accord', description: 'Dragons were lured into volcanic dormancy by the Seven Sages.' },
        { era: 'Year 289', event: 'The Great Submersion', description: 'Tectonic shift sinks the Iron Coast.' },
        { era: 'Present Year 412', event: 'The Shifting Ink', description: 'Tara discovers moving borders in archive chamber 9.' }
      ]
    }
  },
  {
    id: 'story-2',
    slug: 'echoes-of-aether',
    title: 'Echoes of Aether',
    subtitle: 'When neon neon turns dark, tomorrow speaks.',
    author: { username: 'arjunrao', name: 'Arjun Rao', avatar: AUTHORS[1].avatar },
    genre: 'Sci-Fi',
    tags: ['Cyberpunk', 'Time Travel', 'Anime-inspired', 'Conspiracy', 'Neo-Bengaluru'],
    status: 'Ongoing',
    description: 'In Neo-Bengaluru 2094, shadows are bought and sold on the dark net as memory containers. When student archivist Dev accidentally downloads an orphan shadow, he begins hearing the frantic voice of his own daughter—warning him about a catastrophe occurring tomorrow afternoon.',
    coverStyle: 'aether',
    language: 'English',
    chaptersCount: 14,
    readsCount: 182300,
    rating: 4.8,
    wordCount: 38900,
    publishedAt: '2026-01-05',
    updatedAt: '5 days ago',
    featured: true,
    characters: [
      {
        id: 'char-201',
        name: 'Devansh "Dev" Kulkarni',
        role: 'Protagonist',
        avatarColor: '#58a6ff',
        description: 'Level 2 Data Janitor at AetherCorp. Keeps his neural ports unpatched to dodge corporate telepathy.',
        abilities: ['Sub-quantum Glitch Bypass', 'Photographic Memory'],
        relationships: 'Father to Meera (who has not yet been born in his timeline).'
      }
    ]
  },
  {
    id: 'story-3',
    slug: 'the-clockwork-city',
    title: 'The Clockwork City',
    subtitle: 'Every gear turns to the Emperor’s pulse.',
    author: { username: 'nilakapoor', name: 'Nila Kapoor', avatar: AUTHORS[2].avatar },
    genre: 'Historical',
    tags: ['Steampunk', 'Mughal Tech', 'Political Intrigue', 'Heist', 'Automata'],
    status: 'Completed',
    description: 'Shahjahanabad reimagined as an intricate brass metropolis where massive water-driven escapement towers regulate the daily heartbeat of 3 million citizens. When the Master Horologist is murdered during the Great Solstice wind-up, his daughter must solve the mechanical conspiracy.',
    coverStyle: 'city',
    language: 'English',
    chaptersCount: 26,
    readsCount: 312000,
    rating: 4.95,
    wordCount: 84000,
    publishedAt: '2025-06-18',
    updatedAt: '1 week ago',
    featured: true,
  },
  {
    id: 'story-4',
    slug: 'lotus-in-the-blade',
    title: 'Lotus in the Blade',
    subtitle: 'Bloodlines forged in the fires of Mount Meru.',
    author: { username: 'kabirdesh', name: 'Kabir Deshmukh', avatar: AUTHORS[3].avatar },
    genre: 'Action',
    tags: ['Martial Arts', 'Vedic Myth', 'Wuxia Fusion', 'Revenge', 'Tournament'],
    status: 'Ongoing',
    description: 'Stripped of his family’s celestial blade, disgraced warrior Rudra enters the subterranean Lotus Ring—an underground colosseum where combatants weave kinetic prana into devastating martial strikes. To win his freedom, he must defeat champions sent by the high heavens.',
    coverStyle: 'lotus',
    language: 'Hindi',
    chaptersCount: 22,
    readsCount: 420500,
    rating: 4.85,
    wordCount: 65100,
    publishedAt: '2025-08-20',
    updatedAt: 'Yesterday',
    featured: false,
  },
  {
    id: 'story-5',
    slug: 'chai-and-cosmic-dust',
    title: 'Chai & Cosmic Dust',
    subtitle: 'Serving masala chai at the edge of the galaxy.',
    author: { username: 'ananyaroy', name: 'Ananya Roy', avatar: AUTHORS[4].avatar },
    genre: 'Comedy',
    tags: ['Cozy Sci-Fi', 'Slice of Life', 'Aliens', 'Cooking', 'Heartwarming'],
    status: 'Ongoing',
    description: 'Retired space pilot Bablu opens a street-corner tea stall on Asteroid Outpost 44. Between grumpy crystalline alien diplomats, bureaucratic space inspectors, and a runaway cyber-cat, Bablu proves that a piping hot cup of ginger-cardamom chai can defuse intergalactic skirmishes.',
    coverStyle: 'cosmic',
    language: 'English',
    chaptersCount: 16,
    readsCount: 135000,
    rating: 4.9,
    wordCount: 31000,
    publishedAt: '2026-02-01',
    updatedAt: '3 days ago',
    featured: false,
  },
  {
    id: 'story-6',
    slug: 'shadows-over-shambala',
    title: 'Shadows Over Shambala',
    subtitle: 'The snows remember what mortals dare not name.',
    author: { username: 'mirasen', name: 'Mira Sen', avatar: AUTHORS[0].avatar },
    genre: 'Mystery',
    tags: ['Himalayan Lore', 'Supernatural', 'Noir', 'Folklore', 'Cold Thriller'],
    status: 'Ongoing',
    description: 'A secluded monastery high in the Zanskar range stops replying to radio communications. An investigator with the Archaeological Survey of India treks up through blizzard season only to find prayer wheels spinning in reverse and frozen monks whispering in forgotten tongues.',
    coverStyle: 'shadow',
    language: 'English',
    chaptersCount: 9,
    readsCount: 98000,
    rating: 4.75,
    wordCount: 24500,
    publishedAt: '2026-03-01',
    updatedAt: '6 days ago',
    featured: false,
  },
  {
    id: 'story-7',
    slug: 'celestial-monks-of-varanasi',
    title: 'Celestial Monks of Varanasi',
    subtitle: 'The Ganges flows between mortal banks and cosmic realms.',
    author: { username: 'kabirdesh', name: 'Kabir Deshmukh', avatar: AUTHORS[3].avatar },
    genre: 'Adventure',
    tags: ['Cosmic Fantasy', 'Varanasi', 'Sacred Rivers', 'Portal Fantasy', 'Gods'],
    status: 'Completed',
    description: 'At the Manikarnika Ghat, the evening aarti bells resonate into seven parallel dimensions. When an orphan boatman accidentally ferries a dying star across the river, he is drafted into the order of Celestial Monks tasked with steering souls through interstellar waters.',
    coverStyle: 'monk',
    language: 'Hindi',
    chaptersCount: 30,
    readsCount: 512000,
    rating: 4.92,
    wordCount: 98000,
    publishedAt: '2025-04-10',
    updatedAt: '2 weeks ago',
    featured: false,
  },
  {
    id: 'story-8',
    slug: 'whispers-of-the-deodar-forest',
    title: 'Whispers of the Deodar Forest',
    subtitle: 'Some trees grow roots into human dreams.',
    author: { username: 'nilakapoor', name: 'Nila Kapoor', avatar: AUTHORS[2].avatar },
    genre: 'Horror',
    tags: ['Folk Horror', 'Himachal', 'Atmospheric', 'Slow Dread', 'Occult'],
    status: 'Ongoing',
    description: 'Inheriting an abandoned British-era estate in Shimla seems like a peaceful sabbatical for botanical illustrator Radhika. But as the winter fog settles, the ancient deodar trees begin bleeding amber resin that mimics the laughter of her childhood sister.',
    coverStyle: 'forest',
    language: 'English',
    chaptersCount: 11,
    readsCount: 89000,
    rating: 4.65,
    wordCount: 28000,
    publishedAt: '2026-02-14',
    updatedAt: '4 days ago',
    featured: false,
  }
];

export const CHAPTERS: Record<string, Chapter[]> = {
  'the-last-dragon': [
    {
      id: 'ch-1',
      storySlug: 'the-last-dragon',
      chapterNumber: 1,
      slug: 'chapter-01-the-shifting-vellum',
      title: 'Chapter 01: The Shifting Vellum',
      wordCount: 2450,
      readTimeMin: 9,
      publishedAt: '2025-11-14',
      status: 'Published',
      authorNote: 'Welcome to Sundarban Citadel! Grab a warm cup of tea and pay close attention to the sound of rain in this opening scene.',
      content: `The salt air in archive room nine always tasted of old disasters.

Tara adjusted the brass weights pinning the corners of the ledger. Outside, rain fell upon the Sundarban Citadel like thrown gravel, drumming a relentless cadence across the high stained-glass dome. Three hundred feet below, the black tides of the Gulf of Bengal roared against the sea gates, but here, surrounded by twenty thousand rolls of royal vellum, the world was reduced to the scrape of her steel drafting pen and the hiss of burning tallow.

"Check the boundary line at the southern shelf again," Master Corvus had ordered before hobbling off to the Council of Sea-Marshals. "The tides are gnawing at the eastern breakwater. If the imperial border shifts three nautical miles inward, the Guild must inform the Prince by sundown."

Tara leaned closer, raising her magnifying lens.

The parchment beneath her fingertips was extraordinary. Harvested over two centuries ago from petrified moon-reeds, it possessed a faint luminescence that flickered whenever lightning cleaved the monsoon sky. It was an imperial master-chart: the continent of Aryavarta as mapped before the Great Submersion, when mountains still rose where the ocean now reigned.

She placed her ivory divider on the coordinates for the sunken reef of Kalanag.

Then she froze.

The ink line had moved.

Tara pulled her hand back, pulse thumping against her collarbone. She blinked, shaking away the exhaustion of thirty-six straight hours of archival duty. Ink did not move. Iron gall ink mixed with gum arabic dried into fibers and held for generations. It was the immutable law of cartography.

Yet right before her eyes, an island that had been drawn three leagues west of the Kalanag Trench was trembling. The coastline was visibly contracting, ripples spreading through the paper fibers like oil on black water.

A tiny bead of seawater welled up from the center of the vellum, glistening like fresh sweat on human skin.

"That's impossible," she whispered into the empty vault.

She pressed her thumb against the moisture. It was cold—freezing cold, like ice hauled from the furthest glaciers of the north. And beneath her palm, through four inches of solid mahogany table and sixty feet of coastal granite, Tara felt something vast and deliberate shift deep within the ocean bedrock.

A heartbeat.

Slow. Enormous. Resonating with the weight of a submerged mountain waking from a four-hundred-year sleep.

In the shadows behind the towering cedar shelves, the scent of burning sea-coal suddenly turned to the unmistakable stench of volcanic sulfur and ancient ozone.

The last dragon was breathing.`
    },
    {
      id: 'ch-2',
      storySlug: 'the-last-dragon',
      chapterNumber: 2,
      slug: 'chapter-02-tides-and-talons',
      title: 'Chapter 02: Tides and Talons',
      wordCount: 2890,
      readTimeMin: 11,
      publishedAt: '2025-11-21',
      status: 'Published',
      authorNote: 'Vaelen makes his first appearance in this chapter. Let me know what you think of his scale-marks in the comments!',
      content: `The gong struck midnight across the upper tier of the Citadel, its bronze tone swallowed by the howling wind.

Tara had not moved from the table. She had barricaded the heavy teak door with an iron ledger rack and lit three additional hurricane lanterns. The living parchment was now humming—a frequency so low it rattled the glass inkwells in their brass holders.

"Open the lock, Cartographer."

The voice did not come from the hallway. It came from the rain-slicked ledge outside the lancet window, sixty feet above the surging reef.

Tara snatched her bone-handled bone divider, clutching it like a dagger. "Who is out there? Archive room nine is forbidden by royal decree. The wardens have orders to shoot crossbows on sight."

A pale hand gripped the window frame. Along the forearm, beneath dark homespun wool, Tara caught the gleam of iridescent obsidian scales glistening in the rain.

With a smooth, effortless leverage that defied human anatomy, a tall figure vaulted through the window into the chamber, shaking seawater from a storm cloak like a great falcon.

"The wardens are currently asleep at their posts," the young man said quietly. His voice sounded like grinding river stones. His eyes were the color of molten copper, pupils slit like a reptile adapting to cavernous gloom. "And if you value the lives of the three hundred thousand souls sleeping in this drowned city, girl, you will roll up that vellum and come with me before the high tide arrives."

Tara kept her divider pointed at his throat. "You are Vaelen. The exile from Cloud Spire. Master Corvus said you were executed five winters ago."

The stranger smiled, though there was zero humor in his face. "Corvus told you what the High Council paid him to tell you. Now look at the chart on your desk, apprentice. Look at where the ink is pooling."

Tara glanced sideways.

The ink was no longer drawing an island. It was drawing an eye.

And as she watched, the eye blinked.`
    },
    {
      id: 'ch-3',
      storySlug: 'the-last-dragon',
      chapterNumber: 3,
      slug: 'chapter-03-the-submerged-gate',
      title: 'Chapter 03: The Submerged Gate',
      wordCount: 3120,
      readTimeMin: 12,
      publishedAt: '2025-11-28',
      status: 'Published',
      authorNote: 'Thank you all for 200k reads! Chapter 4 is currently being drafted in the Writer Studio.',
      content: `Descent into the submerged levels of the Citadel was strictly punishable by death in peacetime, and by keelhauling during times of naval alert.

Yet here was Tara, clutching an oilskin tube containing the imperial master-chart, following a branded criminal down a spiraling staircase where saltwater lapped against the stone steps at every third stride.

"Hold the lantern lower," Vaelen muttered, his long cloak trailing in the brine. "The water rats here are the size of mastiffs, and they have grown hungry on drowned grain."

"Where are we going?" Tara demanded, shivering in her soaked tunic. "The lower archives were flooded during the monsoon of 398. There is nothing down here except rotting timbers and the graves of drowned slaves."

"There is an air pocket beneath the old foundations," Vaelen replied, not stopping. "The original builders did not raise this city on coral. They raised it on the vertebrae of the beast's tail. When the dragon turns in its slumber, this entire staircase rotates four degrees."

Tara stopped dead. "You're mad. That was a nursery fable told to scare dockside children into saying their evening prayers."

Vaelen turned. In the yellow glare of the whale-oil lantern, the scales along his cheekbones shimmered with soft gold iridescence.

"Touch the wall, Tara."

Reluctantly, she placed her bare palm against the dripping stone.

It wasn't stone.

The wall was slightly warm. And beneath the slick layer of sea moss, she felt the unmistakable texture of interlocking armored plates, gently flexing with the rhythm of deep, oceanic inhalation.

"It is not a fable," Vaelen whispered. "And it is waking."`
    }
  ],
  'echoes-of-aether': [
    {
      id: 'ch-201',
      storySlug: 'echoes-of-aether',
      chapterNumber: 1,
      slug: 'chapter-01-the-shadow-merchant',
      title: 'Chapter 01: The Shadow Merchant of Brigade Road',
      wordCount: 2600,
      readTimeMin: 10,
      publishedAt: '2026-01-05',
      status: 'Published',
      authorNote: 'First chapter of Echoes! Drop your theories on who the shadow belongs to!',
      content: `The neon monsoons in Neo-Bengaluru always left behind a smell like fried circuit boards and hot jasmine.

Devansh stepped out of the elevated Mag-Lev carriage at Mahatma Gandhi Station, pulling the collar of his thermal slicker up against the electric drizzle. Holographic advertisements for neural implants and synthetic memories reflected in every oily puddle, bathing the crowd in synthetic violet and emerald light.

His neural port at the base of his skull was itching again.

In 2094, the law stated that all citizens over age eighteen must keep their cerebral conduits linked to the AetherCorp Municipal Mesh for civic synchronization. But Dev was a data janitor for the subterranean optical conduits. He knew which cables leaked, which relays were unmonitored, and how to strip a signal down to raw hex without leaving a digital footprint.

He ducked into an alleyway behind the old underground bazaar.

"You're late, Dev," rasped a figure huddled beneath a canvas awning. The seller was known simply as Uncle Solder—a man whose lungs had been replaced with dual hydraulic compressors that wheezed like a bicycle pump.

"Traffic on the outer orbital," Dev lied, tossing a roll of untraceable crypt-tokens onto the stained wooden crate. "Did you find what I asked for?"

The old man hesitated, copper fingers twitching. "I found something better. Or worse. An orphan shadow harvested from the server crash at the Central Archive last Tuesday."

Uncle Solder slid a transparent quartz memory chip across the table. Inside the crystal, something dark and fluid was swirling like trapped ink.

"Whose memory is it?" Dev asked.

"Nobody knows," whispered Uncle Solder. "The biometrics match a girl who hasn't been born yet. And she's calling for you by name."`
    }
  ]
};

export const DISCUSSIONS: Discussion[] = [
  {
    id: 'disc-1',
    title: 'The Great Submersion in "The Last Dragon" was intentional, not an accident. Here is the proof.',
    category: 'Theories',
    author: { username: 'arjunrao', name: 'Arjun Rao', avatar: AUTHORS[1].avatar },
    content: 'If you re-read chapter 2 carefully, Vaelen mentions that the Cloud Cloaks possessed the binding runes forty years BEFORE the cataclysm. This implies the ancient Council deliberately sacrificed the northern continent to create a saltwater seal over the beast. What do you all think?',
    repliesCount: 38,
    likesCount: 142,
    lastActivity: '2 hours ago',
    tags: ['The Last Dragon', 'Lore Theory', 'Plot Discussion']
  },
  {
    id: 'disc-2',
    title: 'How do you write action sequences with emotional weight instead of just choreography?',
    category: 'Writing Advice',
    author: { username: 'kabirdesh', name: 'Kabir Deshmukh', avatar: AUTHORS[3].avatar },
    content: 'In Lotus in the Blade, I try to ensure every strike in a fight scene represents a clash of values rather than just limbs and blades. When Rudra fights his brother, every punch is an argument. What techniques do other creators here use to keep battle scenes dramatic?',
    repliesCount: 64,
    likesCount: 289,
    lastActivity: '4 hours ago',
    tags: ['Writing Tips', 'Pacing', 'Action']
  },
  {
    id: 'disc-3',
    title: 'Who is your comfort character on Shyduck Tales so far?',
    category: 'General',
    author: { username: 'ananyaroy', name: 'Ananya Roy', avatar: AUTHORS[4].avatar },
    content: 'For me it has to be Bablu from Chai & Cosmic Dust, but Tara Varma from The Last Dragon is a very close second because her love for old books feels so relatable!',
    repliesCount: 112,
    likesCount: 380,
    lastActivity: '15 mins ago',
    tags: ['Characters', 'Community']
  }
];

export const COMMENTS: Comment[] = [
  {
    id: 'comm-1',
    targetType: 'chapter',
    targetId: 'ch-1',
    author: { username: 'bookworm_99', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
    content: 'The description of the living vellum gave me literal chills! The line about the heartbeat resonating through sixty feet of coastal granite is masterful storytelling. Cannot wait for chapter 2!',
    isSpoiler: false,
    likesCount: 29,
    createdAt: '2 days ago',
    replies: [
      {
        id: 'rep-1',
        commentId: 'comm-1',
        author: { username: 'mirasen', name: 'Mira Sen', avatar: AUTHORS[0].avatar },
        content: 'Thank you Priya! That specific imagery came to me while standing by the Sundarbans during monsoon storm season last year.',
        likesCount: 18,
        createdAt: '1 day ago'
      }
    ]
  },
  {
    id: 'comm-2',
    targetType: 'chapter',
    targetId: 'ch-1',
    author: { username: 'shadow_reader', name: 'Rohan Mehta', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
    content: 'Watch out! The ink forming an eye in the next chapter is going to reveal that Vaelen has been watching her all along through the water basin!',
    isSpoiler: true,
    likesCount: 41,
    createdAt: '1 day ago'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'chapter',
    title: 'New Chapter Published',
    message: 'Mira Sen published Chapter 03: The Submerged Gate in The Last Dragon.',
    link: '/stories/the-last-dragon/chapters/chapter-03-the-submerged-gate',
    isRead: false,
    createdAt: '2 hours ago'
  },
  {
    id: 'notif-2',
    type: 'follower',
    title: 'New Follower',
    message: 'Arjun Rao started following your creator profile.',
    link: '/authors/arjunrao',
    isRead: false,
    createdAt: '5 hours ago'
  },
  {
    id: 'notif-3',
    type: 'reply',
    title: 'New Reply to your comment',
    message: 'Mira Sen replied to your comment on The Last Dragon.',
    link: '/stories/the-last-dragon#discussion',
    isRead: true,
    createdAt: '1 day ago'
  },
  {
    id: 'notif-4',
    type: 'milestone',
    title: 'Story Milestone Reached! 🎉',
    message: 'The Last Dragon reached 200,000 total reader reads across all chapters.',
    link: '/stories/the-last-dragon',
    isRead: true,
    createdAt: '3 days ago'
  }
];

export const WRITER_ANALYTICS: WriterAnalytics = {
  totalReads: 248900,
  uniqueReaders: 84200,
  totalFollowers: 14820,
  bookmarksCount: 32400,
  commentsCount: 4890,
  avgCompletionRate: 78.4,
  completionRate: 78.4,
  dailyReads: [
    { date: 'Mon', reads: 3200 },
    { date: 'Tue', reads: 4100 },
    { date: 'Wed', reads: 3800 },
    { date: 'Thu', reads: 5600 },
    { date: 'Fri', reads: 6800 },
    { date: 'Sat', reads: 8900 },
    { date: 'Sun', reads: 9400 },
  ],
  chapterPerformance: [
    { chapter: 'Ch. 1', views: 82000, completion: 92 },
    { chapter: 'Ch. 2', views: 68000, completion: 86 },
    { chapter: 'Ch. 3', views: 54000, completion: 81 },
    { chapter: 'Ch. 4', views: 44900, completion: 76 },
  ],
  readsOverTime: [
    { date: 'Apr 2026', reads: 42000 },
    { date: 'May 2026', reads: 88000 },
    { date: 'Jun 2026', reads: 135000 },
    { date: 'Jul 2026', reads: 172000 },
    { date: 'Aug 2026', reads: 215000 },
    { date: 'Sep 2026', reads: 248900 },
  ],
  chapterDropoff: [
    { chapterNumber: 1, views: 248900 },
    { chapterNumber: 2, views: 221000 },
    { chapterNumber: 3, views: 198500 },
    { chapterNumber: 4, views: 184200 },
    { chapterNumber: 5, views: 175000 },
    { chapterNumber: 6, views: 168900 },
    { chapterNumber: 7, views: 161200 },
    { chapterNumber: 8, views: 154000 },
  ]
};

export const ADMIN_MEDIA: AdminMedia[] = [
  {
    id: 'med-1',
    fileName: 'ember_cover_hd.webp',
    fileType: 'image/webp',
    fileSize: '1.4 MB',
    owner: 'mirasen',
    usedInStories: ['the-last-dragon'],
    uploadedAt: '2025-11-10',
    previewColor: '#60333c'
  },
  {
    id: 'med-2',
    fileName: 'aether_neon_banner.webp',
    fileType: 'image/webp',
    fileSize: '2.1 MB',
    owner: 'arjunrao',
    usedInStories: ['echoes-of-aether'],
    uploadedAt: '2026-01-02',
    previewColor: '#2e5673'
  },
  {
    id: 'med-3',
    fileName: 'mascot_duck_brand.svg',
    fileType: 'image/svg+xml',
    fileSize: '48 KB',
    owner: 'system_admin',
    usedInStories: ['the-last-dragon', 'the-clockwork-city', 'lotus-in-the-blade'],
    uploadedAt: '2025-01-01',
    previewColor: '#e9b65a'
  }
];

export const ADMIN_REPORTS: AdminReport[] = [
  {
    id: 'rep-101',
    targetType: 'comment',
    targetId: 'comm-2',
    targetTitle: 'Comment on The Last Dragon Ch. 1',
    reporter: 'user_aarav_21',
    reason: 'Unmarked major spoiler regarding character backstory',
    contentSnippet: 'Watch out! The ink forming an eye in the next chapter is going to reveal...',
    status: 'Pending',
    createdAt: '3 hours ago'
  },
  {
    id: 'rep-102',
    targetType: 'story',
    targetId: 'story-8',
    targetTitle: 'Whispers of the Deodar Forest',
    reporter: 'creator_anon',
    reason: 'Inquiry regarding potential similarity to regional folktale',
    contentSnippet: 'Inheriting an abandoned British-era estate in Shimla seems like a peaceful...',
    status: 'Reviewing',
    createdAt: '1 day ago'
  }
];

export const ADMIN_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-1',
    admin: 'admin_manish',
    action: 'FEATURE_STORY',
    target: 'The Last Dragon',
    beforeValue: 'Featured: false',
    afterValue: 'Featured: true (Slot 1)',
    timestamp: '2026-09-12 18:32:10'
  },
  {
    id: 'log-2',
    admin: 'admin_manish',
    action: 'RESOLVE_REPORT',
    target: 'Report #rep-099',
    beforeValue: 'Status: Pending',
    afterValue: 'Status: Resolved (Warning issued)',
    timestamp: '2026-09-11 14:15:44'
  }
];
