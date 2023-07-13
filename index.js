const axios = require('axios');
const express = require("express");
const moment = require("moment");

let app = express();
let port = process.env.PORT || 80;

app.use(express.static("public_html"));

app.listen(port, function(){
    console.log("시작");
})

//http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=ibNDydv%2BVD1XxdnbSBCwRIZ4nfiYnptFv6FveU0wGfu4yRPisWSg%2F1gRJgdgRxOvOm6DlzNjTEJrjZkDyxNwbw%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10
//https://apis.data.go.kr/1360000/TourStnInfoService1/getCityTourClmIdx1?serviceKey=ibNDydv%2BVD1XxdnbSBCwRIZ4nfiYnptFv6FveU0wGfu4yRPisWSg%2F1gRJgdgRxOvOm6DlzNjTEJrjZkDyxNwbw%3D%3D& pageNo=1& numOfRows=10& dataType=XML& CURRENT_DATE=2018123110& DAY=3& CITY_AREA_ID=5013000000
app.get("/weather_list", (req, res)=>{
    let api = async() => {
        let response = null;
        try{
            response = await axios.get("https://apis.data.go.kr/1360000/TourStnInfoService1/getCityTourClmIdx1",{
                params:{
                    "serviceKey" : "ibNDydv%2BVD1XxdnbSBCwRIZ4nfiYnptFv6FveU0wGfu4yRPisWSg%2F1gRJgdgRxOvOm6DlzNjTEJrjZkDyxNwbw%3D%3D",
                    "pageNo":req.query.pageNo,
                    "numOfRows":req.query.numOfRows,
                    "dataType":req.query.dataType,
                    "CURRENT_DATE":req.query.CURRENT_DATE,
                    "DAY":req.query.DAY
                    
                },

                headers:{"Accept-Encoding":"application/json"},
            })
        }
            catch(e){
                console.log(e);
            }
            return response;
        }
        api().then((response)=>{
            res.setHeader("Access-Control-Allow-Origin","*")
            res.json(response.data.response.body);
        });
    
});