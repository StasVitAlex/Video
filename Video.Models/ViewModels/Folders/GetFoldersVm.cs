namespace Video.Models.ViewModels.Folders
{
    public class GetFoldersVm
    {
        public bool IsDeleted { get; set; }
        public long? ParentFolderId { get; set; }
    }
}