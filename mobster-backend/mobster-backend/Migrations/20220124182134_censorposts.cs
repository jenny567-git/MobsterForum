using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class censorposts : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorUserId",
                schema: "forum",
                table: "Posts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsCensored",
                schema: "forum",
                table: "Posts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts",
                column: "ThreadId",
                principalSchema: "forum",
                principalTable: "Threads",
                principalColumn: "ThreadId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                schema: "forum",
                table: "Posts",
                column: "AuthorUserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "IsCensored",
                schema: "forum",
                table: "Posts");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorUserId",
                schema: "forum",
                table: "Posts",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts",
                column: "ThreadId",
                principalSchema: "forum",
                principalTable: "Threads",
                principalColumn: "ThreadId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                schema: "forum",
                table: "Posts",
                column: "AuthorUserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "UserId");
        }
    }
}
