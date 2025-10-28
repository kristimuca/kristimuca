# API Server

This repository contains a simple API server built with .NET. It features basic API key authentication and several example endpoints that interact with an SQLite database. This guide will walk you through installing the .NET SDK on macOS using Homebrew, cloning the repository, restoring dependencies, building the project, and running the server. Additionally, you'll find an example React code snippet to consume the API.

## Prerequisites

- macOS (Apple Silicon supported)
- [Homebrew](https://brew.sh/)
- Git
- Node.js and npm (for the React frontend)

## Installation

### 1. Install .NET SDK via Homebrew

Open your Terminal and execute:

```bash
brew install --cask dotnet-sdk
```

After installation, verify by running:

```bash
dotnet --version
```

### 2. Clone the Repository

Clone the repository using SSH:

```bash
git clone git@gitlab.com:Ereseni/api-server.git

cd api-server
```

### 3. Restore, Build, and Run the Application
Restore the NuGet packages:

```bash
dotnet restore

dotnet build

dotnet run
```
