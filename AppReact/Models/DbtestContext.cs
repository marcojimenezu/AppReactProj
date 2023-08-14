using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace AppReact.Models;

public partial class DbtestContext : DbContext
{
    public DbtestContext()
    {
    }

    public DbtestContext(DbContextOptions<DbtestContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       => optionsBuilder.UseSqlServer("Server=OMEN11\\ASPCORE6;Database=DBTEST;User Id=sa;Password=7LAcriun@@##12lo;Encrypt=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.IdEmployee).HasName("PK__EMPLOYEE__51C8DD7A9BA3411F");

            entity.ToTable("EMPLOYEE");

            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
