# Vega

Is a demo project using .NET Core and Angular

# Quickstart

1. Clone git repo and open Vega directory

2. Install npm dependencies
```bash
npm install
```

3. Instal dotnet dependencies
```bash
dotnet restore
```

4. Start application

* start:
```bash
dotnet run
```

* start and watch changes:
```bash
dotnet watch run
```

# Build application
```bash
dotnet build
```

# Update webpack bundle
```bash
webpack --config webpack.config.js
webpack --config webpack.config.vendor.js
```

# Apply migrations to the database
```bash
dotnet ef database update
```
