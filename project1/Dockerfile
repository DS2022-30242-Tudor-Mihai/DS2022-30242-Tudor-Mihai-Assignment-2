FROM openjdk:18-oracle

ADD . ./project1
WORKDIR /project1

ARG JAR_FILE=*.jar
COPY  ./target/project1-0.0.1-SNAPSHOT.jar ./project1-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "project1-0.0.1-SNAPSHOT.jar"]