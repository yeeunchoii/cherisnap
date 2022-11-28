let smartPhones=['iphone','ipod','ipad','opera mini','opera mobi','nokia','android','webos','windows ce','blackberry','iemobile','sonyericssion'];


for(let i in smartPhones){
    if(navigator.userAgent.toLowerCase().match(new RegExp(smartPhones[i]))){
        document.location='http://yeeun0106.dothome.co.kr/mindex.html';
    }
}