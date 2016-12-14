using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MediaKit.Controllers
{
    public class MediaKitController : Controller
    {
        // GET: MediaKit
        public ActionResult Index()
        {
            return View();
        }
    }
}