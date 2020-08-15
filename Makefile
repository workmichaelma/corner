up:
	docker-compose up
build:
	docker-compose up --build --force-recreate
sh:
	docker-compose exec sh
stop:
	docker-compose stop
down:
	docker-compose down
restart:
	make down; make up 
logs:
	docker-compose logs -f
app-eslint:
	docker-compose run --rm app npm run eslint