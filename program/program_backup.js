var now_page="A1";

var hero_name="";

// var all_num=text_data[now_page]['text_data'].length;
var all_num;
var num=0;
var backnum=0;
var audio_file_path;
// var audio_file_path=text_data[now_page]['audio']['file_path'];
var music_file=null;
var result;

var save_data={};

//getElement
const character_name=document.getElementById('character_name');
const text_frame=document.getElementById('text_area');
const option_area=document.querySelector('#option_area');
const title_frame=document.querySelector('#title_frame');
//

//タイトル画面からの切り替え
function start(){
    setTimeout(() => {
    title_frame.classList.add('none');
      // next();
    }, 1000);
    
}

//次へボタン
function next(){

  if(text_animation){
    var phrase=text_data[now_page]['text_data'];
    all_num=phrase.length;
    var output_charname=phrase[num-1]['name'];
    var output_text=phrase[num-1]['text'];
    console.log(text_data);
        
    audio_start();

    event_check(output_charname,output_text);

    console.log(num);
    console.log(backnum);
  }else{
    var phrase=text_data[now_page]['text_data'];
    all_num=phrase.length;
    var output_charname=phrase[num]['name'];
    var output_text=phrase[num]['text'];
    var effect_check=phrase[num]['effect'];
    var character_array=phrase[num]['character_position'];
    console.log(text_data);
    // console.log(effect_check);
    if(effect_check["stop"]==false){
      event_check(output_charname,output_text);
    }
    effect_play(effect_check,output_charname,output_text);
    position_select(character_array);
    take_save(num);

    audio_start();
    
    backnum=num;
    num++;
    console.log(num);
    console.log(backnum);
  }


}

function back(){

  if(num>1){

    text_animation=true;
    num--;
    backnum--;
    console.log(num);
    console.log(backnum);
    var phrase=text_data[now_page]['text_data'];
    console.log(phrase);
    var output_charname=phrase[backnum]['name'];
    var output_text=phrase[backnum]['text'];
    var character_array=phrase[backnum]['character_position'];
    position_select(character_array);
    // console.log(num);
    take_save(backnum);
    console.log(output_text);
    replace_name(output_charname,output_text);
  // }



    // text_frame.innerHTML=output_text;
  }

}

function skip(){

  audio_start();

  num=all_num-2;
  backnum=num-1;
  next();
}

//イベントないかチェック
function event_check(char,event){

  switch (event) {
    case "name_event":
      name_event();
      
    break;

    case "":
      
      alert('終了です');
      num--;
      backnum--;
      option_area.classList.add('none');

    break;
    case "chose_event":
      
      option_area.classList.remove('none');
      //分岐の数
      var phrase=text_data[now_page]["next_page_option"];
      var option_total=phrase.length;
      option_area.setAttribute("branch_sum",option_total);
  
      //分岐の数リストを表示
      for(let i=0;i<option_total;i++){
        document.getElementsByClassName('option')[i].classList.remove('none');
        document.getElementsByClassName('option_text')[i].innerHTML=phrase[i]["text"];
        document.getElementsByClassName('option')[i].setAttribute("branch_value",phrase[i]["value"]);

      }
  

    break;

    case "go_to_next":

      now_page=text_data[now_page]["go_to_next"];
      console.log(now_page);
      num=0;
      backnum=0;
      // if(audio_file_path){
      //   music_file.pause();
      //   // audio_file_path=null;
      // }
      audio_file_path=text_data[now_page]['audio']['file_path'];

      next();

    break;
  
    default:
      //文章描画
      replace_name(char,event);
    break;
  }
}

function replace_name(char2,name){
  if(hero_name!=rand_name){
    // console.log(char2);
    // console.log(name);
    var result_name=char2.replace(rand_name, hero_name);
    // var result_name=null
    result = name.replace(rand_name, hero_name);
    // console.log(result);

    //「str」と「result」が同じ文字列になるまで繰り返す
    while(result !== name) {

      name =name.replace(rand_name, hero_name);
      result = result.replace(rand_name, hero_name);
      // console.log(name);
      // console.log(result);

    }

    console.log( result );

    character_name.innerHTML=result_name;
    if(text_animation){
      text_frame.innerHTML=result;
      clearInterval(intervalId);//タイマーをリセットする
      // intervalId=null;
      len=null;
      s=null;//変数sを空にする
      text_animation=null;
      n=1;
    }else{
      word(result);
    }
    
    
  }
}

var n;//文字を増やす処理の回数を数える変数nの宣言
n=1;//nの初期値を1とする
var intervalId;
var text_animation=null;
//↓関数の宣言↓
function word(result){
  text_animation=true;
  var s = result;//HTMLの入力欄に入力された文字を取得する変数sの宣言
  var len = s.length;//入力された文字の変数sの文字数をカウントする変数lenの宣言
  text_frame.innerHTML=s.slice(0,n);//HTMLのoutput_spaceというidの要素に、変数sの０文字目からn文字までのテキストを表示する
  // console.log(s.slice(0,n));
  // console.log(len);
  // console.log(n);
  // console.log(text_animation);

  if(n < len){//文字を増やす処理の回数が入力された文字数を超えるまで繰り返す
    n++;
    // console.log("settimer");
    startTimer();
  } else{//文字を増やす処理の回数が入力された文字数を超えた時の処理
    clearInterval(intervalId);//タイマーをリセットする
    // intervalId=null;
    len=null;
    s=null;//変数sを空にする
    text_animation=null;
    n=1;
    }
}

  //↓関数の宣言↓
  function startTimer(){
    intervalId=setTimeout(word,50,result);//2000ミリ秒(2.0秒)ごとにword()関数の処理を実行する
    // console.log(intervalId);
}

//名前入力のイベント
function name_event(){
  var user_name = window.prompt("自分の名前を入力してください", "アーロン");
  if(user_name){

    if(user_name=="ホシゾラヨゾラ"){
      hero_name=user_name;
      console.log(hero_name);
      now_page="A4";
      num=0;
      // backnum=0;
    }else{
      hero_name=user_name;
      console.log(hero_name);
      now_page="A2";
      num=0;
      // backnum=0;
    }


    
    // if(audio_file_path){
    //   music_file.pause();
    //   // audio_file_path=null;
    //   // audio_file=null;
    //   // console.log("pause");
    // }

    audio_file_path=text_data[now_page]['audio']['file_path'];
    setTimeout(() => {
      next();
      back();
    }, "100");

    num=0;
    // setTimeout(() => {
    //   back();
    // }, "100");

  }else{
    // hero_name="アーロン";
    num--;
    backnum--;
  }

}

//選択肢イベント
function branch(branch_text){
  console.log(branch_text);
  console.log(branch_text.getAttribute("branch_value"));

  //ここに選択データ保存書く

  option_area.classList.add('none');
  now_page=branch_text.getAttribute("branch_value");
  

  num=0;
  backnum=0;
  // if(audio_file_path){
  //   music_file.pause();
  //   // audio_file_path=null;
  // }
  audio_file_path=text_data[now_page]['audio']['file_path'];
  var sum=option_area.getAttribute("branch_sum");
  for(let i=0;i<sum;i++){
    document.getElementsByClassName('option')[i].classList.add('none');
    document.getElementsByClassName('option_text')[i].innerHTML="";
    document.getElementsByClassName('option')[i].setAttribute("branch_value","");
    // let a=branch(phrase[i]["value"]);

    //任意の要素にクリックイベントがつけられない
    // document.getElementsByClassName('option')[i].addEventListener('click', branch2 , false);
  }
  option_area.setAttribute("branch_sum","");
  next();
}

function audio_start(){
  if(num==0){
    if(audio_file_path){
      console.log(audio_file_path);
      if(music_file){
        music_file.pause();
      }
      music_file=new Audio(audio_file_path);
      music_file.play();
      music_file.addEventListener("ended", function () {
        music_file.currentTime = 0;
        music_file.play();
      }, false);
    }
  }

}
function audio_restart(){
  if(num!=0){
    if(audio_file_path){
      console.log(audio_file_path);
      if(music_file){
        music_file.pause();
      }
      music_file=new Audio(audio_file_path);
      music_file.play();
      music_file.addEventListener("ended", function () {
        music_file.currentTime = 0;
        music_file.play();
      }, false);
    }
  }

}

function take_save(num){
  save_data['now_page']=now_page;
  save_data['num']=num;
  save_data['hero_name']=hero_name;
  save_data['audio_file_path']=audio_file_path;
}