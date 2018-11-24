using excit.common.model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace excit.common.service
{
    public class ConfigurationRepository
    {
        private static string _collectionName = "suppliers";
        private string _connectionString;
        private string _databaseName;
        IMongoDatabase _database = null;

        public ConfigurationRepository(string connectionString, string databaseName)
        {
            _connectionString = connectionString;
            _databaseName = databaseName;
        }

        public async Task<List<Supplier>> List()
        {
            Init();
            var collection = _database.GetCollection<Supplier>(_collectionName);
            var result = await collection.Find(Builders<Supplier>.Filter.Empty).ToListAsync().ConfigureAwait(false);
            return result;
        }

        public async Task<Supplier> Get(int id)
        {
            if (id == 0)
                throw new ArgumentNullException("supplier");
            Init();
            var filter = Builders<Supplier>.Filter.Eq(e => e.Id, Convert.ToString(id));
            var collection = _database.GetCollection<Supplier>(_collectionName);
            var result = await collection.Find(filter).FirstOrDefaultAsync().ConfigureAwait(false);
            return result;
        }

        private void Init()
        {
            if (_database == null)
            {
                var client = new MongoClient(_connectionString);
                _database = client.GetDatabase(_databaseName);
            }
        }
    }
}
