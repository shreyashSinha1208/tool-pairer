using backend.Models;

namespace backend.GraphQL
{
    public class Mutation
    {
        public async Task<User> AddUser(string name, string email, AppDbContext context)
        {
            var user = new User
            {
                ID = Guid.NewGuid(),
                Name = name,
                Email = email
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();
            return user;
        }

        public async Task<Tool> AddTool(string name, string description, Guid ownerId, AppDbContext context){
            var tool = new Tool
            {
                ID = Guid.NewGuid(),
                Name = name,
                Description = description,
                OwnerId = ownerId
            };
            context.Tools.Add(tool);
            await context.SaveChangesAsync();
            return tool;
        }

    }
}
