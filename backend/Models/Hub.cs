namespace backend.Models
{
    public class Hub
    {
        public Guid ID { get; set; }
        public required string Name { get; set; }
        public string Address { get; set; } = string.Empty;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public ICollection<User> Residents { get; set; } = [];
    }
}
