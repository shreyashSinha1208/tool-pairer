using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.GraphQL;

public class Mutation
{
    public async Task<Hub> CreateHubAsync(
        AppDbContext context,
        string name,
        string address,
        double latitude,
        double longitude)
    {
        var hub = new Hub
        {
            ID = Guid.NewGuid(),
            Name = name,
            Address = address,
            Latitude = latitude,
            Longitude = longitude
        };

        context.Hubs.Add(hub);
        await context.SaveChangesAsync();
        return hub;
    }

    public async Task<User> RegisterUserAsync(
        AppDbContext context,
        string name,
        string email,
        Guid hubId)
    {
        var user = new User
        {
            ID = Guid.NewGuid(),
            Name = name,
            Email = email,
            HubId = hubId,
            Rating = 5
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();
        return user;
    }

    public async Task<Tool> AddToolAsync(
        AppDbContext context,
        string name,
        string description,
        decimal dailyRate,
        Guid ownerId)
    {
        var tool = new Tool
        {
            ID = Guid.NewGuid(),
            Name = name,
            Description = description,
            DailyRate = dailyRate,
            OwnerId = ownerId,
            Status = ToolStatus.Available
        };

        context.Tools.Add(tool);
        await context.SaveChangesAsync();
        return tool;
    }

    public async Task<Tool> RequestToolAsync(
        AppDbContext context,
        Guid toolId,
        Guid borrowerId)
    {
        var tool = await context.Tools.FindAsync(toolId) ?? throw new GraphQLException("Tool doesn't exist");

        if (tool.Status != ToolStatus.Available)
            throw new GraphQLException("Tool is already in use.");

        if (tool.OwnerId == borrowerId)
            throw new GraphQLException("This tool cannot be acquired.");

        tool.Status = ToolStatus.Requested;
        tool.CurrentBorrowerId = borrowerId;

        await context.SaveChangesAsync();
        return tool;
    }

    public async Task<User> LoginAsync(AppDbContext context, string email)
    {
        var user = await context.Users
        .Include(u => u.MyHub)
        .FirstOrDefaultAsync(u => u.Email == email);

        return user ?? throw new GraphQLException("User not found.");
    }
}