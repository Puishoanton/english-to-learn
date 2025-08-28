using AutoMapper;
using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.Exceptions;
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
            if (card == null)
            {
                throw new NotFoundException($"Card with ID {id} not found.");
            }

            return _mapper.Map<ReturnCardDto>(card);
        }

        public async Task<ICollection<ReturnCardDto>> GetAllCards(string deckId)
        {
            ICollection<Card> cards = await _cardRepository.GetAllCardsByDeckIdAsync(deckId);
            return _mapper.Map<ICollection<ReturnCardDto>>(cards);
        }

        public async Task<ReturnCardDto> AddCardAsync(CreateCardDto createCardDto, string deckId)
        {   
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
                throw new NotFoundException($"Card with ID {id} not found.");
            }

            _mapper.Map(updateCardDto, updatedCard);

            await _cardRepository.UpdateAsync(updatedCard);
        }

        public async Task DeleteCardAsync(Guid id)
        {
            bool deleted = await _cardRepository.DeleteAsync(id);
            if (!deleted)
            {
                throw new NotFoundException($"Card with ID {id} not found.");
            }
        }
    }
}
