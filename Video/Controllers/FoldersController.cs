namespace Video.Controllers
{
    using BL.Services.Interfaces;

    public class FoldersController : BaseController
    {
        private readonly IFoldersService _foldersService;

        public FoldersController(IFoldersService foldersService)
        {
            _foldersService = foldersService;
        }
    }
}