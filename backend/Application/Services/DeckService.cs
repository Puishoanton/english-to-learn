using AutoMapper;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Services
{
    public class DeckService(IRepository<Deck> deckRepository, IMapper mapper) :IDeckService
    {
        private readonly IRepository<Deck> _deckRepository = deckRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<Deck?> GetDeckByIdAsync(Guid id)
        {
            return await _deckRepository.GetByIdAsync(id);
        }

        public async Task<ICollection<Deck>> GetAllDecks()
        {
            return await _deckRepository.GetAllAsync();
        }

        public async Task AddDeckAsync(Deck deck)
        {
            ValidateDeckForCreation(deck);

            deck.CreatedAt = DateTimeOffset.UtcNow;
            deck.UpdatedAt = DateTimeOffset.UtcNow;

            await _deckRepository.AddAsync(deck);
        }

        public async Task UpdateDeckAsync(Guid id, UpdateDeckDto updateDeckDto)
        {
            Deck? updatedDeck = await _deckRepository.GetByIdAsync(id);
            if (updatedDeck == null)
            {
                throw new ArgumentException($"Deck with ID {id} not found.");
            }

            _mapper.Map(updateDeckDto, updatedDeck);
           
            await _deckRepository.UpdateAsync(updatedDeck);
        }

        public async Task DeleteDeckAsync(Guid id)
        {
            await _deckRepository.DeleteAsync(id);
        }

        private static void ValidateDeckForCreation(Deck deck)
        {
            List<string> errors = [];
            if (string.IsNullOrWhiteSpace(deck.Name))
            {
                errors.Add("Deck 'Name' cannot be empty or whitespace.");
            }
            if (errors.Any())
            {
                throw new ArgumentException("Invalid deck data: " + string.Join(", ", errors));
            }
        }
    }
}
