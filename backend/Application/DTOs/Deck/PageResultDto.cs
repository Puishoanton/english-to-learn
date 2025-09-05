namespace EnglishToLearn.Application.DTOs.Deck
{
    public class PageResultDto<T>
    {
        public int CurrentPage { get; set; }
        public int Skip { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / Skip);
        public ICollection<T> Items { get; set; } = [];
    }
}
