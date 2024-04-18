using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SanaCommerce_Test.Server.Migrations
{
    /// <inheritdoc />
    public partial class PasswordField_Fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "PasswordHash",
                table: "Customers",
                type: "binary(150)",
                maxLength: 150,
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "binary");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "PasswordHash",
                table: "Customers",
                type: "binary",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "binary(150)",
                oldMaxLength: 150);
        }
    }
}
