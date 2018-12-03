using System;
using System.Collections.Generic;
using System.Text;

namespace ASI.Contracts.Excit
{
    public class ApiStatsEvent
    {
        public ApiStatsEvent()
        {
            Series = new List<ApiStatsMeasurement>();
        }

        public string Api { get; set; }
        public string Type { get; set; }
        public string CorrelationIdentifier { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public IList<ApiStatsMeasurement> Series { get; set; }
    }

    public class ApiStatsMeasurement
    {
        public string Name { get; set; }
        public double Value { get; set; }
    }
}
