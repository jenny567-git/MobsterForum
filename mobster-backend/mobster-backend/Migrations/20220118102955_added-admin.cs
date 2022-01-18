using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class addedadmin : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminId",
                schema: "forum",
                table: "Families");

            migrationBuilder.CreateTable(
                name: "Admin",
                schema: "forum",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FamilyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Admin_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalSchema: "forum",
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Admin_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "forum",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Admin_FamilyId",
                schema: "forum",
                table: "Admin",
                column: "FamilyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Admin_UserId",
                schema: "forum",
                table: "Admin",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin",
                schema: "forum");

            migrationBuilder.AddColumn<Guid>(
                name: "AdminId",
                schema: "forum",
                table: "Families",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
