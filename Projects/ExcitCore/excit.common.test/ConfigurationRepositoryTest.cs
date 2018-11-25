using excit.common.service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace excit.common
{
    [TestClass]
    public class ConfigurationRepositoryTest
    {
        [TestMethod]
        public void TestSupplierList()
        {
            var configurationRepository = new ConfigurationRepository("mongodb://localhost:27017", "excit");
            var suppliers = configurationRepository.List().Result;
            Assert.IsNotNull(suppliers);
            Assert.IsTrue(suppliers.Any());
        }
        [TestMethod]
        public void TestGetSupplier()
        {
            var configurationRepository = new ConfigurationRepository("mongodb://localhost:27017", "excit");
            var supplier = configurationRepository.Get(1780).Result;
            Assert.IsNotNull(supplier);
            Assert.IsNotNull(supplier.AsiNumber);
            Assert.IsTrue(supplier.Apis.Any());
        }
    }
}
