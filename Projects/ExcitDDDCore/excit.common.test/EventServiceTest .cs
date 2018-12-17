using ASI.Contracts.Excit;
using excit.common.service;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace excit.common
{
    [TestClass]
    public class EventServiceTest
    {
        [TestMethod]
        public void SendInventoryEvent()
        {
            var data = new ApiEvent
            {
                Api = "Inventory",
                Type = "Start",
                CreatedDateTime = DateTime.Now,
                Input = new ASI.Contracts.Excit.Inventory.Version1.InputByProduct
                {
                    Client = "Test Data",
                    Company = new ASI.Contracts.Excit.Company
                    {
                        CompanyId = 1780
                    }
                }
            };
            try
            {
                var service = new EventService("Endpoint=sb://excit-hub.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=+AubRIl3l2Q2K9xyeUfIwRnErH2JiUEbe5NowD4AiBU=", "api-events");
                service.SendInventoryEvent(data).Wait();
            }
            catch (Exception e)
            {
                Assert.IsNull(e);
            }
        }
    }
}