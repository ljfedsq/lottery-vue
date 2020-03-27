// node --inspect-brk data.js
// chrome://inspect/#devices
const https = require("http");
// const cheerio = require("cheerio");
const fs = require("fs");

class crawlData {
  constructor (page) {
    this.currentPage = 1;
    this.page = page;
    this.dataArr = [];
    this.baseUrl= "http://m.zhcw.com/clienth5.do?lottery=FC_SSQ&pageSize=300&transactionType=300301&src=0000100001%7C6000003060&pageNo=";
    this.init();
  }
  init () {
    let _self = this;
    let time = setInterval(() => {
      if(_self.currentPage >  _self.page ){
        clearInterval(time);
      }else {
        console.log('第' + _self.currentPage + '个爬虫请求发出');
        _self.getDataPackage(_self.baseUrl + _self.currentPage, _self.currentPage);
        _self.currentPage ++ ;
      }
    }, 1000 * 5);
  }
  getDataPackage(url, curPage) {
    let _self = this;  
    https.get(url,function(res){
      let chunks =[],size = 0;
       res.on("data", function(chunk) {
         chunks.push(chunk);
         size += chunk.length;
       })
       res.on("end", function() {
        console.log("数据包传输完毕！");
        let data = Buffer.concat(chunks, size);
        let result =JSON.parse(data.toString());
        _self.page = result.totalPage;
        _self.dataArr = _self.dataArr.concat(result.dataList);
        if(_self.page == curPage) {
          fs.writeFile("./cache/data.json",JSON.stringify(_self.dataArr),function(err){
            if(err) throw err;
            console.log("写入成功！");
          })
        }
      })
    })
  }
}
new crawlData(1);