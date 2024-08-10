using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string Fname { get; set; } = null!;
        public string? Lname { get; set; }
        public string Email { get; set; } = null!;
        public string Mobile { get; set; } = null!;
        public string Aadhar { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int Area { get; set; }
        public string? Address { get; set; }
        public int RoleId { get; set; }
        public int Question { get; set; }
        public string Answer { get; set; } = null!;
        public int Authorized { get; set; }

        public virtual Area? AreaNavigation { get; set; } 
        public virtual SecurityQuestion? QuestionNavigation { get; set; } = null!;
        public virtual Role? Role { get; set; } = null!;
    }
}
