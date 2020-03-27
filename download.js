clickDownload() {

  const os = this.browser    

  let url_ios = 'wx43770423f476aa7f://com.sse.tech.ezt'

  const url_ios_download = 'https://itunes.apple.com/cn/app/e证通-科创板-网下ipo/id1455649142?l=zh&ls=1&mt=8'

  let url_android = 'ezt://sse.com.cn/Home/splash'

  const url_android_download = 'https://data.ssetech.com.cn/bmg/ezt/download/ezt_prd_ssetech_release_jiagu_sign.apk?t=' + Date.parse(new Date())       

  const path = os.mobile && (os.iPhone || os.iPad) ? url_ios : url_android

  const downloadUrl =  os.mobile && (os.iPhone || os.iPad) ? url_ios_download : url_android_download



  const loadDateTime = new Date()

  window.location = path // schema链接或univerasl link

  window.setTimeout(function(){

      const timeOutDateTime = new Date()

      if(timeOutDateTime - loadDateTime < 5000) {

          window.location = downloadUrl // 下载地址

      } else {

          window.close()

      }

  },3000)

}
