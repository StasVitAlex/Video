namespace Video.Models.ViewModels.User
{
    using FluentValidation;
    using FluentValidation.Attributes;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;

    [Validator(typeof(UpdateUserVmValidator))]
    public class UpdateUserVm
    {

        public IFormFile Image { get; set; }
        [FromForm] public string FirstName { get; set; }
        [FromForm] public string LastName { get; set; }
    }

    public class UpdateUserVmValidator : AbstractValidator<UpdateUserVm>
    {
        public UpdateUserVmValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}