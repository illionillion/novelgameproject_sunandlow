var now_page="A1";

var hero_name="????";

var all_num;
var num=0;
var backnum=0;
var audio_file_path;
var music_file=null;
var result;

var save_data={};
let chose_special_data={"図書館":"C1C","都市":"C1D","学園":"C1E","騎士団":"C1F"};//1回選ばれたものは消す

var back_text_animation=false;
let skip_text=false;

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
    text_animation=null;

    console.log(num);
    console.log(backnum);
  }else{
    var phrase=text_data[now_page]['text_data'];
    all_num=phrase.length;
    var output_charname=phrase[num]['name'];
    var output_text=phrase[num]['text'];
    var effect_check=phrase[num]['effect'];
    var character_array=phrase[num]['character_position'];
    var background_image=phrase[num]['background_image'];
    console.log(text_data);
    // console.log(effect_check);
    if(effect_check["stop"]==false){
      event_check(output_charname,output_text);
    }
    position_select(character_array);
    background_change(background_image);
    effect_play(effect_check,output_charname,output_text);

    take_save(num);

    audio_start();
    
    backnum=num;
    num++;
    console.log(num);
    console.log(backnum);
  }


}

//戻るボタン
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
    var background_image=phrase[backnum]['background_image'];
    position_select(character_array);
    background_change(background_image);
    // console.log(num);
    take_save(backnum);
    console.log(output_text);
    replace_name(output_charname,output_text);
  // }



    // text_frame.innerHTML=output_text;
  }

}

//スキップボタン
function skip(){
  if(!skip_text){
    audio_start();
    clearInterval(intervalId);//タイマーをリセットする
    text_animation=null;
    n=1;
    console.log("skip");
    // num=all_num-1;
    num=all_num-2;
    backnum=num-1;
    next();
    skip_text=true;
  }

}

//イベントないかチェック
function event_check(char,event){

  switch (event) {
    case "name_event":
      name_event();
      skip_text=false;
      
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
      skip_text=false;
  
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
      // if(music_file){
      //   music_file.pause();
      //   // audio_file_path=null;
      // }
      audio_file_path=text_data[now_page]['audio']['file_path'];
      text_animation=false;
      skip_text=false;

      next();
      var phrase=text_data[now_page]['text_data'];
      console.log(phrase);
      console.log(phrase[num-1]['effect']['stop']);
      if(phrase[num-1]['effect']['stop']){
        back_text_animation=true;
        setTimeout(() => {
          back();
        }, "1000");
      }



    break;

    case "endroll":
      endroll_go();
    break;

    case "not_endroll":
      not_endroll();
    break;

    case 'chose_special':
      option_area.classList.remove('none');
      //分岐の数
      // var phrase=text_data[now_page]["next_page_option"];
      var option_total=Object.keys(chose_special_data).length;
      option_area.setAttribute("branch_sum",option_total);
      option_area.setAttribute("chose_special",true);
      skip_text=false;

      if(option_total===0){
        chose_special_data['都市(解放)']='C3D';
        option_total=Object.keys(chose_special_data).length;
        option_area.setAttribute("branch_sum",option_total);
      }
  
      //分岐の数リストを表示
      for(let i=0;i<option_total;i++){

        document.getElementsByClassName('option')[i].classList.remove('none');
        document.getElementsByClassName('option_text')[i].innerHTML=Object.keys(chose_special_data)[i];
        document.getElementsByClassName('option')[i].setAttribute("branch_value",chose_special_data[Object.keys(chose_special_data)[i]]);

      }

    break;

    default:
      //文章描画
      replace_name(char,event);
    break;
  }
}

//主人公の名前置き換え
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
      text_animation=false;
      skip_text=false;

      if(back_text_animation){
        back_text_animation=false;
        word(result);
      }
      
      n=1;
    }else{
      word(result);
    }
    
    
  }
}

//一文字ずつ表示させるアニメーション
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

    if(user_name==="ホシゾラヨゾラ"){
      hero_name=user_name;
      console.log(hero_name);
      now_page="A4";
      num=0;
    }else{
      hero_name=user_name;
      console.log(hero_name);
      now_page="A2";
      num=0;
    }
    
    // if(music_file){
    //   music_file.pause();
    // }

    audio_file_path=text_data[now_page]['audio']['file_path'];
    setTimeout(() => {
      next();
      text_animation=true;
      back();
    }, "100");

    num=0;

  }else{

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
    delete chose_special_data[branch_text.innerText];
    console.log(chose_special_data[branch_text.innerText]);
  if(option_area.getAttribute("chose_special")=="true"){
    console.log('delete');
    delete chose_special_data[branch_text.innerText];
  }
  

  num=0;
  backnum=0;
  // if(music_file){
    
  //   music_file.pause();

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

//音声再生
function audio_start(){
  if(num==0){
    if(location.protocol+"//"+location.host+location.pathname+audio_file_path==music_file.src){
      console.log(music_file);
      // return;
    }else{
      if(audio_file_path){
        console.log(location.protocol+"//"+location.host+location.pathname+audio_file_path);
        // console.log(music_file);
        // console.log(music_file.src);
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
    if(!audio_file_path && music_file){
      music_file.pause();
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
  save_data['chose_special_data']=Object.assign({},chose_special_data);

  let image=$('#background_frame').css('background-image');
  console.log(image);
  image=image.replace( "url(\"" , "" )
  image=image.replace( "\")" , "" )

  save_data['image']=image;

  save_data["endroll_count"]=endroll_count;
}