using System;

namespace ASI.Contracts.Excit.Inventory.Version1
{
    public class SupplierQuantity
    {
        private string _label;

        public string Code { get; set; }
        public string Description { get; set; }
        public int? Quantity { get; set; }
        public string Location { get; set; }
        public double SupplierTimings { get; set; }
        public string Label
        {
            get
            {
                return _label;
            }
            set
            {
                _label = value;
                try
                {
                    Quantity = int.Parse(value);
                }
                catch (Exception)
                {
                    //quantity not a number 
                }
            }
        }
    }
}