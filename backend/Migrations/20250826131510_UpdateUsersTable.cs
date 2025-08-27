using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishToLearn.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUsersTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "GoogleId");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "Users",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "GoogleId",
                table: "Users",
                newName: "PasswordHash");
        }
    }
}
