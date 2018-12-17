namespace ASI.Contracts.Excit
{
    /// <summary>
    /// Common input.
    /// </summary>
    public class BaseInput
    {
        /// <summary>
        /// Details of the supplier company.
        /// </summary>
        public Company Company { get; set; }

        /// <summary>
        /// A collection of user credentials of the distributor to access the supplier API.
        /// </summary>
        public User UserCredentials { get; set; }

        /// <summary>
        /// An optional identifier which can be used to link the request to the client request
        /// </summary>
        public string CorrelationIdentifier { get; set; }

        /// <summary>
        /// Used to identify the client application calling the API
        /// </summary>
        public string Client { get; set; }
    }
}
