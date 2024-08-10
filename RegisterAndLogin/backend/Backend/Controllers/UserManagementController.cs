using Backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class UserManagementController : Controller
    {

        [HttpGet]
        public List<User> GetUsers()
        {
            List<User> result = new List<User>();
            using (var db = new travelnestContext())
            {
                result = db.Users.ToList();
            }
            return result;

        }


        [HttpGet]
        public List<City> GetCity()
        {
            List<City> result = new List<City>();
            using (var db = new travelnestContext())
            {
                result = db.Cities.ToList();
            }

            Console.WriteLine("Retrieved cities:");
            foreach (var city in result)
            {
                Console.WriteLine($"CityId: {city.CityId}, Cname: {city.Cname}");
            }
            return result;

        }

        [HttpGet("{cityId}")]
        public List<Area> GetAreasByCity(int cityId)
        {
            List<Area> result = new List<Area>();
            using (var db = new travelnestContext())
            {
                result = db.Areas.Where(a => a.CityId == cityId).ToList();
            }
            return result;
        }

        [HttpGet]
        public List<Role> GetRoles()
        {
            List<Role> result = new List<Role>();
            using (var db = new travelnestContext())
            {
                result = db.Roles.ToList();
            }
            return result;
        }

        [HttpGet]
        public List<SecurityQuestion> GetSecurityQuestions()
        {
            List<SecurityQuestion> result = new List<SecurityQuestion>();
            using (var db = new travelnestContext())
            {
                result = db.SecurityQuestions.ToList();
            }
            return result;
        }


        [HttpPost]
        public User SaveUser(User user)
        {
            Console.WriteLine("Received user data:");
            Console.WriteLine($"First Name: {user.Fname}");
            Console.WriteLine($"Last Name: {user.Lname}");
            Console.WriteLine($"Email: {user.Email}");
            Console.WriteLine($"Saving user: {user.Fname}, {user.Email}");

            using (var db = new travelnestContext())
            {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                if (user.RoleId == 3)
                {
                    user.Authorized = 1;
                }

                Console.WriteLine(user);

                db.Users.Add(user);
                db.SaveChanges();
            }
            return user;
        }

        

        [HttpPost]
        public User VerifyLogin(LoginModel login)
        {
            User? userdb;
            using (var db = new travelnestContext())
            {
                userdb = db.Users.Where(u => u.Email == login.Email).FirstOrDefault();
                if (userdb != null)
                {
                    if (BCrypt.Net.BCrypt.Verify(login.Password, userdb.Password))
                    {
                        return userdb;
                    }
                }
            }
            return userdb;

        }
    }
}
