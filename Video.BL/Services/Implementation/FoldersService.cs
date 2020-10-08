namespace Video.BL.Services.Implementation
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using AutoMapper;
    using DAL.Repositories.Interfaces;
    using Interfaces;
    using Models.Dto.Folders;
    using Models.Exceptions;
    using Models.ViewModels.Folders;

    public class FoldersService : IFoldersService
    {
        private readonly IFoldersRepository _foldersRepository;
        private readonly IMapper _mapper;

        public FoldersService(IFoldersRepository foldersRepository,
            IMapper mapper)
        {
            _foldersRepository = foldersRepository;
            _mapper = mapper;
        }

        public async Task<List<FolderVm>> GetUserFolders(int userId, int? parentFolderId)
        {
            return _mapper.Map<List<FolderVm>>(await _foldersRepository.GetUserFolders(userId, parentFolderId));
        }

        public async Task<int> CreateFolder(int userId, CreateFolderVm model)
        {
            return await _foldersRepository.CreateFolder(userId, _mapper.Map<CreateFolderDto>(model));
        }

        public async Task UpdateFolder(int userId, UpdateFolderVm model)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(userId, model.Id))
                throw new AccessDeniedException("User doesn't have access to folder");

            await _foldersRepository.UpdateFolder(userId, _mapper.Map<UpdateFolderDto>(model));
        }

        public async Task DeleteFolder(int userId, int folderId)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(userId, folderId))
                throw new AccessDeniedException("User doesn't have access to folder");

            await _foldersRepository.DeleteFolder(userId, folderId);
        }

        public async Task<bool> UserHasAccessToFolder(int userId, int folderId)
        {
            return await _foldersRepository.UserHasAccessToFolder(userId, folderId);
        }
    }
}