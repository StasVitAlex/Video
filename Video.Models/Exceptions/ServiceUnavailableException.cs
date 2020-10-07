namespace Video.Models.Exceptions
{
    using System;

    public class ServiceUnavailableException : Exception
    {
        public ServiceUnavailableException() { }

        public ServiceUnavailableException(string message)
                : base(message) { }
    }
}