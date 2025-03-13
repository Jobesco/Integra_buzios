# Integra_buzios

## Pré-requisitos

Antes de começar, você precisa ter os seguintes itens instalados no seu sistema:

1. **Java JDK 22**:
   - Você pode baixar o JDK 22 no site oficial da Oracle ou OpenJDK.

2. **Maven**:
   - Baixe e instale o Apache Maven a partir do [site oficial do Maven](https://maven.apache.org/download.cgi).

## Configuração do banco

Para configurar o banco MySQL basta alterar o arquivo application.properties na pasta 
(Integra_buzios\integra\src\main\resources) ajustando as seguintes linhas:

spring.datasource.url=jdbc:mysql://localhost:3306/{seu_banco}
spring.datasource.username={seu_usuario}
spring.datasource.password={sua_senha}
  

## Executando

1. Para instalar as dependências do projeto execute o seguinte comando na pasta integra:
   - mvn clean install
   
   ou
   - ./mvnw clean install

2. Para executar a aplicação spring:
   - mvn spring-boot:run
   
   ou
   - ./mvnw spring-boot:run