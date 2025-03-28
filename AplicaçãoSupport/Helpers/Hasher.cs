using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace AplicaçãoSupport.Helpers
{
    public sealed class Hasher
    {
        private const int SaltSize = 32;
        private const int HashSize = 64;
        private static readonly int Iterations = 1000000;

        private static readonly HashAlgorithmName algorithm = HashAlgorithmName.SHA512;

        public static string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, algorithm, HashSize);

            return $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}";
        }

        public static bool Verify(string password, string passwordHash)
        {
            string[] parts = passwordHash.Split('-');
            byte[] hash = Convert.FromHexString(parts[0]);
            byte[] salt = Convert.FromHexString(parts[1]);

            byte[] inputHash = Rfc2898DeriveBytes.Pbkdf2(password, salt, Iterations, algorithm, HashSize);

            //return hash.SequenceEqual(inputHash);
            return CryptographicOperations.FixedTimeEquals(hash, inputHash);
        }
    }
}