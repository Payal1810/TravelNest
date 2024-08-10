using System;
using System.Collections.Generic;

namespace Backend.Models
{
    public partial class City
    {
        public City()
        {
            Areas = new HashSet<Area>();
        }

        public int CityId { get; set; }
        public string Cname { get; set; } = null!;

        public virtual ICollection<Area>? Areas { get; set; }
    }
}
