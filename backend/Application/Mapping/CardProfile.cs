using AutoMapper;
using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Mapping
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
