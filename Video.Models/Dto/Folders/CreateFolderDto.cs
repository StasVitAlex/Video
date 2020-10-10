namespace Video.Models.Dto.Folders
{
    using Enums;

    public class CreateFolderDto
    {
        public string Name { get; set; }
        public int UserId { get; set; }
        public long? ParentFolderId { get; set; }
        public FolderType FolderType { get; set; }
    }
}