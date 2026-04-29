namespace backend.Models
{
    public class Tool
    {
        public Guid ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsAvailable { get; set; } = true;

        public Guid OwnerId {  get; set; }
        public User? Owner { get; set; }
    }
}
