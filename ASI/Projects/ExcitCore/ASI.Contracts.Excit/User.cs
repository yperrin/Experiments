namespace ASI.Contracts.Excit
{

    /// <summary>
    /// Identifying details in order to access the API.
    /// </summary>
	public class User
	{
        /// <summary>
        /// Username to access the API
        /// </summary>
		public string Username { get; set; }

        /// <summary>
        /// A password to access the API
        /// </summary>
		public string Password { get; set; }

		/// <summary>
		/// If no username and passwords are required, a way to identify the user or client company account i.e. ASI Number
		/// </summary>
		public string AccountNumber { get; set; }

        /// <summary>
        /// Email associated with the account.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The ASI Number of the user requesting the informaion. Required in some scenarios, strongly recommended to poppulate if available.
        /// </summary>
        public string AsiNumber { get; set; }
    }
}