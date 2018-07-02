/**
 * Created by 海盗 on 2018/6/5.
 */

export default function loadScript (src){
    return new Promise((resolve, reject) => {
      var head= document.getElementsByTagName('head')[0];
      var script= document.createElement('script');
      script.type= 'text/javascript';
      script.src= src;
      head.appendChild(script);
      script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
          script.onload = script.onreadystatechange = null;
          resolve()
        }else{
          reject()
        }
      };

    });
  }
