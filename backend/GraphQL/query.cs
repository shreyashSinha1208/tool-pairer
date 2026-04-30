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

}
