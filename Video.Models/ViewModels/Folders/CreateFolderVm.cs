namespace Video.Models.ViewModels.Folders
{
    using FluentValidation;
    using FluentValidation.Attributes;

    [Validator(typeof(CreateFolderVmValidator))]
    public class CreateFolderVm
    {
        public string Name { get; set; }
    }

    public class CreateFolderVmValidator : AbstractValidator<CreateFolderVm>
    {
        public CreateFolderVmValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}