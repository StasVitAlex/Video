namespace Video.Models.Dto.Folders
{
    public class FolderDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        
        public int FilesCount { get; set; }
        public long? ParentFolderId { get; set; }
    }
}