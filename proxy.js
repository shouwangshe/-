const express = require('express');
const http = require('http');
const app = express();

//cors设置
app.use("*",(req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "*"); //针对哪个域名可以访问，*表示所有
    res.setHeader('Access-Control-Allow-Credentials', true); //是否可以携带cookie
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.get('/proxy',(req,res) => {
    //获取查询字符串
    let url = req.query.url;
    let page = req.query.page || 1; //获取page参数
    let count = req.query.count || 5; //获取count参数
    let path = `${url}?page=${page}&count=${count}`;
    console.log(path);
    //需要向url发起请求，获取数据
    http.get(path,(response) => {
        let str = "";
        response.on('data', (chunk) => {
            str += chunk;
        });

        response.on('end',() => {
            //说明接受完毕，返回
            res.json(str);
        });
    });
});
app.listen(4000,() => {
    console.log('4000 ok');
})
