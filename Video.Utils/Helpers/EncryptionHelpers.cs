namespace Video.Utils.Helpers
{
    using System.Security.Cryptography;
    using System.Text;

    public static class EncryptionHelpers
    {
        public static string GetSha1Hash(this string value)
        {
            using var sha1 = new SHA1Managed();
            var hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(value));
            var sb = new StringBuilder(hash.Length * 2);

            foreach (var b in hash)
            {
                // can be "x2" if you want lowercase
                sb.Append(b.ToString("X2"));
            }

            return sb.ToString();
        }
    }
}