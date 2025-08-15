export interface IDeck {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  wordsCount: number;
  // isPublic: boolean;
  ownerId: string;
  // isFavorite: boolean;
  // tags?: string[];
  // coverImageUrl?: string; 
  // lastAccessed?: Date; 
 }
