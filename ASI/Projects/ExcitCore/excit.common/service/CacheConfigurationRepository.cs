using System;
using System.Threading.Tasks;
using excit.common.model;
using log4net;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace excit.common.service
{
    public class CacheConfigurationRepository : ConfigurationRepository
    {
        private static ILog _log = LogManager.GetLogger(typeof(ConfigurationRepository));
        private IDatabase _cache;
        public CacheConfigurationRepository(string redisConnectionString, string redisPassword, string databaseConnectionString, string databaseName) : base(databaseConnectionString, databaseName)
        {
            ConfigurationOptions config = new ConfigurationOptions();
            config.EndPoints.Add(redisConnectionString);
            config.Password = redisPassword;
            config.Ssl = true;
            ConnectionMultiplexer redisHostConnection = ConnectionMultiplexer.Connect(config);
            _cache = redisHostConnection.GetDatabase();
        }
        public override async Task<Supplier> Get(int id)
        {
            Supplier supplier;
            var start = DateTime.Now;
            _log.Debug("Get - Start");
            string configJson = await _cache.StringGetAsync(id.ToString());
            if (string.IsNullOrEmpty(configJson))
            {
                _log.Debug("Get - Getting data from database");
                supplier = await base.Get(id);
                await _cache.StringSetAsync(id.ToString(), JsonConvert.SerializeObject(supplier));
            }
            else
            {
                _log.Debug("Get - Getting data from cache");
                supplier = JsonConvert.DeserializeObject<Supplier>(configJson);
            }
            _log.Debug("Get - End -" + (DateTime.Now - start).TotalMilliseconds);
            return supplier;
        }
    }
}
