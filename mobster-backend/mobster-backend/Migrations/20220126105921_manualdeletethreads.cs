using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class manualdeletethreads : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.AlterColumn<Guid>(
                name: "ThreadId",
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
                principalColumn: "ThreadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts");

            migrationBuilder.AlterColumn<Guid>(
                name: "ThreadId",
                schema: "forum",
                table: "Posts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Threads_ThreadId",
                schema: "forum",
                table: "Posts",
                column: "ThreadId",
                principalSchema: "forum",
                principalTable: "Threads",
                principalColumn: "ThreadId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
