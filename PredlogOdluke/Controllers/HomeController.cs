using Microsoft.AspNetCore.Mvc;
using PredlogOdluke.ENT;
using System.Collections.Generic;
using System.DirectoryServices.AccountManagement;

namespace PredlogOdluke.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        [Route("GetInfo")]
        public List<INFO> getInfo(string brzahteva)
        {
            var _res = DAL.Data.getInfo(brzahteva);
            return _res;
        }
        [HttpPost]
        [Route("PostData")]
        public ActionResult PostData(INFO data)
        {
            DAL.Data.insertData(data);
            return Ok();
        }

        [HttpPost]
        [Route("ValidateOdluka")]
        public ActionResult ValidateOdluka(INFO iNFO)
        {
            DAL.Data.validateOdluka(iNFO);
            return Ok();
        }

        [HttpGet]
        [Route("GetVrstaZahteva")]
        public List<Zahtev> getZahtev()
        {
            var _res = DAL.Data.getVrstaZahteva();
            return _res;
        }

        [HttpGet]
        [Route("GetPredlogIzmene")]
        public List<PredlogIzmene> getPredlogIzmene(string brojZahteva)
        {
            var _res = DAL.Data.getPredlogIzmene(brojZahteva);
            return _res;
        }

        [HttpGet]
        [Route("GetPredlogIzmeneList")]
        public List<INFO> getPredlogIzmeneList()
        {
            var _res = DAL.Data.getPredlogIzmeneList();
            return _res;
        }

        [HttpGet]
        [Route("GetAneksData")]
        public List<INFO> getAneksData(int status,string partija)
        {
            var _res = DAL.Data.getAneksData(status,partija);
            return _res;
        }

        [HttpGet]
        [Route("GetTipPosla")]
        public List<TipPosla> getTipPosla()
        {
            var _res = DAL.Data.getTipPosla();
            return _res;
        }


        [HttpGet]
        [Route("ValidateUser")]
        public ActionResult ValidateUser()
        {
            var user = User.Identity.Name;
            var domain = user.Substring(0,user.IndexOf("\\"));
            PrincipalContext _pc = new PrincipalContext(ContextType.Domain,domain);
            var userPrincipal = UserPrincipal.FindByIdentity(_pc, user);
            var email = userPrincipal.EmailAddress;
            var _user = DAL.Data.validateUser(email);
            return Ok(_user);
        }
    }
}
