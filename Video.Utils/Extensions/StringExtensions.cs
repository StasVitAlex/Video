namespace Video.Utils.Extensions
{
    using System.Linq;
    using System.Security.Cryptography;

    public class StringExtensions
    {
        public static string GenerateUniqueRandomToken()
        {
            const string availableChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            using var generator = new RNGCryptoServiceProvider();
            var bytes = new byte[16];
            generator.GetBytes(bytes);
            var chars = bytes
                .Select(b => availableChars[b % availableChars.Length]);
            var token = new string(chars.ToArray());
            return token;
        }
    }
}