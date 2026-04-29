using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args); 

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); 


builder.Services.AddOpenApi(); 

var app = builder.Build(); 

if (app.Environment.IsDevelopment())
{
    using var connection = new NpgsqlConnection(connectionString);
    connection.Open();
    Console.WriteLine("✅ SUCCESS: CONNECTION ESTABLISHED!");
}

app.UseHttpsRedirection();

app.MapGet("/", () => "ToolPairer API is running!");

app.Run();
