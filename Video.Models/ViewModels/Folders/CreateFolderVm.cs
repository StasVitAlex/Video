namespace Video.Models.ViewModels.Folders
{
    using Enums;
    using FluentValidation;
    using FluentValidation.Attributes;

    [Validator(typeof(CreateFolderVmValidator))]
    public class CreateFolderVm
    {
        public string Name { get; set; }
        public long? ParentFolderId { get; set; }
        public FolderType FolderType { get; set; }
    }

    public class CreateFolderVmValidator : AbstractValidator<CreateFolderVm>
    {
        public CreateFolderVmValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}