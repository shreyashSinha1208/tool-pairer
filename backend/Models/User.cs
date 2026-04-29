namespace backend.Models
{
    public class User
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public List<Tool> OwnedTools { get; set; } = new();
    }
}
