/**
  * Module dependencies.
  */
var redis = require('redis-cluster').clusterClient;

// expose

module.exports = function(done){
  new redis.clusterInstance(firstRedisNode, done);
};
