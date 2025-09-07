export interface ICard { 
  id: string;
  word: string;
  wordContext: string
  translation: string;
  translationContext: string;
  createdAt: Date;
  updatedAt: Date;
  deckId: string;
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
