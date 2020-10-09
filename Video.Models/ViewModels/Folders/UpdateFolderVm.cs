namespace Video.Models.ViewModels.Folders
{
    using FluentValidation;
    using FluentValidation.Attributes;

    [Validator(typeof(CreateFolderVmValidator))]
    public class UpdateFolderVm
    {
        public string Name { get; set; }
        public long Id { get; set; }
    }

    public class UpdateFolderVmValidator : AbstractValidator<UpdateFolderVm>
    {
        public UpdateFolderVmValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
            RuleFor(x => x.Id).NotEmpty();
        }
    }
}