TODO

run local

docker network create  aws-local-network

docker-machine start
docker-machine env
eval $(docker-machine env)

docker run -d -v "$PWD":/dynamodb_local_db -p 8000:8000 --network aws-local-network cnadiminti/dynamodb-local:latest 

cd data

node createTable.js
node loadData.js



npm run api



populate db etc



TODO:

1)  Finish API
2)  Deploy
3)  Tests
4)  Config swtich db local/prod
5)  Data stay/config local
6)  Distrubtion size - don't include dev deps