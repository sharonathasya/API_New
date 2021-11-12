using API_New.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_New.Repository.Interface
{
    interface IEmployeeRepository
    {
        
            IEnumerable<Employee> Get();
            Employee Get(string NIK);
            int Insert(Employee employee);
            int Update(Employee employee);
            int Delete(string NIK);

        
    }
}
