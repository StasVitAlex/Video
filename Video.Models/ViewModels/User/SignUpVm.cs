namespace Video.Models.ViewModels.User
{
    using FluentValidation;
    using FluentValidation.Attributes;

    [Validator(typeof(SignUpVmValidator))]
    public class SignUpVm
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        
        public string Host { get; set; }
    }

    public class SignUpVmValidator : AbstractValidator<SignUpVm>
    {
        public SignUpVmValidator()
        {
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}