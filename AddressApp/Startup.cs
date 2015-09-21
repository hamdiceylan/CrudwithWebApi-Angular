using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AddressApp.Startup))]
namespace AddressApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
