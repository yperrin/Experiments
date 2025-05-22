using System.Collections.Generic;

namespace ASI.Contracts.Excit.Supplier.Version1
{
    public class Configuration : BaseOutput
    {
        public enum API
        {
            Inventory = 1, OrderStatus = 2, OrderCreation = 4, Pricing = 3, LoginValidate = 5, Suppliers = 6, SaveProduct = 7,
            ServiceProviderLogin = 9, OrdrShipNotification = 10, ProductIntegration = 8
        };
        public Configuration()
        {
            Services = new Dictionary<API, Service>() {
                { API.Inventory, new Service          { Available = false, Url = null } },
                { API.LoginValidate, new Service      { Available = false, Url = null } },
                { API.OrderCreation, new Service      { Available = false, Url = null } },
                { API.OrderStatus, new Service        { Available = false, Url = null } },
                { API.ProductIntegration, new Service        { Available = false, Url = null } } };
            Login = new Login();
            Order = new Order();
        }

        /// <summary>
        /// The company ASI Number
        /// </summary>
        public int AsiNumber { get; set; }

        /// <summary>
        /// Account number used to connect to supplier for inventory
        /// </summary>
        public string AccountNumber { get; set; }

        /// <summary>
        /// Username used to connect to supplier for inventory
        /// </summary>
        public string Username { get; set; }

        /// <summary>
        /// Password used to connect to supplier for inventory
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Text from the supplier indicating how to create a new login account
        /// </summary>
        public string LoginInstruction { get; set; }
        /// <summary>
        /// List of service APIs available
        /// </summary>
        public IDictionary<API, Service> Services { get; set; }

        /// <summary>
        /// Options for the login functionality
        /// </summary>
        public Login Login { get; set; }

        /// <summary>
        /// Options for the order creation functionality
        /// </summary>
        public Order Order { get; set; }
    }
}
