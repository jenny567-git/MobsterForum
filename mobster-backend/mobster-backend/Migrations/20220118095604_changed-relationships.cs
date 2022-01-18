using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class changedrelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Families_Users_AdminId",
                schema: "forum",
                table: "Families");

            migrationBuilder.DropTable(
                name: "BannedMembers",
                schema: "forum");

            migrationBuilder.DropTable(
                name: "FamilyMembers",
                schema: "forum");

            migrationBuilder.DropIndex(
                name: "IX_Families_AdminId",
                schema: "forum",
                table: "Families");

            migrationBuilder.CreateTable(
                name: "FamilyUser",
                schema: "forum",
                columns: table => new
                {
                    FamiliesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FamilyMembersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FamilyUser", x => new { x.FamiliesId, x.FamilyMembersId });
                    table.ForeignKey(
                        name: "FK_FamilyUser_Families_FamiliesId",
                        column: x => x.FamiliesId,
                        principalSchema: "forum",
                        principalTable: "Families",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FamilyUser_Users_FamilyMembersId",
                        column: x => x.FamilyMembersId,
                        principalSchema: "forum",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FamilyUser_FamilyMembersId",
                schema: "forum",
                table: "FamilyUser",
                column: "FamilyMembersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FamilyUser",
                schema: "forum");

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
                name: "IX_Families_AdminId",
                schema: "forum",
                table: "Families",
                column: "AdminId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Families_Users_AdminId",
                schema: "forum",
                table: "Families",
                column: "AdminId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
