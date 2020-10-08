namespace Video.Controllers
{
    using Attributes;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    //[EnableCors("CorsPolicy")]
    [Route("[controller]")]
    [ValidateModel]
    [Authorize]
    public class BaseController : Controller
    {
    }
}