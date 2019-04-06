FROM microsoft/dotnet:2.2-runtime AS base
WORKDIR /app

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY DockerProcess/DockerProcess.csproj DockerProcess/
RUN dotnet restore DockerProcess/DockerProcess.csproj
COPY . .
WORKDIR /src/DockerProcess
RUN dotnet build DockerProcess.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish DockerProcess.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "DockerProcess.dll"]
