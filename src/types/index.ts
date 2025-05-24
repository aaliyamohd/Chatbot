export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  abilities: Ability[];
  image: string;
  background: string;
}

export interface Ability {
  name: string;
  description: string;
  icon: string;
}

export interface Weapon {
  id: string;
  name: string;
  category: string;
  price: number;
  stats: {
    fireRate: number;
    magazineSize: number;
    damage: {
      head: number;
      body: number;
      legs: number;
    };
  };
  image: string;
  skins?: {
    name: string;
    image: string;
  }[];
}

export interface GameMap {
  id: string;
  name: string;
  description: string;
  image: string;
  minimap: string;
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  prize: string;
  teams: number;
  location: string;
  image: string;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  rank: number;
  score: number;
  winRate: string;
  avatar: string;
}