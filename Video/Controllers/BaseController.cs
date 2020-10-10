namespace Video.Controllers
{
    using System.Linq;
    using System.Security.Claims;
    using Attributes;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    //[EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ValidateModel]
    [Authorize]
    public class BaseController : Controller
    {
        protected int? CurrentUserId
        {
            get
            {
                var claim = this.User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier);
                if (claim != null)
                {
                    int.TryParse(claim.Value, out var result);
                    return result;
                }

                return null;
            }
        }
    }
}