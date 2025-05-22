using excit.common.service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
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

        [TestMethod]
        public void TestGetCachedSupplier()
        {
            //excit.redis.cache.windows.net:6380,password = WmmuyKzwtuEqzoTP7IHnGElLG7 + GIlT4JPevxd6mHrY =,ssl = True,abortConnect = False
            var configurationRepository = new CacheConfigurationRepository("excit.redis.cache.windows.net:6380" , "WmmuyKzwtuEqzoTP7IHnGElLG7+GIlT4JPevxd6mHrY=", "mongodb://localhost:27017", "excit");
            Console.WriteLine("starting");            
            var supplier = configurationRepository.Get(1780).Result;
            Assert.IsNotNull(supplier);
            Assert.IsNotNull(supplier.AsiNumber);
            Assert.IsTrue(supplier.Apis.Any());
            supplier = configurationRepository.Get(1780).Result;
            Assert.IsNotNull(supplier);
            Assert.IsNotNull(supplier.AsiNumber);
        }
    }
}
