FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556 AS build

WORKDIR /app

COPY *.sln .
COPY *.csproj ./
RUN dotnet restore *.csproj

COPY . ./
WORKDIR /app
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "english-to-learn.dll"]

EXPOSE 5225
