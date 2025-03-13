
# FROM maven:3.9.9-eclipse-temurin-22-alpine AS build
# FROM maven:3.9.9-eclipse-temurin-11-alpine AS build
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
# FROM maven:latest AS build


WORKDIR /app
COPY . .
# RUN ["mvn", "clean", "install", "-DskipTests"]
RUN ["mvn", "install", "-DskipTests"]

# FROM eclipse-temurin:latest
# COPY --from=build \
#   /home/aoo/target/demo-0.0.1-SNAPSHOT.jar \
#   /usr/local/lib/demo.jar
# EXPOSE 8080
# ENTRYPOINT java -jar /usr/local/lib/demo.jar

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


#10 46.41 [INFO] Installing /app/pom.xml to /root/.m2/repository/com/cesar/integra/0.0.1-SNAPSHOT/integra-0.0.1-SNAPSHOT.pom
#10 46.41 [INFO] Installing /app/target/integra-0.0.1-SNAPSHOT.jar to /root/.m2/repository/com/cesar/integra/0.0.1-SNAPSHOT/integra-0.0.1-SNAPSHOT.jar
#10 46.46 [INFO] ------------------------------------------------------------------------
#10 46.46 [INFO] BUILD SUCCESS
#10 46.46 [INFO] ------------------------------------------------------------------------
#10 46.46 [INFO] Total time:  45.158 s
#10 46.46 [INFO] Finished at: 2025-03-13T19:51:56Z
#10 46.46 [INFO] ------------------------------------------------------------------------
#10 DONE 46.7s