using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mobster_backend.Migrations
{
    public partial class report : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Reports",
                schema: "forum",
                columns: table => new
                {
                    ReportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubjectUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ObjectUserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.ReportId);
                    table.ForeignKey(
                        name: "FK_Reports_Posts_PostId",
                        column: x => x.PostId,
                        principalSchema: "forum",
                        principalTable: "Posts",
                        principalColumn: "PostId");
                    table.ForeignKey(
                        name: "FK_Reports_Threads_ThreadId",
                        column: x => x.ThreadId,
                        principalSchema: "forum",
                        principalTable: "Threads",
                        principalColumn: "ThreadId");
                    table.ForeignKey(
                        name: "FK_Reports_Users_ObjectUserId",
                        column: x => x.ObjectUserId,
                        principalSchema: "forum",
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reports_Users_SubjectUserId",
                        column: x => x.SubjectUserId,
                        principalSchema: "forum",
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ObjectUserId",
                schema: "forum",
                table: "Reports",
                column: "ObjectUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_PostId",
                schema: "forum",
                table: "Reports",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_SubjectUserId",
                schema: "forum",
                table: "Reports",
                column: "SubjectUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ThreadId",
                schema: "forum",
                table: "Reports",
                column: "ThreadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Reports",
                schema: "forum");
        }
    }
}
