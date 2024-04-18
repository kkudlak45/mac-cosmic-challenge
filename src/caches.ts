export type Geocache = {
  gcCode: string;
  name: string;
}

export type Answer = {
  gcCode: string;
  answer: string;
  correct: boolean;
}

export const GEOCACHES: Geocache[] = [
  { gcCode: "GCAJVZ1", name: "Aliens are Always Watching Above" },
  { gcCode: "GCAM0HK", name: "A Planet on a Planet" },
  { gcCode: "GCAGR1Y", name: "A Sharp Landing Spot" },
  { gcCode: "GCAKWWJ", name: "Bea's Cosmic Cache" },
  { gcCode: "GCAM248", name: "Big Bang" },
  { gcCode: "GCAKMZ6", name: "Critters in Space" },
  { gcCode: "GCAK9HR", name: "Earth Station Etam" },
  { gcCode: "GCAM1VY", name: "FAR OUT: MAC cosmic challenge" },
  { gcCode: "GCAK2AJ", name: "In a memory long long ago." },
  { gcCode: "GCAK9P0", name: "Jean-Luc Explores the Cosmos" },
  { gcCode: "GCAKBJM", name: "MAC's Cosmic Encounter SCI - FI" },
  { gcCode: "GCAKBJC", name: "MAC's Cosmic Encounter with Extraterrestrials" },
  { gcCode: "GCAKBJA", name: "MAC's Cosmic Encounter with UFOs" },
  { gcCode: "GCAM0GD", name: "October Sky" },
  { gcCode: "GCAJARA", name: "Space, The Final Frontier" },
  { gcCode: "GCAKCBF", name: "RIP Pluto" },
  { gcCode: "GCAM0DX", name: "Space Can" },
  { gcCode: "GCAM1TG", name: "Space Invaders: MAC Cosmic Challenge" },
  { gcCode: "GCAAZM4", name: "Space Walk" },
  { gcCode: "GCAKWJ6", name: "Star Date 2024.3" },
  { gcCode: "GCAM5GQ", name: "Secret Alien Stash @ Westover Park" },
  { gcCode: "GCAM6FM", name: "Swinging Away, Merrill" },
  { gcCode: "GCAM242", name: "The Red Planets" },
]