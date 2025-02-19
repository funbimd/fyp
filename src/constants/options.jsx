export const SelectTravelList = [
  {
    id: 1,
    title: "Just me",
    desc: "A sole travels in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "Me and Bae",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "The Family",
    desc: "A group of fun loving adventure",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "🛥️",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about the cost",
    icon: "💸",
  },
];

export const AI_PROMPT = `
Generate a Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget. 
Give me Hotel options list with Hotel Name, Hotel Address, Pricing, Hotel image url from public image sources (Unsplash, Pexels, or Pixabay), geo coordinates, rating, descriptions. 
Also, suggest an itinerary with place name, place details, place image url from public image sources (Unsplash, Pexels, or Pixabay), ticket pricing, rating, time travel for each of the locations for {totalDays} days with each day plan, and include the best time to visit, all in JSON format.
Ensure that the image URLs are publicly accessible and appropriate for use in a travel website or app.
`;
