const express=require('express');
// 引入连接池对象
var pool=require('../pool');
var router=express.Router();

// 测试路由
router.get('/v1/test',(req,res)=>{
    res.send('测试路由');
})

// 登录
router.get('/v1/login/:uname&:upwd',(req,res)=>{
    var obj=req.params;
    pool.query('SELECT uid FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.length>0){
            res.send('1');
        }else{
            res.send('0');
        }
    })
})

// 用户列表（全部用户）
router.get('/v1/list',(req,res)=>{
    pool.query('SELECT uid,uname,upwd,email,phone,avatar,user_name,gender FROM xz_user',(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// 删除用户
router.delete('/v1/delUser/:uid',(req,res)=>{
    var obj=req.params;
    pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send('1');
    })
})

// 查询某个用户的所有信息
router.get('/v1/searchInfo/:uid',(req,res)=>{
    var obj=req.params;
    pool.query('SELECT uname,upwd,email,phone,gender FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// 检查用户名是否可用
router.get('/v1/checkUname/:uname',(req,res)=>{
    var obj=req.params;
    pool.query('SELECT uid FROM xz_user WHERE uname=?',[obj.uname],(err,result)=>{
        if(err){
            throw err;
        }
        if(result.length==0){          // 如果没找到，即：不重名，这是新名
            res.send('1');                 // 该名可用
        }else{                             // 否则，返回查到的记录
            res.send(result);   
        }
    })
})

// 修改
router.put('/v1/updateUser',(req,res)=>{
    var obj=req.body;
    pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
        if(err){
            throw err;
        }
        res.send('1');
    })
})

// 新增
router.post('/v1/insert',(req,res)=>{
    var obj=req.body;
    pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
        if(err){
            throw err;
        }
        res.send('1');
    })
})
module.exports=router;