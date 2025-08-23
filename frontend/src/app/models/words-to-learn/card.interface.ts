export interface ICard { 
  id: string;
  word: string;
  word_context: string
  translation: string;
  translation_context: string;
  createdAt: Date;
  updatedAt: Date;
  deckId: string;
  // isFavorite?: boolean; 
  // tags?: string[]; 
}
export interface ICreateCard { 
  word: string;
  word_context: string
  translation: string;
  translation_context: string;
  deckId: string;
}

export interface IEditCard { 
  word?: string;
  word_context?: string
  translation?: string;
  translation_context?: string;
  deckId: string;
}
