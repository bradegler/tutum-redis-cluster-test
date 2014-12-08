FROM        dockerfile/ubuntu
RUN         apt-get update &&\
            apt-get install -y redis-server &&\
            service redis stop &&\
            redis-trib.rb create --replicas 1 \
              127.0.0.1:7000\
              127.0.0.1:7001\
              127.0.0.1:7002\
              127.0.0.1:7003\
              127.0.0.1:7004\
              127.0.0.1:7005
ENTRYPOINT  ["/usr/bin/redis-server"]