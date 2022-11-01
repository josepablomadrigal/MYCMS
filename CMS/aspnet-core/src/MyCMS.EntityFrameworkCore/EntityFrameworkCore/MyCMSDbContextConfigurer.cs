using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MyCMS.EntityFrameworkCore
{
    public static class MyCMSDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MyCMSDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<MyCMSDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
