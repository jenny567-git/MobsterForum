using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class updatedIdNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyUser_Users_FamilyMembersId",
                schema: "forum",
                table: "FamilyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "forum",
                table: "Users",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "forum",
                table: "Threads",
                newName: "ThreadId");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                schema: "forum",
                table: "Posts",
                newName: "AuthorUserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "forum",
                table: "Posts",
                newName: "PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_AuthorId",
                schema: "forum",
                table: "Posts",
                newName: "IX_Posts_AuthorUserId");

            migrationBuilder.RenameColumn(
                name: "FamilyMembersId",
                schema: "forum",
                table: "FamilyUser",
                newName: "FamilyMembersUserId");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyUser_FamilyMembersId",
                schema: "forum",
                table: "FamilyUser",
                newName: "IX_FamilyUser_FamilyMembersUserId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "forum",
                table: "BlockedMembers",
                newName: "BlockedMemberId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "forum",
                table: "Admins",
                newName: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyUser_Users_FamilyMembersUserId",
                schema: "forum",
                table: "FamilyUser",
                column: "FamilyMembersUserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "UserId",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyUser_Users_FamilyMembersUserId",
                schema: "forum",
                table: "FamilyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_AuthorUserId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "UserId",
                schema: "forum",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "ThreadId",
                schema: "forum",
                table: "Threads",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "AuthorUserId",
                schema: "forum",
                table: "Posts",
                newName: "AuthorId");

            migrationBuilder.RenameColumn(
                name: "PostId",
                schema: "forum",
                table: "Posts",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_AuthorUserId",
                schema: "forum",
                table: "Posts",
                newName: "IX_Posts_AuthorId");

            migrationBuilder.RenameColumn(
                name: "FamilyMembersUserId",
                schema: "forum",
                table: "FamilyUser",
                newName: "FamilyMembersId");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyUser_FamilyMembersUserId",
                schema: "forum",
                table: "FamilyUser",
                newName: "IX_FamilyUser_FamilyMembersId");

            migrationBuilder.RenameColumn(
                name: "BlockedMemberId",
                schema: "forum",
                table: "BlockedMembers",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "AdminId",
                schema: "forum",
                table: "Admins",
                newName: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyUser_Users_FamilyMembersId",
                schema: "forum",
                table: "FamilyUser",
                column: "FamilyMembersId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_AuthorId",
                schema: "forum",
                table: "Posts",
                column: "AuthorId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
