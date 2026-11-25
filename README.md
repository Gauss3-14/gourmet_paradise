# Gourmet Paradise API

Backend REST del proyecto Gourmet Paradise (Node.js + Express + Mongoose + MongoDB).

## Requisitos

- Docker y Docker Compose
- Node.js >= 20.19 (solo si ejecutas la app fuera de Docker)
- MongoDB Compass (para cargar los datos)

## Levantar todo con Docker

```bash
docker compose up -d --build
```

Servicios creados:

| Servicio | Contenedor | Acceso |
| --- | --- | --- |
| `webapp` | `gourmet_paradise_app` | http://localhost:5000 |
| `database` | `gourmet_paradise_db` | `mongodb://localhost:27019` |

Los datos se guardan en el volumen `mongo_data`, por lo que sobreviven a `docker compose down`.

## Cargar los datos con Compass

1. Abrir Compass y conectarse a `mongodb://localhost:27019`.
2. Usar la base de datos `gourmet_paradise_db`.
3. Importar cada archivo JSON en una colección con el mismo nombre que el archivo:

```
roles, categorias, marcas, cupones, usuarios, productos, pedidos, resenas,
publicaciones, comentarios, reacciones, grupos, miembros_grupo,
notificaciones, tickets_soporte, mensajes_ticket
```

No importar `reporte_incidencias.json` (es un reporte de validacion, no una coleccion).

## Ejecutar la app localmente (sin Docker)

Requiere un MongoDB escuchando en `localhost:27019` (puedes levantar solo la DB con `docker compose up -d database`).

```bash
npm install
npm start
```

La API queda en http://localhost:3000.

## Variables de entorno

| Variable | Valor por defecto |
| --- | --- |
| `PORT` | `3000` |
| `MONGO_URI` | `mongodb://localhost:27019/gourmet_paradise_db` |

En Docker Compose, `MONGO_URI` se define como `mongodb://database:27017/gourmet_paradise_db`.

## Endpoints

Base: `/api/<coleccion>`. Todas las colecciones exponen el mismo CRUD:

| Metodo | Ruta | Accion |
| --- | --- | --- |
| GET | `/api/<coleccion>` | Listar documentos |
| GET | `/api/<coleccion>/:id` | Obtener uno por id |
| POST | `/api/<coleccion>` | Crear |
| PUT | `/api/<coleccion>/:id` | Actualizar |
| DELETE | `/api/<coleccion>/:id` | Eliminar |

Ademas: `GET /` (info), `GET /health` (estado de la app y la DB).

### Colecciones e tipo de `_id`

| `_id` numerico | `_id` ObjectId |
| --- | --- |
| roles, categorias, marcas, cupones, usuarios, productos, pedidos, resenas | publicaciones, comentarios, reacciones, grupos, miembros_grupo, notificaciones, tickets_soporte, mensajes_ticket |

- En colecciones con `_id` numerico, el `POST` calcula el siguiente entero automaticamente.
- En colecciones con `_id` ObjectId, el `_id` lo genera MongoDB.

### Ejemplos

```bash
curl http://localhost:5000/api/productos
curl http://localhost:5000/api/productos/1

curl -X POST http://localhost:5000/api/categorias \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Postres\",\"slug\":\"postres\",\"descripcion\":\"Dulces\",\"activo\":true}"

curl -X PUT http://localhost:5000/api/categorias/9 \
  -H "Content-Type: application/json" \
  -d "{\"activo\":false}"

curl -X DELETE http://localhost:5000/api/categorias/9
```
