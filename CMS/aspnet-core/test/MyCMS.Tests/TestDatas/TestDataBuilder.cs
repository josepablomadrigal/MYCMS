using MyCMS.EntityFrameworkCore;

namespace MyCMS.Tests.TestDatas
{
    public class TestDataBuilder
    {
        private readonly MyCMSDbContext _context;

        public TestDataBuilder(MyCMSDbContext context)
        {
            _context = context;
        }

        public void Build()
        {
            _context.ContentManagementSystems.AddRange(
                new("one", @"<!DOCTYPE html>
<html>
<head>
<!-- HTML Comment-->
<title>
Hello One
</title>
</head>
<body>
<h1>Hello one </h1>
<p>greetings</p>
</body>
</html>
"),
                new("two", @"<!DOCTYPE html>
<html>
<head>
<title>
Hello world
</title>
</head>
<body>
<h1>two</h1>
<p>content</p>
<b>bold</b>
</body>
</html>
"),
                new("three", @"<!DOCTYPE html>
<html>
<head>
<title>
Hello again
</title>
</head>
<body>
<h1>Greetings</h1>
<p>Testing</p>
<b>html<b>
</body>
</html>
")
            );
        }
    }
}