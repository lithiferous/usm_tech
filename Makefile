#!make
run:
	sudo docker-compose up

load_data: 
	sudo docker exec backend "node" "server/load.js"

list_data:
	curl -X GET "localhost:9200/market/_search?pretty"
