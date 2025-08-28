using AutoMapper;
using EnglishToLearn.Application.DTOs.Card;
using EnglishToLearn.Application.DTOs.Deck;
using EnglishToLearn.Domain.Entities;

namespace EnglishToLearn.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UpdateDeckDto, Deck>()
                .ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));
            CreateMap<UpdateCardDto, Card>()
                .ForAllMembers(opts => opts.Condition((_, _, srcMember) => srcMember != null));

            CreateMap<CreateDeckDto, Deck>();
            CreateMap<CreateCardDto, Card>();


            CreateMap<Deck, ReturnDeckDto>();
            CreateMap<Card, ReturnCardDto>();
        }
    }
}
