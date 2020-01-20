$(function(){

  
  

  function buildHTML(message){
    if ( message.image ) {
      var html =

     `
     <div class = "messagewrapper" id = ${message.id}>
     <div class = "namedata">
        <div class = "name">
         ${message.user.name}
         </div>
        <div class = "data">
         ${message.created_at}
         </div>
         </div>
        <div class = "messagecontents">
         
          <p class =  "messagecontent">
          ${message.content}
          <img src=${message.image} >
    = image_tag message.image.url, class: 'messageimage' if message.image.present?
          </p>
          </div>
          </div>
         `

      return html;
    } else {
      var html =
      
     ` 
     <div class = "messagewrapper" id = ${message.id}>
     <div class = "namedata">
        <div class = "name">
         ${message.user_name}
         </div>
        <div class = "data">
         ${message.created_at}
         </div>
         </div>
        <div class = "messagecontents">
         
          <p class =  "messagecontent">
          ${message.content}
          </p>

          </div>
          </div>
      `

      return html;
    };
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main').append(html);      
      $('form')[0].reset();
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      $(".sendbtn").prop('disabled', false);
  })
})

var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.messagewrapper:last').data("message-id");
  console.log(last_message_id)
  $.ajax({
    //ルーティングで設定した通りのURLを指定
    url: "api/messages",
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.main').append(insertHTML);
      $('.main').animate({ scrollTop: $('.main')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
    }
  })
  .fail(function() {
    console.log('error');
  });
};
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});
