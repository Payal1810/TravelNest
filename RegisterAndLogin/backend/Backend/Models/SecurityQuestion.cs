using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class SecurityQuestion
    {
        public SecurityQuestion()
        {
            Users = new HashSet<User>();
        }

        public int Sid { get; set; }
        public string Question { get; set; } = null!;

        public virtual ICollection<User>? Users { get; set; }
    }
}
