//后端代码
//index.js
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");


const app = express();
const port = 8080;
//忽略favicon.ico 请求
app.get('/favicon.ico', (req, res) => {
    res.status(204).send();
});
//允许跨域
app.use(require("cors")());
//处理天气请求
app.get("/api/weather", async (req, res) => {
    try {
        const {location} = req.query;
        const ts = Math.floor((new Date()).getTime() / 1000);
        const uid = process.env.SENIVERSE_UID;//公钥
        const key = process.env.SENIVERSE_KEY;//私钥
        //生成签名
        var str = "ts=" + ts + "&uid=" + uid; // 参数字符串

        const result = CryptoJS.HmacSHA1(str, key);
        const sig = result.toString(CryptoJS.enc.Base64);
        str = str + "&sig=" + sig; // 最终构造的已加密的参数字符串
        //调用心知天气API

        const API = "http://api.seniverse.com/v3/weather/now.json"; // 获取天气实况

        const url = `${API}?location=${encodeURIComponent(location)}&${str}`;
        const response = await axios.get(url);
        res.json(response.data);
        console.log('时间戳:', ts);
        console.log('签名前的字符串:', str);
        console.log('签名:', sig);
        console.log('请求 URL:', url);
    } catch (error) {
        if (error.response) {
            // 心知天气 API 返回错误响应
            console.error('心知天气 API 返回错误:', error.response.data);
            res.status(error.response.status).json({ error: "获取天气数据失败，API 返回错误" });
        } else if (error.request) {
            // 请求已发送，但没有收到响应
            console.error('请求已发送，但没有收到响应:', error.request);
            res.status(500).json({ error: "获取天气数据失败，没有收到 API 响应" });
        } else {
            // 其他错误
            console.error('请求心知天气 API 时的错误:', error.message);
            res.status(500).json({ error: "获取天气数据失败" });
        }
    }
});
app.listen(port, () => {
    console.log(`后端运行在http://localhost:${port}`);
})
