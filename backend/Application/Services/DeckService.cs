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

        public async Task<Deck?> GetDeckByIdAsync(Guid id)
        {
            return await _deckRepository.GetByIdAsync(id);
        }

        public async Task<ICollection<Deck>> GetAllDecks()
        {
            return await _deckRepository.GetAllAsync();
        }

        public async Task<ReturnDeckDto> AddDeckAsync(CreateDeckDto createDeckDto, string? userId)
        {
            ValidateDeckForCreation(createDeckDto, userId);

            User? user = await _userRepository.GetByIdAsync(Guid.Parse(userId!));
            if (user == null)
            {
                throw new ArgumentException($"User with ID {userId} not found.");
            }

            Deck newDeck = new()
            {
                UserId = Guid.Parse(userId!),
                Name = createDeckDto.Name,
                User = user,
                Description = createDeckDto.Description,
                CreatedAt = DateTimeOffset.UtcNow,
                UpdatedAt = DateTimeOffset.UtcNow
            };

            await _deckRepository.AddAsync(newDeck);

            ReturnDeckDto returnDeckDto = new ()
            {
                Id = newDeck.Id,
                Name = newDeck.Name,
                Description = newDeck.Description,
                UserId = newDeck.UserId,
            };

            return returnDeckDto;
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
