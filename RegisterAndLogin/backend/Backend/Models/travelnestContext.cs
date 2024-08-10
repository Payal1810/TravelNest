using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Backend.Models
{
    public partial class travelnestContext : DbContext
    {
        public travelnestContext()
        {
        }

        public travelnestContext(DbContextOptions<travelnestContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Area> Areas { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<SecurityQuestion> SecurityQuestions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Root;database=travelnest", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("area");

                entity.HasIndex(e => e.CityId, "city_id_idx");

                entity.Property(e => e.AreaId).HasColumnName("area_id");

                entity.Property(e => e.Aname)
                    .HasMaxLength(45)
                    .HasColumnName("aname");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Areas)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("city_id");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("city");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.Property(e => e.Cname)
                    .HasMaxLength(45)
                    .HasColumnName("cname");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.HasIndex(e => e.Rname, "rname_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Rname)
                    .HasMaxLength(45)
                    .HasColumnName("rname");
            });

            modelBuilder.Entity<SecurityQuestion>(entity =>
            {
                entity.HasKey(e => e.Sid)
                    .HasName("PRIMARY");

                entity.ToTable("security_question");

                entity.HasIndex(e => e.Question, "question_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Sid).HasColumnName("sid");

                entity.Property(e => e.Question)
                    .HasMaxLength(80)
                    .HasColumnName("question");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Aadhar, "aadhar_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Area, "area_id_idx");

                entity.HasIndex(e => e.Email, "email_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Mobile, "mobile_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.Question, "question_idx");

                entity.HasIndex(e => e.RoleId, "role_id_idx");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.Aadhar)
                    .HasMaxLength(15)
                    .HasColumnName("aadhar");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Answer)
                    .HasMaxLength(45)
                    .HasColumnName("answer");

                entity.Property(e => e.Area).HasColumnName("area");

                entity.Property(e => e.Authorized).HasColumnName("authorized");

                entity.Property(e => e.Email)
                    .HasMaxLength(45)
                    .HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(25)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(25)
                    .HasColumnName("lname");

                entity.Property(e => e.Mobile)
                    .HasMaxLength(10)
                    .HasColumnName("mobile");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.Question).HasColumnName("question");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.HasOne(d => d.AreaNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Area)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("area_id");

                entity.HasOne(d => d.QuestionNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Question)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("question");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("role_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
