using System.Collections.Generic;

namespace ASI.Contracts.Excit.Supplier.Version1
{
    /// <summary>
    /// Options for the login functionality
    /// </summary>
    public class Login
    {
        public static readonly string AccountNumberName = "AccountNumber";
        public static readonly string UsernameName = "Username";
        public static readonly string PasswordName = "Password";

        public Login()
        {
            Properties = new Dictionary<string, Dictionary<string, string>>();
        }

        /// <summary>
        /// List of properties and json format list of validation rules for the login functionality
        /// </summary>
        public IDictionary<string, Dictionary<string, string>> Properties { get; set; }
    }
}
