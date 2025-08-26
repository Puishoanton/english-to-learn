using AutoMapper;
using EnglishToLearn.Aplication.DTOs.Deck;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Aplication.Mapping
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
