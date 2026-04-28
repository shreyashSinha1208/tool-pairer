using Npgsql; // Add this at the very top!

var builder = WebApplication.CreateBuilder(args);

// --- TEST CODE START ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine("===============================================");
Console.WriteLine("🚀 STARTING DATABASE TEST...");
Console.WriteLine("===============================================");

try
{
    using var connection = new NpgsqlConnection(connectionString);
    connection.Open();
    Console.WriteLine("✅ SUCCESS: CONNECTION ESTABLISHED!");
}
catch (Exception ex)
{
    Console.WriteLine("❌ ERROR: COULD NOT CONNECT!");
    Console.WriteLine($"REASON: {ex.Message}");
}

Console.WriteLine("===============================================");