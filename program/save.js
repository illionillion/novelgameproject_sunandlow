var save_file={"data1":{},"data2":{},"data3":{},"data4":{}};

// console.log(save_file);

var save_options_array=[

];

function create_save_frame(){
  // console.log('%c aaaaa','color:red;');
  var frame=document.getElementById("save_option");
  frame.innerHTML="";

  for(let i=1;i<=4;i++){
    
    // 選択肢の要素作る
    let save_option_element=document.createElement("div");
    save_option_element.className="option option_count";
    save_option_element.setAttribute("index","data"+i);
    save_option_element.setAttribute("text","データ"+i);
    // save_option_element.setAttribute("onclick","load(this)");
    frame.appendChild(save_option_element);
    // console.log(i);

    // テキスト書くところ
    let save_option_element2=document.createElement("div");
    save_option_element2.className="option_text";
    save_option_element.appendChild(save_option_element2);

    // 画像貼るところ
    let save_option_element3=document.createElement("div");
    save_option_element3.className="save_icon";
    save_option_element2.appendChild(save_option_element3);

    // 画像
    let save_option_element4=document.createElement("img");
    save_option_element4.src="img/none3.jpg";
    save_option_element4.alt="save_icon_image"+i;
    save_option_element3.appendChild(save_option_element4);

    // プロパティ
    let save_option_element5=document.createElement("div");
    save_option_element5.className="save_prop";
    save_option_element2.appendChild(save_option_element5);

    // セーブデータ名
    let save_option_element6=document.createElement("div");
    save_option_element6.className="data_title";
    save_option_element6.innerHTML="データ"+i;
    save_option_element5.appendChild(save_option_element6);

    // データ情報
    let save_option_element7=document.createElement("div");
    save_option_element7.className="data_prop";
    save_option_element5.appendChild(save_option_element7);

    // ページ
    let save_option_element9=document.createElement("div");
    save_option_element9.className="data_page";
    save_option_element9.innerHTML="なし";
    save_option_element7.appendChild(save_option_element9);

    // パーセント
    let save_option_element8=document.createElement("div");
    save_option_element8.className="percent";
    save_option_element8.innerHTML="クリア回数-";
    save_option_element7.appendChild(save_option_element8);

  }
}

function toziru(){
  document.querySelector("#save_screen").classList.add("none");
  document.querySelector("#chapter_frame").classList.add("none");

}

function change_save_screen(){
  document.querySelector("#save_screen").classList.remove("none");
  // document.querySelector("#save_screen").addEventListener();
  document.getElementById("saveorload").innerHTML="セーブするデータを選択してください。";
  document.getElementById("switching_btn").setAttribute('onclick', 'change_load_screen()');
  document.getElementById("switching_btn").value="ロード";
  for(let i=0;i<4;i++){
    // document.getElementsByClassName("option_count")[i].onclick=save(this);
    document.getElementsByClassName("option_count")[i].setAttribute('onclick', 'save(this)');
    // console.log(document.getElementsByClassName("option_count")[i]);
    // document.getElementsByClassName("option_count")[i].addEventListener("click",function(){save(this)},false);
  }
  show_save_prop();
}

function change_load_screen(){
  document.querySelector("#save_screen").classList.remove("none");
  // document.querySelector("#save_screen").addEventListener();
  document.getElementById("saveorload").innerHTML="ロードするデータを選択してください。";
  document.getElementById("switching_btn").setAttribute('onclick', 'change_save_screen()');
  document.getElementById("switching_btn").value="セーブ";
  for(let i=0;i<4;i++){
    document.getElementsByClassName("option_count")[i].setAttribute('onclick', 'load(this)');
  }
  show_save_prop();
}

function show_save_prop(){
  for(let i=0;i<Object.keys(save_file).length;i++){
    
    var data_page_text=save_file[Object.keys(save_file)[i]]["hero_name"]+"-"+save_file[Object.keys(save_file)[i]]["now_page"]+"-"+save_file[Object.keys(save_file)[i]]["num"];
    let image=save_file[Object.keys(save_file)[i]]["image"];
    console.log(image);


    if (save_file[Object.keys(save_file)[i]]["hero_name"]!=undefined) {
      document.getElementsByClassName("data_page")[i].innerHTML=save_file[Object.keys(save_file)[i]]["hero_name"];
    }
    if (save_file[Object.keys(save_file)[i]]["endroll_count"]!=undefined) {
      document.getElementsByClassName("percent")[i].innerHTML="クリア回数"+save_file[Object.keys(save_file)[i]]["endroll_count"];
    }

    if(image!=undefined){
      $('.save_icon img')[i].setAttribute("src",image);
    }
  }
}

function save(index){

  // console.log(save_data);
  var index_data=index.getAttribute("index");
  var index_text_data=index.getAttribute("text");
  // console.log(index_data);

  var flag=window.confirm(index_text_data+"にセーブしますか？");

  if(flag){
    var save_data2=new Object;
    //同じオブジェクトを代入できない
    for(let i=0;i<Object.keys(save_data).length;i++){
      save_data2[Object.keys(save_data)[i]]=save_data[Object.keys(save_data)[i]];
    }

    save_file[index_data]=save_data2;

    console.log(save_file);
    
    show_save_prop();
    alert("セーブしました");
  }

}


function load(index){
  // console.log(save_data);
  var index_data=index.getAttribute("index");
  var index_text_data=index.getAttribute("text");
  // console.log(index_data);

  var flag=window.confirm(index_text_data+"をロードしますか？");

  if(flag){

    if(save_file[index_data]["now_page"]){
        
      if(music_file){
        music_file.pause();
      }
      now_page=save_file[index_data]["now_page"];
      num=save_file[index_data]["num"];
      // backnum=num-1;
      hero_name=save_file[index_data]["hero_name"];
      audio_file_path=save_file[index_data]["audio_file_path"];
      chose_special_data=Object.assign({},save_file[index_data]["chose_special_data"]);
      endroll_count=save_file[index_data]["endroll_count"];
      console.log(text_animation);
      clearInterval(intervalId);//タイマーをリセットする
      text_animation=null;
      toziru();
      // music_file.pause();
      setTimeout(() => {
        if(num==0){
          next();
        }else{
          next();
          audio_restart();
        }

      }, "100");
    
    }else{
      alert('ロードできませんでした。');
    }
  }
}