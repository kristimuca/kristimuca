using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Json;
using System.Text.Json.Serialization;
using System.Security.Cryptography;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// Enable CORS for your React app
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost5173", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure JSON options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

var app = builder.Build();

app.UseCors("AllowLocalhost5173");

// Define your API key (for demo purposes, use a secure method in production)
const string apiKey = "mysecretapikey";

// Define a secret key for JWT token generation/validation (store securely in production)
var jwtSecretKey = "your_super_secret_jwt_key_that_is_long_enough";

// SQLite connection string (database file will be created in the project folder)
var connectionString = "Data Source=appdata.db";

// Initialize SQLite database and create tables if not exists

// Create Items table (existing)
using (var connection = new SqliteConnection(connectionString))
{
    connection.Open();
    var tableCmd = connection.CreateCommand();
    tableCmd.CommandText =
        @"CREATE TABLE IF NOT EXISTS Items (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL
          );";
    tableCmd.ExecuteNonQuery();
}

// Create Users table
using (var connection = new SqliteConnection(connectionString))
{
    connection.Open();
    var tableCmd = connection.CreateCommand();
    tableCmd.CommandText =
        @"CREATE TABLE IF NOT EXISTS Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username TEXT NOT NULL UNIQUE,
            PasswordHash TEXT NOT NULL
          );";
    tableCmd.ExecuteNonQuery();
}

// Create Workouts table
using (var connection = new SqliteConnection(connectionString))
{
    connection.Open();
    var tableCmd = connection.CreateCommand();
    tableCmd.CommandText =
        @"CREATE TABLE IF NOT EXISTS Workouts (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            UserId TEXT NOT NULL,
            SelectedExercise TEXT NOT NULL,
            Sets INTEGER NOT NULL,
            Reps INTEGER NOT NULL,
            Weight REAL NOT NULL,
            Date TEXT NOT NULL
          );";
    tableCmd.ExecuteNonQuery();
}

// Create Meals table
using (var connection = new SqliteConnection(connectionString))
{
    connection.Open();
    var tableCmd = connection.CreateCommand();
    tableCmd.CommandText =
        @"CREATE TABLE IF NOT EXISTS Meals (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            UserId TEXT NOT NULL,
            SelectedMeal TEXT NOT NULL,
            Calories INTEGER NOT NULL,
            Date TEXT NOT NULL
          );";
    tableCmd.ExecuteNonQuery();
}

// Helper method to compute SHA256 hash of a string
static string ComputeHash(string input)
{
    using (var sha256 = SHA256.Create())
    {
        var bytes = Encoding.UTF8.GetBytes(input);
        var hashBytes = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hashBytes);
    }
}

// Custom middleware for authentication
// Endpoints under /api/auth (registration & login) are public.
// Other /api endpoints require either the API key or a valid JWT Bearer token.
app.Use(async (context, next) =>
{
    // Allow registration and login endpoints without authentication
    if (context.Request.Path.StartsWithSegments("/api/auth"))
    {
        await next();
        return;
    }

    bool isAuthenticated = false;

    // Check for the API key header
    if (context.Request.Headers.TryGetValue("X-API-KEY", out var extractedApiKey))
    {
        if (extractedApiKey == apiKey)
        {
            isAuthenticated = true;
        }
    }

    // If API key not provided/invalid, check for a valid JWT Bearer token
    if (!isAuthenticated && context.Request.Headers.TryGetValue("Authorization", out var authHeader))
    {
        var token = authHeader.ToString().Replace("Bearer ", "");
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);
            // Validate the token and get the claims principal
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);
            // Set the user on the HttpContext so endpoints can access it
            context.User = principal;
            isAuthenticated = true;
        }
        catch
        {
            // Token validation failed
        }
    }

    if (!isAuthenticated)
    {
        context.Response.StatusCode = 401;
        await context.Response.WriteAsync("Unauthorized client.");
        return;
    }

    await next();
});

// Example endpoint: A simple greeting
app.MapGet("/api/hello", () =>
{
    return Results.Ok("Hello, authenticated user!");
});

// Example endpoint: Get all items from SQLite database
app.MapGet("/api/items", () =>
{
    var items = new List<Item>();
    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var selectCmd = connection.CreateCommand();
        selectCmd.CommandText = "SELECT Id, Name FROM Items;";
        using (var reader = selectCmd.ExecuteReader())
        {
            while (reader.Read())
            {
                items.Add(new Item(reader.GetInt32(0), reader.GetString(1)));
            }
        }
    }
    return Results.Ok(items);
});

// Example endpoint: Add a new item to the SQLite database
app.MapPost("/api/items", async (HttpContext context) =>
{
    var newItem = await context.Request.ReadFromJsonAsync<ItemCreateRequest>();
    if (newItem == null || string.IsNullOrWhiteSpace(newItem.Name))
    {
        return Results.BadRequest("Invalid item data.");
    }

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var insertCmd = connection.CreateCommand();
        insertCmd.CommandText = "INSERT INTO Items (Name) VALUES (@name);";
        insertCmd.Parameters.AddWithValue("@name", newItem.Name);
        insertCmd.ExecuteNonQuery();
    }
    return Results.Created($"/api/items", newItem);
});

// Registration endpoint: Create a new user
app.MapPost("/api/auth/register", async (HttpContext context) =>
{
    var registerRequest = await context.Request.ReadFromJsonAsync<RegisterRequest>();
    if (registerRequest == null || string.IsNullOrWhiteSpace(registerRequest.Username) || string.IsNullOrWhiteSpace(registerRequest.Password))
    {
        return Results.BadRequest("Invalid registration data.");
    }

    var passwordHash = ComputeHash(registerRequest.Password);

    try
    {
        using (var connection = new SqliteConnection(connectionString))
        {
            connection.Open();
            var insertCmd = connection.CreateCommand();
            insertCmd.CommandText = "INSERT INTO Users (Username, PasswordHash) VALUES (@username, @passwordHash);";
            insertCmd.Parameters.AddWithValue("@username", registerRequest.Username);
            insertCmd.Parameters.AddWithValue("@passwordHash", passwordHash);
            insertCmd.ExecuteNonQuery();
        }
    }
    catch (SqliteException)
    {
        // Likely a duplicate username error
        return Results.BadRequest("Username already exists.");
    }

    return Results.Ok("User registered successfully.");
});

// Login endpoint: Validate credentials and return a JWT token
app.MapPost("/api/auth/login", async (HttpContext context) =>
{
    var loginRequest = await context.Request.ReadFromJsonAsync<LoginRequest>();
    if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Username) || string.IsNullOrWhiteSpace(loginRequest.Password))
    {
        return Results.BadRequest("Invalid login data.");
    }

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var selectCmd = connection.CreateCommand();
        selectCmd.CommandText = "SELECT Id, PasswordHash FROM Users WHERE Username = @username;";
        selectCmd.Parameters.AddWithValue("@username", loginRequest.Username);
        using (var reader = selectCmd.ExecuteReader())
        {
            if (!reader.Read())
            {
                return Results.Unauthorized();
            }
            var userId = reader.GetInt32(0);
            var storedPasswordHash = reader.GetString(1);
            var providedHash = ComputeHash(loginRequest.Password);
            if (storedPasswordHash != providedHash)
            {
                return Results.Unauthorized();
            }

            // Credentials are valid – generate JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtSecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
                    new Claim(ClaimTypes.Name, loginRequest.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return Results.Ok(new { Token = tokenString });
        }
    }
});

// --------------------
// Workout Endpoints
// --------------------

// POST: Log a new workout (tied to the authenticated user)
app.MapPost("/api/workouts", async (HttpContext context) =>
{
    var workoutRequest = await context.Request.ReadFromJsonAsync<WorkoutRequest>();
    if (workoutRequest == null)
    {
        return Results.BadRequest("Invalid workout data.");
    }

    // Extract user id from the token's claims
    var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null)
    {
        return Results.Unauthorized();
    }
    var userId = userIdClaim.Value;

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var insertCmd = connection.CreateCommand();
        insertCmd.CommandText = @"INSERT INTO Workouts (UserId, SelectedExercise, Sets, Reps, Weight, Date)
                                  VALUES (@userId, @selectedExercise, @sets, @reps, @weight, @date);";
        insertCmd.Parameters.AddWithValue("@userId", userId);
        insertCmd.Parameters.AddWithValue("@selectedExercise", workoutRequest.SelectedExercise);
        insertCmd.Parameters.AddWithValue("@sets", workoutRequest.Sets);
        insertCmd.Parameters.AddWithValue("@reps", workoutRequest.Reps);
        insertCmd.Parameters.AddWithValue("@weight", workoutRequest.Weight);
        insertCmd.Parameters.AddWithValue("@date", workoutRequest.Date);
        insertCmd.ExecuteNonQuery();
    }
    return Results.Ok("Workout logged successfully.");
});

// GET: Retrieve workouts for the authenticated user
app.MapGet("/api/workouts", (HttpContext context) =>
{
    var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null)
    {
        return Results.Unauthorized();
    }
    var userId = userIdClaim.Value;
    var workouts = new List<WorkoutRecord>();

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var selectCmd = connection.CreateCommand();
        selectCmd.CommandText = @"SELECT Id, SelectedExercise, Sets, Reps, Weight, Date 
                                  FROM Workouts WHERE UserId = @userId;";
        selectCmd.Parameters.AddWithValue("@userId", userId);
        using (var reader = selectCmd.ExecuteReader())
        {
            while (reader.Read())
            {
                workouts.Add(new WorkoutRecord(
                    reader.GetInt32(0),
                    reader.GetString(1),
                    reader.GetInt32(2),
                    reader.GetInt32(3),
                    reader.GetDouble(4),
                    reader.GetString(5)
                ));
            }
        }
    }
    return Results.Ok(workouts);
});

// --------------------
// Meal Endpoints
// --------------------

// POST: Log a new meal (tied to the authenticated user)
app.MapPost("/api/meals", async (HttpContext context) =>
{
    var mealRequest = await context.Request.ReadFromJsonAsync<MealRequest>();
    if (mealRequest == null)
    {
        return Results.BadRequest("Invalid meal data.");
    }

    var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null)
    {
        return Results.Unauthorized();
    }
    var userId = userIdClaim.Value;

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var insertCmd = connection.CreateCommand();
        insertCmd.CommandText = @"INSERT INTO Meals (UserId, SelectedMeal, Calories, Date)
                                  VALUES (@userId, @selectedMeal, @calories, @date);";
        insertCmd.Parameters.AddWithValue("@userId", userId);
        insertCmd.Parameters.AddWithValue("@selectedMeal", mealRequest.SelectedMeal);
        insertCmd.Parameters.AddWithValue("@calories", mealRequest.Calories);
        insertCmd.Parameters.AddWithValue("@date", mealRequest.Date);
        insertCmd.ExecuteNonQuery();
    }
    return Results.Ok("Meal logged successfully.");
});

// GET: Retrieve meals for the authenticated user
app.MapGet("/api/meals", (HttpContext context) =>
{
    var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier);
    if (userIdClaim == null)
    {
        return Results.Unauthorized();
    }
    var userId = userIdClaim.Value;
    var meals = new List<MealRecord>();

    using (var connection = new SqliteConnection(connectionString))
    {
        connection.Open();
        var selectCmd = connection.CreateCommand();
        selectCmd.CommandText = @"SELECT Id, SelectedMeal, Calories, Date 
                                  FROM Meals WHERE UserId = @userId;";
        selectCmd.Parameters.AddWithValue("@userId", userId);
        using (var reader = selectCmd.ExecuteReader())
        {
            while (reader.Read())
            {
                meals.Add(new MealRecord(
                    reader.GetInt32(0),
                    reader.GetString(1),
                    reader.GetInt32(2),
                    reader.GetString(3)
                ));
            }
        }
    }
    return Results.Ok(meals);
});

app.Run();

// --------------------
// Data Models
// --------------------
public record Item(int Id, string Name);
public record ItemCreateRequest(string Name);
public record RegisterRequest(string Username, string Password);
public record LoginRequest(string Username, string Password);

public record WorkoutRequest(string SelectedExercise, int Sets, int Reps, double Weight, string Date);
public record WorkoutRecord(int Id, string SelectedExercise, int Sets, int Reps, double Weight, string Date);

public record MealRequest(string SelectedMeal, int Calories, string Date);
public record MealRecord(int Id, string SelectedMeal, int Calories, string Date);
