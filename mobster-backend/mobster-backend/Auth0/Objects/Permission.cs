namespace mobster_backend.Auth0.Objects
{
    public class Permission
    {

            public string resource_server_identifier { get; } = "https://mobster/api";
            public string permission_name { get; set; }
    }
}
