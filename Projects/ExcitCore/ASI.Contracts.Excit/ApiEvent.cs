using System;

namespace ASI.Contracts.Excit
{
    public class ApiEvent
    {
        public string Api { get; set; }
        public string Type { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public BaseInput Input { get; set; }
        public BaseOutput Output { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionStackTrace { get; set; }
    }
}
