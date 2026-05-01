using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.GraphQL;

public class Query {

    [UseFiltering]
    [UseSorting]
    public IQueryable<Tool> GetTools(AppDbContext context) => context.Tools;

    [UseFiltering]
    [UseSorting]
    public IQueryable<User> GetUsers(AppDbContext context) => context.Users.Include(u => u.OwnedTools);

    [UseFiltering]
    [UseSorting]
    public IQueryable<Hub> GetHubs(AppDbContext context) => context.Hubs;

    public IQueryable<Hub> GetNearbyHubs(AppDbContext context, double lat, double lon, double radiusInKm = 0.5)
    {
        double latRange = radiusInKm / 111.0;
        double lonRange = radiusInKm / (111.0 * Math.Cos(lat * Math.PI / 180.0));

        return context.Hubs.Where(h =>
            h.Latitude >= lat - latRange &&
            h.Latitude <= lat + latRange &&
            h.Longitude >= lon - lonRange &&
            h.Longitude <= lon + lonRange);
    }

    public IQueryable<Tool> GetToolsInHub(AppDbContext context, Guid hubId)
    {
        return context.Tools
            .Include(t => t.Owner)
            .Where(t => t.Owner != null && t.Owner.HubId == hubId && t.Status == ToolStatus.Available);
    }

    public IQueryable<Tool> GetBorrowedTools(AppDbContext context, Guid userId)
    {
        return context.Tools
            .Where(t => t.CurrentBorrowerId == userId);
    }
}
