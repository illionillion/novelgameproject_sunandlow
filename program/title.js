$('#view_start').click(function(){
  $('#view_start').addClass('none');
  $('#title_btn_box').removeClass('none');
  $('#user_frame').removeClass('none');
  const title_music="audio/Datura_inst.m4a";
  music_file=new Audio(title_music);
  music_file.play();
  music_file.loop=true;
})