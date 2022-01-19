using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class familyid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyUser_Families_FamiliesId",
                schema: "forum",
                table: "FamilyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_AuthorId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "FamiliesId",
                schema: "forum",
                table: "FamilyUser",
                newName: "FamiliesFamilyId");

            migrationBuilder.RenameColumn(
                name: "Id",
                schema: "forum",
                table: "Families",
                newName: "FamilyId");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                schema: "forum",
                table: "Threads",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyUser_Families_FamiliesFamilyId",
                schema: "forum",
                table: "FamilyUser",
                column: "FamiliesFamilyId",
                principalSchema: "forum",
                principalTable: "Families",
                principalColumn: "FamilyId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_AuthorId",
                schema: "forum",
                table: "Threads",
                column: "AuthorId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyUser_Families_FamiliesFamilyId",
                schema: "forum",
                table: "FamilyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_Threads_Users_AuthorId",
                schema: "forum",
                table: "Threads");

            migrationBuilder.RenameColumn(
                name: "FamiliesFamilyId",
                schema: "forum",
                table: "FamilyUser",
                newName: "FamiliesId");

            migrationBuilder.RenameColumn(
                name: "FamilyId",
                schema: "forum",
                table: "Families",
                newName: "Id");

            migrationBuilder.AlterColumn<Guid>(
                name: "AuthorId",
                schema: "forum",
                table: "Threads",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyUser_Families_FamiliesId",
                schema: "forum",
                table: "FamilyUser",
                column: "FamiliesId",
                principalSchema: "forum",
                principalTable: "Families",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Threads_Users_AuthorId",
                schema: "forum",
                table: "Threads",
                column: "AuthorId",
                principalSchema: "forum",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
