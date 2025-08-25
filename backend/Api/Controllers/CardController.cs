using EnglishToLearn.Aplication.DTOs.Card;
using EnglishToLearn.Aplication.Interfaces.Services;
using EnglishToLearn.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EnglishToLearn.Api.Controllers
{
    [ApiController]
    [Route("api/cards")]
    public class CardController(ICardService cardService) : ControllerBase
    {
        private readonly ICardService _cardService = cardService;

        [HttpPost]
        public async Task<IActionResult> CreateCard([FromBody] CreateCardDto createCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Card card = new()
            {
                DeckId = createCardDto.DeckId,
                Word = createCardDto.Word,
                Translation = createCardDto.Translation,
                WordContext = createCardDto.WordContext,
                TranslationContext = createCardDto.TranslationContext,
            };

            try
            {
                await _cardService.AddCardAsync(card);
                return CreatedAtAction(nameof(CreateCard), new { id = card.Id }, card);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCards()
        {
            ICollection<Card> cards = await _cardService.GetAllCards();

            return Ok(cards);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCardById(Guid id)
        {
            Card? card = await _cardService.GetCardByIdAsync(id);

            if (card == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCard(Guid id, UpdateCardDto updateCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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