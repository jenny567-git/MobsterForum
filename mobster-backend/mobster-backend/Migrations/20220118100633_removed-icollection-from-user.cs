using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class removedicollectionfromuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UserId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_UserId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "forum",
                table: "Threads",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_UserId",
                schema: "forum",
                table: "Threads",
                newName: "IX_Threads_AuthorId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "forum",
                table: "Posts",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UserId",
                schema: "forum",
                table: "Posts",
                newName: "IX_Posts_AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_AuthorId",
                schema: "forum",
                table: "Posts",
                column: "AuthorId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_AuthorId",
                schema: "forum",
                table: "Threads",
                column: "AuthorId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_AuthorId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                schema: "forum",
                table: "Threads",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Threads_AuthorId",
                schema: "forum",
                table: "Threads",
                newName: "IX_Threads_UserId");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                schema: "forum",
                table: "Posts",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_AuthorId",
                schema: "forum",
                table: "Posts",
                newName: "IX_Posts_UserId");

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
    }
}
