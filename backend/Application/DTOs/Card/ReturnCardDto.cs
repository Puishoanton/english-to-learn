namespace EnglishToLearn.Application.DTOs.Card
{
    public class ReturnCardDto
    {
        public Guid Id { get; set; }
        public string? Word { get; set; }
        public string? Translation { get; set; }
        public string? WordContext { get; set; }
        public string? TranslationContext { get; set; }
    }
}
