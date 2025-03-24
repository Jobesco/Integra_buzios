
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build

WORKDIR /app
COPY . .
# RUN ["mvn", "clean", "install", "-DskipTests"]
RUN ["mvn", "install", "-DskipTests"]


# Final!
# FROM gcr.io/distroless/java AS final
FROM eclipse-temurin:22 AS final
# DEBUG
# FROM bash:latest AS final

WORKDIR /app
COPY --from=build /root/.m2/repository/com/cesar/integra/0.0.1-SNAPSHOT/integra-0.0.1-SNAPSHOT.jar target/integra-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "target/integra-0.0.1-SNAPSHOT.jar"]
# CMD ["-jar", "target/integra-0.0.1-SNAPSHOT.jar"]
# CMD ["tail", "-f", "/dev/null"]