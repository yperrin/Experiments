using excit.common;
using excit.common.model;
using Lamar;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Swagger;
using MediatR;

namespace ExcitCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureContainer(ServiceRegistry services)
        {
            services.AddMvc();
            services.AddMediatR(typeof(Startup).Assembly, typeof(asi.excit.common.Interfaces.IService).Assembly);
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "Direct Connect",
                    Description = "Direct Connect API, unified interface to connect so supplier services",
                    TermsOfService = "None",
                    Contact = new Contact() { Name = "Direct Connect API", Email = "support@asicentral.com", Url = "https://dc.asicentral.com" }
                });
            });
            string redisConfigString = Configuration.GetSection("ConnectionStrings:RedisConfiguration").Value;
            string[] redisConfig = redisConfigString.Split(";");
            var applicationSettings = new ApplicationSettings
            {
                ConfigurationConnectionString = Configuration.GetSection("ConnectionStrings:ConfigurationDB").Value,
                EventHubConnectionString = Configuration.GetSection("ConnectionStrings:EventHub").Value,
                RedisconnectionString = redisConfig[0],
                RedisPassword = redisConfig[1],
            };
            IocConfiguration.ConfigureContainer(applicationSettings, services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Direct Connect V1");
            });
        }
    }
}
