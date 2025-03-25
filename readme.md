# Instalar dependencias
```
npm install
```

# Ejecutar Base de datos de MariadDB & Redis
Debes tener instalado docker desktop para windows y tener configuradas las variables de entorno MARIADB_USER, MARIADB_PASSWORD, MARIADB_HOST, MARIADB_PORT ya que se crea el contenedor a partir de las variables de entorno
```
docker-compose up -d
```