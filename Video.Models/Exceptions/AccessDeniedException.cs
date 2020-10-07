namespace Video.Models.Exceptions
{
    using System;

    public class AccessDeniedException : Exception
    {
        public AccessDeniedException()
        {

        }

        public AccessDeniedException(string message)
            : base(message)
        {
        }
    }
}
