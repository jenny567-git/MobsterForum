using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class changedpropname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admin_Families_FamilyId",
                schema: "forum",
                table: "Admin");

            migrationBuilder.DropForeignKey(
                name: "FK_Admin_Users_UserId",
                schema: "forum",
                table: "Admin");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Admin",
                schema: "forum",
                table: "Admin");

            migrationBuilder.RenameTable(
                name: "Admin",
                schema: "forum",
                newName: "Admins",
                newSchema: "forum");

            migrationBuilder.RenameColumn(
                name: "Date",
                schema: "forum",
                table: "BlockedMembers",
                newName: "BlockedAt");

            migrationBuilder.RenameIndex(
                name: "IX_Admin_UserId",
                schema: "forum",
                table: "Admins",
                newName: "IX_Admins_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Admin_FamilyId",
                schema: "forum",
                table: "Admins",
                newName: "IX_Admins_FamilyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Admins",
                schema: "forum",
                table: "Admins",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Families_FamilyId",
                schema: "forum",
                table: "Admins",
                column: "FamilyId",
                principalSchema: "forum",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Users_UserId",
                schema: "forum",
                table: "Admins",
                column: "UserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Families_FamilyId",
                schema: "forum",
                table: "Admins");

            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Users_UserId",
                schema: "forum",
                table: "Admins");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Admins",
                schema: "forum",
                table: "Admins");

            migrationBuilder.RenameTable(
                name: "Admins",
                schema: "forum",
                newName: "Admin",
                newSchema: "forum");

            migrationBuilder.RenameColumn(
                name: "BlockedAt",
                schema: "forum",
                table: "BlockedMembers",
                newName: "Date");

            migrationBuilder.RenameIndex(
                name: "IX_Admins_UserId",
                schema: "forum",
                table: "Admin",
                newName: "IX_Admin_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Admins_FamilyId",
                schema: "forum",
                table: "Admin",
                newName: "IX_Admin_FamilyId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Admin",
                schema: "forum",
                table: "Admin",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Admin_Families_FamilyId",
                schema: "forum",
                table: "Admin",
                column: "FamilyId",
                principalSchema: "forum",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Admin_Users_UserId",
                schema: "forum",
                table: "Admin",
                column: "UserId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
