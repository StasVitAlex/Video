namespace Video.Models.ViewModels.User
{
    using FluentValidation;
    using FluentValidation.Attributes;

    [Validator(typeof(UpdateUserVmValidator))]
    public class UpdateUserVm
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class UpdateUserVmValidator : AbstractValidator<UpdateUserVm>
    {
        public UpdateUserVmValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}