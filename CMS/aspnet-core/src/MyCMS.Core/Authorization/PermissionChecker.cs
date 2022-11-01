using Abp.Authorization;
using MyCMS.Authorization.Roles;
using MyCMS.Authorization.Users;

namespace MyCMS.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
