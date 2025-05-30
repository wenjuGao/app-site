docker stop appblog
docker rm appblog
docker rmi appblog
docker build -t appblog .
docker run -itd --name appblog -p 3000:3000 appblog