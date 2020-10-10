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

        public async Task<List<FolderVm>> GetUserFolders(int userId, bool isArchived, long parentFolderId)
        {
            return _mapper.Map<List<FolderVm>>(await _foldersRepository.GetUserFolders(userId, isArchived, parentFolderId));
        }
        
        public async Task<FolderVm> GetUserRootFolder(int userId)
        {
            return _mapper.Map<FolderVm>(await _foldersRepository.GetUserRootFolder(userId));
        }

        public async Task<long> CreateFolder(int userId, CreateFolderVm model)
        {
            var createDto = _mapper.Map<CreateFolderDto>(model);
            createDto.UserId = userId;
            return await _foldersRepository.CreateFolder(createDto);
        }

        public async Task UpdateFolder(int userId, UpdateFolderVm model)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(userId, model.Id))
                throw new AccessDeniedException();

            await _foldersRepository.UpdateFolder(userId, _mapper.Map<UpdateFolderDto>(model));
        }

        public async Task ArchiveFolder(int userId, long folderId)
        {
            if (!await _foldersRepository.UserHasAccessToFolder(userId, folderId))
                throw new AccessDeniedException();

            await _foldersRepository.ArchiveFolder(userId, folderId);
        }

        public async Task DeleteFolder(long folderId)
        {
            await _foldersRepository.DeleteFolder(folderId);
        }

        public async Task<bool> UserHasAccessToFolder(int userId, long folderId)
        {
            return await _foldersRepository.UserHasAccessToFolder(userId, folderId);
        }
    }
}