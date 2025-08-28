using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.Interfaces.Services;
using EnglishToLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EnglishToLearn.Api.Controllers
{
    [ApiController]
    [Route("api/decks/{deckId}/cards")]
    public class CardController(ICardService cardService) : ControllerBase
    {
        private readonly ICardService _cardService = cardService;

        [HttpPost]
        public async Task<IActionResult> CreateCard([FromBody] CreateCardDto createCardDto, string deckId)
        {
            try
            {
                ReturnCardDto card = await _cardService.AddCardAsync(createCardDto, deckId);
                return CreatedAtAction(nameof(CreateCard), new { id = card.Id }, card);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
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
            if (card == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCard(Guid id, UpdateCardDto updateCardDto)
        {
            try
            {
                await _cardService.UpdateCardAsync(id, updateCardDto);
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCard(Guid id)
        {
            try
            {
                await _cardService.DeleteCardAsync(id);

                return Ok();
            }
            catch (ArgumentException)
            {
                return NotFound();
            }
        }

    }
}
