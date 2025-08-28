using AutoMapper;
using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Services
{
    public class CardService(ICardRepository cardRepository, IMapper mapper) : ICardService
    {
        private readonly ICardRepository _cardRepository = cardRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<ReturnCardDto?> GetCardByIdAsync(Guid id)
        {
            Card? card = await _cardRepository.GetByIdAsync(id);
            return _mapper.Map<ReturnCardDto>(card);
        }

        public async Task<ICollection<ReturnCardDto>> GetAllCards(string deckId)
        {
            ICollection<Card> cards = await _cardRepository.GetAllCardsByDeckIdAsync(deckId);
            return _mapper.Map<ICollection<ReturnCardDto>>(cards);
        }

        public async Task<ReturnCardDto> AddCardAsync(CreateCardDto createCardDto, string deckId)
        {
            ValidateCardForCreation(createCardDto, deckId);

            Card card = _mapper.Map<Card>(createCardDto);
            
            card.DeckId = Guid.Parse(deckId);
            card.CreatedAt = DateTimeOffset.UtcNow;
            card.UpdatedAt = DateTimeOffset.UtcNow;

            await _cardRepository.AddAsync(card);

            return _mapper.Map<ReturnCardDto>(card);
        }

        public async Task UpdateCardAsync(Guid id, UpdateCardDto updateCardDto)
        {
            Card? updatedCard = await _cardRepository.GetByIdAsync(id);
            if (updatedCard == null)
            {
                throw new ArgumentException($"Card with ID {id} not found.");
            }

            _mapper.Map(updateCardDto, updatedCard);

            await _cardRepository.UpdateAsync(updatedCard);
        }

        public async Task DeleteCardAsync(Guid id)
        {
            await _cardRepository.DeleteAsync(id);
        }
        private static void ValidateCardForCreation(CreateCardDto createCardDto, string deckId)
        {
            List<string> errors = [];

            if (string.IsNullOrWhiteSpace(createCardDto.Word))
            {
                errors.Add("Card 'Word' cannot be empty or whitespace.");
            }

            if (string.IsNullOrWhiteSpace(createCardDto.Translation))
            {
                errors.Add("Card 'Translation' cannot be empty or whitespace.");
            }

            if (string.IsNullOrWhiteSpace(createCardDto.WordContext))
            {
                errors.Add("Card 'WordContext' cannot be empty or whitespace.");
            }

            if (string.IsNullOrWhiteSpace(createCardDto.TranslationContext))
            {
                errors.Add("Card 'TranslationContext' cannot be empty or whitespace.");
            }
            if (deckId == null)
            {
                errors.Add("Deck ID cannot be null.");
            }
            if (errors.Count != 0)
            {
                throw new ArgumentException(string.Join(" ", errors));
            }

        }
    }
}
