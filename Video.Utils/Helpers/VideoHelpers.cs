namespace Video.Utils.Helpers
{
    using SixLabors.ImageSharp;
    using SixLabors.ImageSharp.PixelFormats;
    using SixLabors.ImageSharp.Processing;

    public static class VideoHelpers
    {
        public static void GenerateThumbNail(string sourceFileName, string imageFile)
        {
            var sizes = new[] {new Size(100), new Size(250), new Size(500)};
            using var image = Image.Load<Rgb24>(sourceFileName);
            foreach (var size in sizes)
            {
                image.Mutate(x => x.Resize(size.Width, size.Height));
                image.Save(imageFile);
            }
        }
    }
}