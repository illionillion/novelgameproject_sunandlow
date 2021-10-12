const local_storage_key="Sun_And_Low";

function set_ls(data) {
  if (window.localStorage) {
  
    localStorage.setItem(local_storage_key, JSON.stringify(data));
    console.log(JSON.parse(localStorage.getItem(local_storage_key)));
    
  }else{
    alert("ブラウザが対応していないためセーブデータはページを再読み込みするかページから離れると消えてしまいます。\n別ブラウザでお試しください。");
  }
}

function get_ls() {
  if (window.localStorage) {
  
    return JSON.parse(localStorage.getItem(local_storage_key));

  }
}

$(function(){
  // if(location.hostname == ""){
    if (get_ls()) {
      save_file=Object.assign({},get_ls());
    }
  // }
})