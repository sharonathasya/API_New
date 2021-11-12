using API_New.Context;
using API_New.Models;
using API_New.Repository.Interface;
using API_New.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace API_New.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<MyContext, Employee, string>
    {
        private static string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }

        private readonly MyContext myContext;
        public EmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public IEnumerable<Register> GetProfile()
        {
            var getProfile     = (from emp in myContext.Employees
                                 join acc in myContext.Accounts on
                                 emp.NIK equals acc.NIK
                                 join prof in myContext.Profilings on
                                 acc.NIK equals prof.NIK
                                 join edu in myContext.Educations on
                                 prof.EducationId equals edu.EducationId
                                 join uni in myContext.Universities on
                                 edu.UniversityId equals uni.UniversityId
                                 join acr in myContext.AccountRoles on
                                 acc.NIK equals acr.NIK
                                 join r in myContext.Roles on
                                 acr.RoleId equals r.RoleId
                                 select new Register
                                 {
                                     NIK = emp.NIK,
                                     FullName = emp.FirstName + " " + emp.LastName,
                                     Phone = emp.Phone,
                                     BirthDate = emp.BirthDate,
                                     Salary = emp.Salary,
                                     Gender = (ViewModel.Gender)emp.Gender,
                                     Email = emp.Email,
                                     //Password = acc.Password,
                                     Degree = edu.Degree,
                                     GPA = edu.GPA,
                                     Name = uni.Name,
                                     RoleName = r.RoleName
                                 }).ToList();

            return getProfile;
        }

        public IEnumerable<Register> GetProfile(string NIK)
        {
            var getProfile = (from emp in myContext.Employees
                            join acc in myContext.Accounts on
                            emp.NIK equals acc.NIK
                            join prof in myContext.Profilings on
                            acc.NIK equals prof.NIK
                            join edu in myContext.Educations on
                            prof.EducationId equals edu.EducationId
                            join uni in myContext.Universities on
                            edu.UniversityId equals uni.UniversityId
                            join acr in myContext.AccountRoles on
                            acc.NIK equals acr.NIK
                            join r in myContext.Roles on
                            acr.RoleId equals r.RoleId
                            select new Register
                            {
                                NIK = emp.NIK,
                                FullName = emp.FirstName + " " + emp.LastName,
                                Phone = emp.Phone,
                                BirthDate = emp.BirthDate,
                                Salary = emp.Salary,
                                Gender = (ViewModel.Gender)emp.Gender,
                                Email = emp.Email,
                                //Password = acc.Password,
                                Degree = edu.Degree,
                                GPA = edu.GPA,
                                Name = uni.Name,
                                RoleName = r.RoleName
                            }).Where(emp => emp.NIK == NIK).ToList();

            return getProfile;
        }

        public int Register(RegisterVM registerVM)
        { 
            Employee employee = new Employee();
            employee.NIK = registerVM.NIK;

            var checkNIK = myContext.Employees.Find(registerVM.NIK);
            if (checkNIK != null)
            {
                return 2;
            }
            employee.FirstName = registerVM.FirstName;
            employee.LastName = registerVM.LastName;
            employee.Email = registerVM.Email;
            employee.Phone = registerVM.Phone;
            var checkEmail = myContext.Employees.Where(a => a.Email == registerVM.Email).FirstOrDefault();
            var checkPhone = myContext.Employees.Where(b => b.Phone == registerVM.Phone).FirstOrDefault();
            if (checkPhone != null)
            {
                return 3;
            }
            if (checkEmail != null)
            {
                return 4;
            }

            employee.BirthDate = registerVM.BirthDate;
            employee.Salary = registerVM.Salary;
            employee.Gender = (Models.Gender)registerVM.Gender;
            myContext.Employees.Add(employee);
            var result = myContext.SaveChanges();
            

            Account account = new Account();
            account.NIK = employee.NIK;
            account.Password = BCrypt.Net.BCrypt.HashPassword(registerVM.Password, GetRandomSalt());
            myContext.Accounts.Add(account);
            myContext.SaveChanges();

            Education education = new Education();
            education.Degree = registerVM.Degree;
            education.GPA = registerVM.GPA;
            education.UniversityId = registerVM.UniversityId;
            myContext.Educations.Add(education);
            myContext.SaveChanges();

            Profiling profiling = new Profiling();
            profiling.NIK = registerVM.NIK;
            profiling.EducationId = education.EducationId;
            myContext.Profilings.Add(profiling);
            myContext.SaveChanges();

            int checkRole = registerVM.RoleId;
            int roleId;
            if(checkRole == 0)
            {
                roleId = 1;
            } 
            else
            {
                roleId = checkRole;
            }
            AccountRole accountRole = new AccountRole()
            {
                NIK = account.NIK,
                RoleId = roleId
            };
            myContext.AccountRoles.Add(accountRole);
            myContext.SaveChanges();

            return result;

        }

        public string Login(LoginVM loginVM)
        {
            var checkEmail = myContext.Employees.Where(e => e.Email == loginVM.Email).FirstOrDefault();
            if (checkEmail != null)
            {
                var getNIK = checkEmail.NIK;
                var getPassword = myContext.Accounts.Find(getNIK);
                string pass = getPassword.Password;
                bool validPass = BCrypt.Net.BCrypt.Verify(loginVM.Password, getPassword.Password);
                if (validPass == true)
                {
                    return getNIK;
                }
                else
                {
                    var result = "password";
                    return result;
                }
            }
            else
            {
                var result = "email";
                return result;
            }
        }

        public int Sign(LoginVM loginVM)
        {
            var checkEmail = myContext.Employees.Where(e => e.Email == loginVM.Email).FirstOrDefault();
            if (checkEmail != null)
            {
                var getNIK = checkEmail.NIK;
                var getPassword = myContext.Accounts.Find(getNIK);
                string pass = getPassword.Password;
                bool validPass = BCrypt.Net.BCrypt.Verify(loginVM.Password, getPassword.Password);
                if (validPass == true)
                {
                    return 1;
                }
                else
                {
                    var result = 0;
                    return result;
                }
            }
            else
            {
                var result = 2;
                return result;
            }
        }

        public string[] GetRole(string email)
        {
            var getData = myContext.Employees.Where(a => a.Email == email).FirstOrDefault();
            var getRole = (from acr in myContext.AccountRoles
                           join r in myContext.Roles on acr.RoleId equals r.RoleId
                           select new
                           {
                               NIK = acr.NIK,
                               RoleName = r.RoleName
                           }).Where(acr => acr.NIK == getData.NIK).ToList();
            List<string> result = new List<string>();
            foreach (var item in getRole)
            {
                result.Add(item.RoleName);
            }
            return result.ToArray();
        }

        public int AddManager(AccountRole accountRole)
        {
            try
            {
                myContext.AccountRoles.Add(accountRole);
                var result = myContext.SaveChanges();
                return result;
            }
            catch(Exception)
            {
                return 0;
            }
        }

        public IEnumerable GetGender()
        {
            var result = (from emp in myContext.Employees
                         group emp by emp.Gender into x
                         select new
                         {
                             gender = (ViewModel.Gender1)x.Key,
                             value = x.Count()
                         });
            return result;
        }

        public IEnumerable GetRole()
        {
            var result = (from acr in myContext.AccountRoles
                          join rol in myContext.Roles
                         on acr.RoleId equals rol.RoleId
                          group rol by new { rol.RoleId, rol.RoleName } into a
                          select new
                          {
                              role = a.Key.RoleName,
                              value = a.Count()
                          });
            return result;
        }

        public object[] GetSalary()
        {
            var label1 = (from emp in myContext.Employees
                          select new
                          {
                              label = "Rp. 1.0000.000 - 3.000.000",
                              value = myContext.Employees.Where(a => a.Salary <= 3000000 && a.Salary >= 1000000).Count()
                          }).First();

            var label2 = (from emp in myContext.Employees
                          select new
                          {
                              label = "Rp 3.0000.000 - 6.000.000",
                              value = myContext.Employees.Where(a => a.Salary <= 6000000 && a.Salary >= 3000000).Count()
                          }).First();

            var label3 = (from emp in myContext.Employees
                          select new
                          {
                              label = "Rp. 6.0000.000 - 9.000.000",
                              value = myContext.Employees.Where(a => a.Salary <= 9000000 && a.Salary >= 6000000).Count()
                          }).First();

            var label4 = (from emp in myContext.Employees
                          select new
                          {
                              label = "> Rp. 9.000.000",
                              value = myContext.Employees.Where(a => a.Salary >= 9000000).Count()
                          }).First();
            List<Object> result = new List<Object>();
            result.Add(label3);
            result.Add(label1);
            result.Add(label4);
            result.Add(label2);

            return result.ToArray();
            /*var result = (from emp in myContext.Employees
                          group emp by emp.Salary into x
                          select new
                          {
                              salary = x.Key,
                              value = x.Count()
                          });
            return result;*/
        }
    }

}
