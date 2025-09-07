using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishToLearn.Migrations
{
    /// <inheritdoc />
    public partial class AddCardProgress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Progress",
                table: "Cards",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Card_Progress_Range",
                table: "Cards",
                sql: "\"Progress\" BETWEEN -10 AND 10");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Card_Progress_Range",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "Progress",
                table: "Cards");
        }
    }
}
