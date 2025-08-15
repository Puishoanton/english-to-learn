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
