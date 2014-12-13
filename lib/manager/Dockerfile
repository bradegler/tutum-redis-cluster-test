FROM        dockerfile/ubuntu
WORKDIR     /opt
RUN         apt-get update
RUN         apt-get install -y make wget
RUN         wget https://github.com/antirez/redis/archive/3.0.0-rc1.tar.gz
RUN         tar xzf 3.0.0-rc1.tar.gz
RUN         rm -f 3.0.0-rc1.tar.gz
WORKDIR     redis-3.0.0-rc1
RUN         make
EXPOSE      6379
RUN         apt-get install -y nodejs
RUN         apt-get install -y ruby
RUN         apt-get install -y rubygems-integration
RUN         gem install redis
RUN         apt-get install -y npm
ADD         package.json /tmp/package.json
RUN         cd /tmp && npm install
RUN         mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app
ADD         . /opt/app
WORKDIR     /opt/app
CMD         DEBUG=app:* nodejs bin/run
