using AutoMapper;
using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Services
{
    public class CardService(IRepository<Card> cardRepository, IMapper mapper) : ICardService
    {
        private readonly IRepository<Card> _cardRepository = cardRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Card?> GetCardByIdAsync(Guid id)
        {
            return await _cardRepository.GetByIdAsync(id);
        }

        public async Task<ICollection<Card>> GetAllCards()
        {
            return await _cardRepository.GetAllAsync();
        }

        public async Task AddCardAsync(Card card)
        {
            ValidateCardForCreation(card);


            card.CreatedAt = DateTimeOffset.UtcNow;
            card.UpdatedAt = DateTimeOffset.UtcNow;

            await _cardRepository.AddAsync(card);
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
        private static void ValidateCardForCreation(Card card)
        {
            List<string> errors = [];

            if (string.IsNullOrWhiteSpace(card.Word))
            {
                errors.Add("Card 'Word' cannot be empty or whitespace.");
            }

            if (string.IsNullOrWhiteSpace(card.Translation))
            {
                errors.Add("Card 'Translation' cannot be empty or whitespace.");
            }

            if (string.IsNullOrWhiteSpace(card.WordContext))
            {
                errors.Add("Card 'WordContext' cannot be empty or whitespace.");
            }

            if (string.IsNullOrWhiteSpace(card.TranslationContext))
            {
                errors.Add("Card 'TranslationContext' cannot be empty or whitespace.");
            }

            if (errors.Count != 0)
            {
                throw new ArgumentException(string.Join(" ", errors));
            }

        }
    }
}
