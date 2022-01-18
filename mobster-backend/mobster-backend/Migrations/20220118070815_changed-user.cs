using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class changeduser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                schema: "forum",
                table: "Threads",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                schema: "forum",
                table: "Posts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Threads_UserId",
                schema: "forum",
                table: "Threads",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_UserId",
                schema: "forum",
                table: "Posts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_UserId",
                schema: "forum",
                table: "Posts",
                column: "UserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_UserId",
                schema: "forum",
                table: "Threads",
                column: "UserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UserId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_UserId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Threads_UserId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.DropIndex(
                name: "IX_Posts_UserId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "forum",
                table: "Posts");
        }
    }
}
