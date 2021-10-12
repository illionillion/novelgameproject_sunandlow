// 'use strict';
// console.log("text_data");

var password=[];
var abc=[];

var first="a",last="z";

for(let i=first.charCodeAt(0);i<=last.charCodeAt(0);i++){
  abc.push(String.fromCharCode(i));

  // console.log("i="+String.fromCharCode(i));
  // console.log("abc=["+abc+"]");
}

// console.log("アルファベット\n abc=["+abc+"]");
//ランダムな文字列、長さもランダム
for(let i=0;i<Math.random()* abc.length;i++){
  var key=Math.floor(Math.random()* abc.length);

  password.push(abc[key]);

  // console.log(abc[key]);
  // console.log(password);
}

password=password.join(',');
// console.log(password);

password=password.replace(/,/g,"");

let passPhrase ="0123456789ABCDEF0123456789ABCDEF";
// let passPhrase =password;
// 暗号化したい元のデータ
let data =password;
let utf8_plain = CryptoJS.enc.Utf8.parse(data);
// 暗号化
let encrypted = CryptoJS.AES.encrypt( utf8_plain, passPhrase );

var rand_name=encrypted;
// console.log(rand_name);

var text_data={};

function change_json_name(data){

  // let copy_data=Object.assign({},data);
  var len = Object.keys(data).length;
  // ulObj = $("#demo"),
  
  // console.log(data);
  // console.log(len);
  for(var i = 0; i < len; i++) {

  // console.log(Object.keys(data)[i]);
  let input_data=data[Object.keys(data)[i]]["text_data"];
  let len2=input_data.length;
  // console.log(input_data);
  // console.log(len2);

  for (let j=0;j<len2;j++){
    // console.log(input_data[j]);
    let replace_rand_name=input_data[j]["name"];
    let replace_rand_text=input_data[j]["text"];

    let replaced_rand_name=replace_rand_name.replace("rand_name",rand_name);
    let replaced_rand_text=replace_rand_text.replace("rand_name",rand_name);

    while(replace_rand_text!==replaced_rand_text){

      replace_rand_text=replace_rand_text.replace("rand_name",rand_name);
      replaced_rand_text=replace_rand_text.replace("rand_name",rand_name);

    }


    input_data[j]["name"]=replaced_rand_name;
    input_data[j]["text"]=replaced_rand_text;

    }
  }
  add_propaty(data);
  console.log(data);

  text_data=data;
  all_num=text_data[now_page]['text_data'].length;
  audio_file_path=text_data[now_page]['audio']['file_path'];

}

//jsonファイルから読み取る
$(function() {

  if(location.hostname != ""){//ローカルじゃない場合
     try {
        $.getJSON("json/text_data.json" , function(data) {
            change_json_name(data);
            // console.log(data);
        });       
     } catch (error) {
       console.error('f')
     }


  }else{
    change_json_name(substitute_text_data);
  }


});