namespace Video.BL.Services.Implementation
{
    using DAL.Repositories.Interfaces;
    using Interfaces;

    public class FoldersService : IFoldersService
    {
        private readonly IFoldersRepository _foldersRepository;

        public FoldersService(IFoldersRepository foldersRepository)
        {
            _foldersRepository = foldersRepository;
        }
    }
}