using MyCMS.Debugging;

namespace MyCMS
{
    public class MyCMSConsts
    {
        public const string LocalizationSourceName = "MyCMS";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "410fb7b287884c84b9a68ad164f8dff1";
    }
}
