﻿using API_New.Context;
using API_New.Models;
using API_New.Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_New.Repository.Data
{
    public class UniversityRepository : GeneralRepository<MyContext, University, int>
    {
        public UniversityRepository(MyContext myContext) : base(myContext)
        {
        }
    }
}
