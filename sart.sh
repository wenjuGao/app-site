docker build -t appblog .
docker run -itd --name appblog -p 3000:3000 appblog