using System.Security.Claims;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;
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
            Deck? deck = await _deckService.GetDeckByIdAsync(id);

            if (deck == null)
            {
                return NotFound();
            }

            return Ok(deck);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDecks()
        {
            ICollection<Deck> decks = await _deckService.GetAllDecks();
            return Ok(decks);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDeck([FromBody] CreateDeckDto createDeckDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                ReturnDeckDto deck = await _deckService.AddDeckAsync(createDeckDto, User.FindFirstValue(ClaimTypes.NameIdentifier));
                return CreatedAtAction(nameof(CreateDeck), new { id = deck.Id }, deck);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDeck(Guid id, [FromBody] UpdateDeckDto updateDeckDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _deckService.UpdateDeckAsync(id, updateDeckDto);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDeck(Guid id)
        {
            try
            {
                await _deckService.DeleteDeckAsync(id);
                return Ok();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }
    }
}
