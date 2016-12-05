var Connector = require('ss-server_web');
var config = require('./cfg/server.json');

// 创建服务器配置相关
var server = new Connector();
// 配置服务器
server.configure('server', config.web);
// 加载协议处理
server.configure('handle', './cfg/handle.json');

// 开启服务器
server.start();