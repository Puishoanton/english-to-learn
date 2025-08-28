using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishToLearn.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/decks/{deckId}/cards")]
    public class CardController(ICardService cardService) : ControllerBase
    {
        private readonly ICardService _cardService = cardService;

        [HttpPost]
        public async Task<IActionResult> CreateCard([FromBody] CreateCardDto createCardDto, string deckId)
        {
            ReturnCardDto card = await _cardService.AddCardAsync(createCardDto, deckId);
            return CreatedAtAction(nameof(CreateCard), new { id = card.Id }, card);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCards(string deckId)
        {
            ICollection<ReturnCardDto> cards = await _cardService.GetAllCards(deckId);
            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCardById(Guid id)
        {
            ReturnCardDto? card = await _cardService.GetCardByIdAsync(id);
            return Ok(card);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCard(Guid id, UpdateCardDto updateCardDto)
        {
            await _cardService.UpdateCardAsync(id, updateCardDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(Guid id)
        {
            await _cardService.DeleteCardAsync(id);
            return Ok();
        }

    }
}
