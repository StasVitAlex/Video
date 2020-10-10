namespace Video.Models.ViewModels.Folders
{
    public class GetFoldersVm
    {
        public bool IsArchived { get; set; }
        public long ParentFolderId { get; set; }
    }
}