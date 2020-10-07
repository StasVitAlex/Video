namespace Video.Models.Exceptions
{
    using System;

    public class BadRequestException : Exception
    {
        public BadRequestException()
        {

        }

        public BadRequestException(string message)
                : base(message)
        {
        }
    }

}
