export const EDITION20 = {
  name: "MeetUp Pro 2.0",
  stats: [
    { count: 800, suffix: "+", label: "Attendees" },
    { count: 50, suffix: "+", label: "Expert speakers" },
    { count: 30, suffix: "+", label: "Sponsoring companies" },
  ],
  about: [
    "MeetUp Pro 2.0 was a groundbreaking event that brought together the brightest minds in business and technology. With over 800 attendees, 50+ expert speakers, and 30+ sponsoring companies, we created an ecosystem of innovation and collaboration that set new standards for B2B networking events in the Sahel region.",
    "The event featured cutting-edge panels, hands-on workshops, and unparalleled networking opportunities that resulted in numerous successful partnerships and business ventures.",
  ],
  agenda: [
    { time: "9:00 → 10:00", title: "Check in" },
    { time: "10:00 → 10:30", title: "Opening", desc: "Musical opening, GFI keynote, AIESEC keynote, Main partner keynote" },
    { time: "10:30 → 11:00", title: "Networking + Coffee Break" },
    { time: "11:00 → 11:15", title: "Partner’s Keynote" },
    { time: "11:15 → 12:30", title: "Discussion Panel", desc: "AI & Entrepreneurship Intersection" },
    { time: "12:30 → 13:00", title: "Coffee Break" },
    { time: "12:30 → 15:00", title: "Business Fair & B2B Networking Space + AIESECers Space" },
    { time: "15:30 → 16:00", title: "Consultancy Spaces with Startup Experts" },
    { time: "16:00 → 17:00", title: "Startup Pitching" },
    { time: "17:00 → 17:30", title: "Closing" },
  ],
  speakers: [
    { name: "Dr Emna JEMMALI", role: "Co-fondatrice · TedX Speaker", org: "1kub", a: "#1DE123", b: "#1ADBA8" },
    { name: "Khouloud BEN CHEIKH", role: "AI Product Manager · ML Developer", org: "Ozeol", a: "#1ADBA8", b: "#0FCDF3" },
    { name: "Khaled ALIMI", role: "Host & Producer · Voice-over Artist", org: "Fama Menou Podcast", a: "#0FCDF3", b: "#1DE123" },
    { name: "Khaled KHALIFA", role: "Digital Transformation Specialist", org: "GIZ Tunisie", a: "#1DE123", b: "#0FCDF3" },
    { name: "Imed HANANA", role: "Expert Ecosystème IA · CIO", org: "SCET-TUNISIE", a: "#1ADBA8", b: "#1DE123" },
    { name: "Ilyes TALBI", role: "Computer Vision · Speaker · Trainer", org: "Freelancer", a: "#0FCDF3", b: "#1ADBA8" },
  ],
  testimonials: [
    {
      quote: "Dundill had a great experience at MeetUp Pro 2.0. The event provided a valuable platform to connect with like-minded professionals and explore opportunities for collaboration.",
      name: "Firas Kacem", role: "CEO @ Dundill",
    },
    {
      quote: "Our participation as the Tunisian Health Bureau at MeetUp Pro 2.0 had a profound positive impact on our brand’s visibility. The event provided an invaluable platform to showcase our expertise and connect with key players across different sectors.",
      name: "Azza Amamou", role: "Head of Marketing @ THB",
    },
    {
      quote: "Notre participation à MeetUp Pro 2.0 a été une formidable occasion de créer des connexions et de présenter notre solution à un public diversifié et engagé.",
      name: "Amine Miladi", role: "CEO @ Bitaqa.tn",
    },
  ],
};

export function initialsOf(name) {
  return name
    .replace(/^Dr\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}
