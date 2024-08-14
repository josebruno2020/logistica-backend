docker compose up --build -d
docker compose exec app yarn migration:run
docker compose exec app yarn seed:run