# Introduction 
This is Mobster Forum, a Reddit/Flashback inspired website created during spring 2022 at Newton YH in Malmö.

This project uses the following technologies:
- ReactJS with Vite
- ASP.Net Core Web Api
- MS SQL
- Auth0

# Prerequisites
- .Net Core SDK
- Node.JS
- MS SQL

# Getting Started
1. Clone the repo
2. Then run the following:

```bash
npm install # in frontend directory
npm run dev # in frontend directory
```
3. In the backend directory, Seed the database with mock data by removing the outcommented method call ```seed.SeedDatabase().Wait();``` in Program.cs
4. Run the Web api once and comment out the method call above
5. Run the backend server with your preferred choice (either in vs studio or via terminal). We used port 44304. 
6. Default frontend can be found at localhost:3000

