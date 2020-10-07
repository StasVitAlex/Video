namespace Video.Models.Exceptions
{
    using System;

    public class ValidationException : Exception
    {
        public ValidationException()
        {

        }

        public ValidationException(string message)
            : base(message)
        {
        }
    }
}
