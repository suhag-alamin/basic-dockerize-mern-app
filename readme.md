docker build -t name -f Dockerfile.prod . # Build image

docker-compose -f docker-compose.prod.yml up -d --build # Run container
docker-compose -f docker-compose.prod.yml build # Build image
