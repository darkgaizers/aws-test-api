FRONT_URL=http://aws-test-api-frontend-dev-alb-1274002644.ap-southeast-1.elb.amazonaws.com
colon := :
aws-test-api-network:
	docker network create aws-test-api-net
db:
    docker run -d --name aws-test-api-database \
    --network=aws-test-api-net \
    -p 5432:5432 \
    -e "POSTGRES_USER=admin" \
    -e "POSTGRES_DB=aws-test-api" \
    -e "POSTGRES_PASSWORD=admin" \
    postgres:13-alpine
build:
    docker build -t aws-test-api . \
    --build-arg DB_HOSTNAME=localhost \
    --build-arg DB_USERNAME=admin \
    --build-arg DB_PASSWORD=admin \
    --build-arg API_URL=$(FRONT_URL)
run:
    docker run -d --name aws-test-api --network=aws-test-api-net -p 3000$(colon)3000 aws-test-api$(colon)latest
build-long:
    docker build -t aws-test-api . --build-arg DB_HOSTNAME=aws-test-api-database --build-arg DB_USERNAME=admin --build-arg DB_PASSWORD=admin --build-arg FRONT_URL=$(FRONT_URL)