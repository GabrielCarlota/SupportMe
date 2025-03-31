using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AplicaçãoSupport.Migrations
{
    /// <inheritdoc />
    public partial class time2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<TimeOnly>(
                name: "Horario_Atendimento",
                table: "Atendimentos",
                type: "time(6)",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Horario_Atendimento",
                table: "Atendimentos");
        }
    }
}
