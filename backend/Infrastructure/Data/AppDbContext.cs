using EnglishToLearn.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EnglishToLearn.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Card> Cards { get; set; }
    public DbSet<Deck> Decks { get; set; }
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Deck>()
            .HasOne(deck => deck.User)
            .WithMany(user => user.Decks)
            .HasForeignKey(deck => deck.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Card>()
            .HasOne(card => card.Deck)
            .WithMany(deck => deck.Cards)
            .HasForeignKey(card => card.DeckId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<User>()
           .Property(user => user.Username)
           .IsRequired();
        modelBuilder.Entity<User>()
           .Property(user => user.PasswordHash)
           .IsRequired();

        modelBuilder.Entity<Deck>()
           .Property(deck => deck.Name)
           .IsRequired();

        modelBuilder.Entity<Card>()
           .Property(card => card.Word)
           .IsRequired();
        modelBuilder.Entity<Card>()
           .Property(card => card.WordContext)
           .IsRequired();
        modelBuilder.Entity<Card>()
           .Property(card => card.Translation)
           .IsRequired();
        modelBuilder.Entity<Card>()
           .Property(card => card.TranslationContext)
           .IsRequired();
    }
}
