namespace Video.Models.ViewModels.Folders
{
    public class GetFoldersVm
    {
        public bool isArchived { get; set; }
        public long? ParentFolderId { get; set; }
    }
}