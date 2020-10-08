namespace Video.Attributes
{
    using System.Linq;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var errors = string.Join("", context.ModelState.Values.SelectMany(v => v.Errors.Select(p => p.ErrorMessage)));
                context.Result = new BadRequestObjectResult(new {message = errors});
            }
        }
    }
}