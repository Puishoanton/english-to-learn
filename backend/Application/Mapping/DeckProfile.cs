using AutoMapper;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Mapping
{
    public class DeckProfile : Profile
    {
        public DeckProfile()
        {
            CreateMap<UpdateDeckDto, Deck>()
                .ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));
        }
    }
}
