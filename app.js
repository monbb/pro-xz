const express=require('express');
// 引入pro路由器
var proRouter=require('./router/pro');
// 引入body-parser模块
const bodyParser=require('body-parser');

var app=express();
app.listen(8080);

app.use(express.static('public'));

// 先中间件，再路由
app.use(bodyParser.urlencoded({
    extended:false
}))

// 使用pro路由器
app.use('/pro',proRouter);
