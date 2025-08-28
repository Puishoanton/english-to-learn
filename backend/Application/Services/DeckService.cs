using AutoMapper;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Services
{
    public class DeckService(
        IRepository<Deck> deckRepository,
        IUserRepository userRepository,
        IMapper mapper
        ) : IDeckService
    {
        private readonly IRepository<Deck> _deckRepository = deckRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<ReturnDeckDto?> GetDeckByIdAsync(Guid id)
        {
            Deck? deck = await _deckRepository.GetByIdAsync(id);
            return _mapper.Map<ReturnDeckDto>(deck);
        }

        public async Task<ICollection<ReturnDeckDto>> GetAllDecks()
        {
            ICollection<Deck> decks = await _deckRepository.GetAllAsync();
            return _mapper.Map<ICollection<ReturnDeckDto>>(decks);
        }

        public async Task<ReturnDeckDto> AddDeckAsync(CreateDeckDto createDeckDto, string? userId)
        {
            ValidateDeckForCreation(createDeckDto, userId);

            User? user = await _userRepository.GetByIdAsync(Guid.Parse(userId!));
            if (user == null)
            {
                throw new ArgumentException($"User with ID {userId} not found.");
            }

            Deck newDeck = _mapper.Map<Deck>(createDeckDto);
            newDeck.UserId = user.Id;
            newDeck.CreatedAt = DateTimeOffset.UtcNow;
            newDeck.UpdatedAt = DateTimeOffset.UtcNow;

            await _deckRepository.AddAsync(newDeck);

            return _mapper.Map<ReturnDeckDto>(newDeck);
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

        private static void ValidateDeckForCreation(CreateDeckDto createDeckDto, string? userId)
        {
            List<string> errors = [];
            if (string.IsNullOrWhiteSpace(createDeckDto.Name))
            {
                errors.Add("Deck 'Name' cannot be empty or whitespace.");
            }
            if (userId == null)
            {
                errors.Add("User ID cannot be null.");
            }
            if (errors.Any())
            {
                throw new ArgumentException("Invalid deck data: " + string.Join(", ", errors));
            }
        }
    }
}
