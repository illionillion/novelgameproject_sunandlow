// //cookieから取り出す
// console.log(document.cookie);

// const test_cookies_set_arr={"A":"a","B":"b"};

// //cookieにセット
// document.cookie="test_cokkie="+JSON.stringify(test_cookies_set_arr);
// console.log(document.cookie);

// //エスケープしてセット
// document.cookie="test_cokkie="+encodeURIComponent(JSON.stringify(test_cookies_set_arr));
// console.log(document.cookie);

// //エスケープしたものを取り出す
// const test_cookies = document.cookie;
// const test_cookiesArray = test_cookies.split(';');//配列にする
// console.log(test_cookiesArray);

// for(let c of test_cookiesArray){
//     const test_cArray = c.trim().split('=');
//     if( test_cArray[0] === "test_cokkie"){ // 取り出したいkeyと合致したら
//         console.log(JSON.parse(decodeURIComponent(test_cArray[1])));  // 元の文字列 = エスケープ文字を正しく置き換えた文字列
//     }
// }

const cookie_key="SunAndLow_Cokkie";

function set_cookies(c_data) {
  document.cookie=cookie_key+"="+encodeURIComponent(JSON.stringify(c_data))+";max-age="+60*60*24*365;//一年間保存
  console.log(document.cookie);
  get_cookies();
}

function get_cookies() {
  //エスケープしたものを取り出す
  const get_cookies = document.cookie;
  const get_cookiesArray = get_cookies.trim().split(';');//配列にする
  // console.log(get_cookiesArray);

  for(let c of get_cookiesArray){
      const get_cArray = c.trim().split('=');
      // console.log(typeof get_cArray[0]);
      // console.log(typeof get_cArray[1]);
      // console.log(get_cArray[0]);
      // console.log(get_cArray[0]==cookie_key);
      // console.log(get_cArray[1]);
      // console.log(cookie_key.length);
      // console.log(get_cArray[0].length);

      let result_cookie=null;

      // console.log(JSON.parse(decodeURIComponent(get_cArray[1])));
      if( get_cArray[0] == cookie_key){ // 取り出したいkeyと合致したら
          // console.log(get_cArray[1]);
          console.log(JSON.parse(decodeURIComponent(get_cArray[1])));  // 元の文字列 = エスケープ文字を正しく置き換えた文字列
          result_cookie=JSON.parse(decodeURIComponent(get_cArray[1]))
      }

      return result_cookie;
  }
}

$(function(){
  // if(location.hostname != ""){
    if (get_cookies()) {
      save_file=Object.assign({},get_cookies());
    }
  // }

})