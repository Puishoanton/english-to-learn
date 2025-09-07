import { ICard } from "./card.interface";

export interface IDeck {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  cards: ICard[];
  // isPublic: boolean;
  ownerId: string;
  // isFavorite: boolean;
  // tags?: string[];
  // coverImageUrl?: string; 
  // lastAccessed?: Date; 
}

export interface ICreateDeck {
  name: string;
  description?: string;
  // isPublic: boolean;
  // ownerId: string;
  // isFavorite: boolean;
  // tags?: string[];
  // coverImageUrl?: string; 
  // lastAccessed?: Date; 
}

export interface IEditDeck {
  name?: string;
  description?: string;
}
