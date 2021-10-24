build:
	docker-compose build

start:
	docker-compose up -d

logs:
	docker logs contact_server -f

login:
	docker-compose exec app /bin/bash