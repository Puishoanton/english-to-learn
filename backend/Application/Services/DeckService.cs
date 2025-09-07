using AutoMapper;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Application.Exceptions;
using EnglishToLearn.Application.Interfaces.Repositories;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Services
{
    public class DeckService(
        IDeckRepository deckRepository,
        IUserRepository userRepository,
        IMapper mapper
        ) : IDeckService
    {
        private readonly IDeckRepository _deckRepository = deckRepository;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<ReturnDeckDto?> GetDeckByIdAsync(string? userId, Guid id)
        {
            if (string.IsNullOrWhiteSpace(userId) || !Guid.TryParse(userId, out Guid userGuid))
            {
                throw new UnauthorizedException("UserId is missing in the request.");
            }
            User? user = await _userRepository.GetByIdAsync(userGuid);
            if (user == null)
            {
                throw new NotFoundException($"User with ID {userId} not found.");
            }

            Deck? deck = await _deckRepository.GetByIdWithCardsAsync(user.Id, id);
            if (deck == null)
            {
                throw new NotFoundException($"Deck with ID {id} not found.");
            }

            return _mapper.Map<ReturnDeckDto>(deck);
        }

        public async Task<PageResultDto<ReturnDeckDto>> GetAllDecks(string? userId, string? search, int page = 1, int skip = 100)
        {
            if (string.IsNullOrWhiteSpace(userId) || !Guid.TryParse(userId, out Guid userGuid))
            {
                throw new UnauthorizedException("UserId is missing in the request.");
            }
            User? user = await _userRepository.GetByIdAsync(userGuid);
            if (user == null)
            {
                throw new NotFoundException($"User with ID {userId} not found.");
            }

            ICollection<Deck> decks = await _deckRepository.GetAllWithCardsAsync(user.Id, search, page, skip);
            int totalCount = await _deckRepository.GetCardsTotalCountAsync(user.Id);

            return new PageResultDto<ReturnDeckDto>
            {
                CurrentPage = page,
                Skip = skip,
                TotalCount = totalCount,
                Items = _mapper.Map<ICollection<ReturnDeckDto>>(decks)
            };

        }

        public async Task<ReturnDeckDto> AddDeckAsync(CreateDeckDto createDeckDto, string? userId)
        {
            User? user = await _userRepository.GetByIdAsync(Guid.Parse(userId!));
            if (user == null)
            {
                throw new NotFoundException($"User with ID {userId} not found.");
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
                throw new NotFoundException($"Deck with ID {id} not found.");
            }

            _mapper.Map(updateDeckDto, updatedDeck);

            await _deckRepository.UpdateAsync(updatedDeck);
        }

        public async Task DeleteDeckAsync(Guid id)
        {
            Boolean isDeleted = await _deckRepository.DeleteAsync(id);
            if (!isDeleted)
            {
                throw new NotFoundException($"Deck with ID {id} not found.");
            }
        }
    }
}
