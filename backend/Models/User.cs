namespace backend.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public string? Address { get; set; }
        public double Rating { get; set; }

        public Guid? HubId { get; set; }
        public Hub? MyHub { get; set; } = null;

        public List<Tool> OwnedTools { get; set; } = [];
    }
}
