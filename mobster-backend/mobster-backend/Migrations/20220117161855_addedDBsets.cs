using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class addedDBsets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "forum");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "Users",
                newSchema: "forum");

            migrationBuilder.RenameTable(
                name: "Threads",
                newName: "Threads",
                newSchema: "forum");

            migrationBuilder.RenameTable(
                name: "Posts",
                newName: "Posts",
                newSchema: "forum");

            migrationBuilder.RenameTable(
                name: "Families",
                newName: "Families",
                newSchema: "forum");

            migrationBuilder.CreateTable(
                name: "BannedMembers",
                schema: "forum",
                columns: table => new
                {
                    FamilyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "FamilyMembers",
                schema: "forum",
                columns: table => new
                {
                    FamilyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateIndex(
                name: "IX_BannedMembers_FamilyId_UserId",
                schema: "forum",
                table: "BannedMembers",
                columns: new[] { "FamilyId", "UserId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FamilyMembers_FamilyId_UserId",
                schema: "forum",
                table: "FamilyMembers",
                columns: new[] { "FamilyId", "UserId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BannedMembers",
                schema: "forum");

            migrationBuilder.DropTable(
                name: "FamilyMembers",
                schema: "forum");

            migrationBuilder.RenameTable(
                name: "Users",
                schema: "forum",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "Threads",
                schema: "forum",
                newName: "Threads");

            migrationBuilder.RenameTable(
                name: "Posts",
                schema: "forum",
                newName: "Posts");

            migrationBuilder.RenameTable(
                name: "Families",
                schema: "forum",
                newName: "Families");
        }
    }
}
