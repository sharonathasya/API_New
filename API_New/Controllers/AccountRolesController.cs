﻿using API_New.Controllers.Base;
using API_New.Models;
using API_New.Repository.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_New.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountRolesController : BaseController<AccountRole, AccountRoleRepository, string>
    {
        public AccountRolesController(AccountRoleRepository accountroleRepository) : base(accountroleRepository)
        {

        }
    }
}
