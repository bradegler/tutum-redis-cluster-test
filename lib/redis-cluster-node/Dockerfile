FROM        dockerfile/ubuntu
ADD         . /opt
WORKDIR     /opt
RUN         apt-get update &&\
            apt-get install -y make &&\
            wget https://github.com/antirez/redis/archive/3.0.0-rc1.tar.gz &&
            tar xzf redis-3.0.0-rc1.tar.gz &&
            rm -f redis-3.0.0-rc1.tar.gz
WORKDIR     redis-3.0.0-rc1
RUN         make
EXPOSE      6379
ENTRYPOINT  ["src/redis-server ./redis.conf"]
