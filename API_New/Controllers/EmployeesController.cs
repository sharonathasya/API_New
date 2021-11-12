using API_New.Context;
using API_New.Controllers.Base;
using API_New.Models;
using API_New.Repository.Data;
using API_New.ViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API_New.Controllers
{
    //[EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository employeeRepository;
        //private readonly MyContext myContext;
        public IConfiguration _configuration;
        public EmployeesController(EmployeeRepository employeeRepository, IConfiguration configuration, MyContext myContext) : base(employeeRepository)
        {
            this.employeeRepository = employeeRepository;
            //this.myContext = myContext; 
            this._configuration = configuration;
        }

        /*[Authorize(Roles = "Manager,Director")]*/
        //[EnableCors("AllowOrigin")]
        [Route("Profile")]
        [HttpGet]
        public ActionResult<Register> GetProfile()
        {
            var result = employeeRepository.GetProfile();
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Tidak ada data di tabel" });

        }

        /*[Authorize(Roles = "Employee,Manager,Director")]*/
        //[Route("CariProfile/{nik}")]
        [HttpGet("Profile/{nik}")]
        public ActionResult GetProfile(string NIK)
        {

            var result = employeeRepository.GetProfile(NIK);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound(new { status = HttpStatusCode.NotFound, result = result, message = "Data dengan ID tersebut tidak ditemukan" });

        }

        [Route("Register")]
        [HttpPost]
        public ActionResult Register(RegisterVM registerVM)
        {
            var check = employeeRepository.Register(registerVM);
            if (check == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, message = "Data berhasil ditambahkan" });
            }
            if (check == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal ditambahkan. NIK sudah terdaftar" });
            }
            if (check == 3)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal ditambahkan. Phone sudah terdaftar" });

            }
            else
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Data gagal ditambahkan. Email sudah terdaftar" });
            }

        }


        [Route("Login")]
        [HttpPost]
        public ActionResult Login(LoginVM loginVM)
        {
            var check = employeeRepository.Login(loginVM);
            if (check == "email")
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Gagal Login! Email tersebut tidak ditemukan" });
            }
            if (check == "password")
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Gagal Login! Password tersebut tidak sesuai" });
            }
            else
            {
                var data = employeeRepository.GetProfile(check);
                return Ok(new { status = HttpStatusCode.OK, data, message = "Selamat anda berhasil login" });
            }
        }

        // [Authorize(Roles = "Director")]
        [Route("Sign")]
        [HttpPost]
        public ActionResult Sign(LoginVM loginVM)
        {
            var check = employeeRepository.Sign(loginVM);
            if (check == 2)
            {
                return NotFound(new JWTokenVM { Token="", Messages = "0" });
            }
            if (check == 0)
            {
                return NotFound(new JWTokenVM { Token = "", Messages = "1" });
            }
            else
            {
                //method
                var getRoles = employeeRepository.GetRole(loginVM.Email);

                var data = new LoginVM()
                {
                    Email = loginVM.Email
                };
                var claims = new List<Claim>
                {
                    new Claim("Email", data.Email)
                };
                foreach (var a in getRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, a.ToString()));
                }


                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                             _configuration["Jwt:Issuer"],
                             _configuration["Jwt:Audience"],
                             claims,
                             expires: DateTime.UtcNow.AddDays(1),
                             signingCredentials: signIn
                             );

                var idtoken = new JwtSecurityTokenHandler().WriteToken(token);
                claims.Add(new Claim("TokenSecurity", idtoken.ToString()));

                return Ok(new JWTokenVM { Token = idtoken, Messages = "Selamat anda berhasil login" });
            }
        }

        [Authorize(Roles = "Director")]
        //[Route("AddManager")]
        [HttpPost("AddManager")]
        public ActionResult AddManager(AccountRole accountRole)
        {
            int result = employeeRepository.AddManager(accountRole);
            if (result == 1)
            {
                return Ok(new { status = HttpStatusCode.OK, message = "Data berhasil diupdate" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak berhasil diupdate. ID sudah terdaftar" });
            }
        }

        [Authorize]
        [HttpGet("TestJWT")]
        public ActionResult TestJWT()
        {
            return Ok("Test JWT berhasil");
        }

        [HttpGet("GetGender")]
        public ActionResult GetGender()
        {
            var data = employeeRepository.GetGender();
            if (data != null)
            {
                return Ok(new { status = HttpStatusCode.OK, data, message = "Data berhasil ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak berhasil ditampilkan" });
            }
        }

        [HttpGet("GetRole")]
        public ActionResult GetRole()
        {
            var data = employeeRepository.GetRole();
            if (data != null)
            {
                return Ok(new { status = HttpStatusCode.OK, data, message = "Data berhasil ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak berhasil ditampilkan" });
            }
        }

        [HttpGet("GetSalary")]
        public ActionResult GetSalary()
        {
            var data = employeeRepository.GetSalary();
            if (data != null)
            {
                return Ok(new { status = HttpStatusCode.OK, data, message = "Data berhasil ditampilkan" });
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Data tidak berhasil ditampilkan" });
            }
        }


    }
}
