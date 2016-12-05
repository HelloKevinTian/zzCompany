var request = require('request');
var util = require('util');
var async = require("async");
var mongo = require('mongoskin');
var logger = require('ss-logger').getLogger(__filename);
var config = require('../cfg/server.json');

var dbs = {};
var dbOptions = {
    safe: true,
    maxPoolSize: config.mongodb.max_pool_size || 1000
};

var _dbName = util.format('%s:%s/%s/?auto_reconnect', config.mongodb.host, config.mongodb.port, config.mongodb.db);

var _db = mongo.db(_dbName, dbOptions);

/**
 * 获取db控制对象
 */
function getDB(host, port, db) {
    db = db || 'test';

    var dbName = util.format('%s:%s/%s/?auto_reconnect', host, port, db);
    var name = util.format('%s:%s/%s', host, port, db);
    if (dbs[name]) {
        return dbs[name];
    };
    var db = mongo.db(dbName, dbOptions);
    dbs[name] = db;
    return db;
};

module.exports = {
    'db': _db,
    'getDB': getDB
};