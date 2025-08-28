using System.Security.Claims;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishToLearn.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/decks")]
    public class DeckController(IDeckService deckService) : ControllerBase
    {
        private readonly IDeckService _deckService = deckService;

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDeckById(Guid id)
        {
            ReturnDeckDto? deck = await _deckService.GetDeckByIdAsync(id);
            return Ok(deck);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDecks()
        {
            ICollection<ReturnDeckDto> decks = await _deckService.GetAllDecks();
            return Ok(decks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDeck([FromBody] CreateDeckDto createDeckDto)
        {
            ReturnDeckDto deck = await _deckService.AddDeckAsync(createDeckDto, User.FindFirstValue(ClaimTypes.NameIdentifier));
            return CreatedAtAction(nameof(CreateDeck), new { id = deck.Id }, deck);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeck(Guid id, [FromBody] UpdateDeckDto updateDeckDto)
        {
            await _deckService.UpdateDeckAsync(id, updateDeckDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeck(Guid id)
        {
            await _deckService.DeleteDeckAsync(id);
            return Ok();
        }
    }
}
