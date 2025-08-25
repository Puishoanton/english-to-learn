using AutoMapper;
using EnglishToLearn.Aplication.DTOs.Card;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Aplication.Mapping
{
    public class CardProfile : Profile
    {
        public CardProfile()
        {
            CreateMap<UpdateCardDto, Card>()
                .ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));
        }
    }
}
