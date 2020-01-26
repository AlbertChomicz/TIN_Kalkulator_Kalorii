Serwer MySQL: MySQL Server 8.0 - korzystałem z MySQL Workbench 8.0 CE.
BackEnd: Spring Boot
Front: React

W celu uruchomienia API, należy w pliku application.properties 
podać nazwę bazy danych, login oraz hasło.
Aplikacja skonfigurowana jest tak, że sama utworzy odpowiednie encje.
W tym celu przy pierwszym uruchomieniu należe odkomentować linię:
# spring.jpa.hibernate.ddl-auto=create
Po pierwszym uruchomieniu należy ją zakomentować aby wprowadzone dane utrzymywały 
się w bazie.
Pełna ścieżka: Kalkulator_Kalorii_v2\demo\src\main\resources\application.properties
API uruchamiamy poleceniem: mvn spring-boot:run

Po utworzeniu encji można zainsertować przykładowe dane znajdujące się w pliku DB_INSERT.sql

Aplilkację React uruchamiamy poleceniem npm start.
Gotowe.