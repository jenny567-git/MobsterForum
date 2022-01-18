using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class addedblockedMembers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlockedMembers",
                schema: "forum",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FamilyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlockedMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BlockedMembers_Families_FamilyId",
                        column: x => x.FamilyId,
                        principalSchema: "forum",
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BlockedMembers_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "forum",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BlockedMembers_FamilyId",
                schema: "forum",
                table: "BlockedMembers",
                column: "FamilyId");

            migrationBuilder.CreateIndex(
                name: "IX_BlockedMembers_UserId",
                schema: "forum",
                table: "BlockedMembers",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlockedMembers",
                schema: "forum");
        }
    }
}
