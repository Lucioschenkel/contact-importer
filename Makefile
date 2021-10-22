build:
	sudo docker-compose build

start:
	sudo docker-compose up -d

logs:
	sudo docker logs contact_server -f

login:
	sudo docker-compose exec app /bin/bash