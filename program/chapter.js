function change_chapter(){
  document.querySelector("#chapter_frame").classList.remove("none");
  create_chapter();
}

function create_chapter(){
  
  document.querySelector("#chapter_option").innerHTML="";

  for(let i=0;i<Object.keys(text_data).length;i++){
    let option_element=document.createElement("div");
    // option_element.innerHTML=Object.keys(text_data)[i];
    option_element.className="option";
    option_element.setAttribute('chapter_data',Object.keys(text_data)[i]);
    option_element.setAttribute('onclick','chapter_start(this)');
    document.querySelector("#chapter_option").appendChild(option_element);

    let option_element2=document.createElement("div");
    option_element2.innerHTML=Object.keys(text_data)[i];
    option_element.appendChild(option_element2);


  }  
}



function chapter_start(data){
  // console.log(data.getAttribute("chapter_data"));
  var chapter_data=data.getAttribute("chapter_data");
  now_page=chapter_data;
  num=0;
  switch (now_page) {
    case "A1":
      hero_name="????";      
    break;

    case "":
      hero_name="ホシゾラヨゾラ";      
    break;

    default:
      hero_name="アーロン";

    break;
  }
  // if(music_file){
  //   music_file.pause();
  // }
  text_animation=null;
  skip_text=false;
  audio_file_path=text_data[now_page]['audio']['file_path'];
  start();
  toziru();
  next();
}