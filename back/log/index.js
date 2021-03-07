function serverLog(call){
    if(typeof call !== "function"){
        console.log("");
        console.log("========================");
        console.log(call);
        console.log("========================");
        console.log("");
    } else{
        console.log("");
        console.log("========================");
        call();
        console.log("========================");
        console.log("");
    }

}

module.exports = serverLog;