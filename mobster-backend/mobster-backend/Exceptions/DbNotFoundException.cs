using System;

namespace mobster_backend.Exceptions
{
    public class DbNotFoundException : Exception
    {
        /// <summary>
        /// A custom Exception class that is used when the entity cannot be found in the database.
        /// </summary>
        public DbNotFoundException(string message) : base(message)
        {

        }
    }
}
