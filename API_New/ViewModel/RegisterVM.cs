using API_New.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;


namespace API_New.ViewModel
{
    public class RegisterVM 
    {
        [Required]
        public string NIK { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        
        [Phone]
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        [Required]
        public int Salary { get; set; }

        [Newtonsoft.Json.JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Degree { get; set; }

        [Required]
        public string GPA { get; set; }

        [Required]
        public int UniversityId { get; set; }
        [Required]
        public int RoleId { get; set; }

    }
    public enum Gender
    {
        Male,
        Female
    }

    public class Register
    {
        [Required]
        public string NIK { get; set; }
       
        public string FullName { get; internal set; }
        [Phone]
        public string Phone { get; set; }
        public DateTime BirthDate { get; set; }
        [Required]
        public int Salary { get; set; }

        [Newtonsoft.Json.JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        /*[Required]
        public string Password { get; set; }*/

        [Required]
        public string Degree { get; set; }

        [Required]
        public string GPA { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string RoleName { get; set; }
    }

}
