export interface ICard { 
  id: string;
  word: string;
  wordContext: string
  translation: string;
  translationContext: string;
  createdAt: Date;
  updatedAt: Date;
  deckId: string;
  progress: number;
  // isFavorite?: boolean; 
  // tags?: string[]; 
}
export interface ICreateCard { 
  word: string;
  wordContext: string
  translation: string;
  translationContext: string;
  deckId: string;
}

export interface IEditCard { 
  word?: string;
  wordContext?: string
  translation?: string;
  translationContext?: string;
  deckId: string;
}
