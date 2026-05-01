namespace backend.Models
{
    public enum ToolStatus { Available, Requested, Borrowed }

    public class Tool
    {
        public Guid ID { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        
        public ToolStatus Status { get; set; } = ToolStatus.Available;
        public decimal DailyRate { get; set; } = 0;

        public Guid OwnerId {  get; set; }
        public User? Owner { get; set; }
        public Guid CurrentBorrowerId { get; set; }
    }
}
