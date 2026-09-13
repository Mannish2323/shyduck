export type Story = { slug:string; title:string; author:string; genre:string; status:string; description:string; cover:string; chapters:number; updated:string };

export const stories: Story[] = [
  { slug:"the-last-dragon", title:"The Last Dragon", author:"Mira Sen", genre:"Fantasy", status:"Ongoing", description:"A quiet cartographer discovers the last sky-dragon hiding inside the maps of a drowned kingdom.", cover:"ember", chapters:18, updated:"2 days ago" },
  { slug:"echoes-of-aether", title:"Echoes of Aether", author:"Arjun Rao", genre:"Anime-inspired", status:"Ongoing", description:"When the city loses its shadows, a student archivist hears a voice calling from tomorrow.", cover:"aether", chapters:12, updated:"5 days ago" },
  { slug:"the-clockwork-city", title:"The Clockwork City", author:"Nila Kapoor", genre:"Sci-fi", status:"Completed", description:"In a city that winds itself every midnight, one apprentice decides to miss the turn.", cover:"city", chapters:26, updated:"1 week ago" },
];

export const featured = stories[0];
