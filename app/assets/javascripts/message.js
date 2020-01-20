$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =

     `<div class = "messagesall">
     <div class = "messages" id = ${messagee.id}>
     <div class = "namedata">
        <div class = "name">
         ${message.user_name}
         </div>
        <div class = "data">
         ${message.created_at}
         </div>
         </div>
        <div class = "messagebox">
         
          <p class =  "messagecontent">
          ${message.content}
          <img src=${message.image} >
    = image_tag message.image.url, class: 'messageimage' if message.image.present?
          </p>
          </div>
          </div>
          </div>`

      return html;
    } else {
      var html =
      
     ` <div class = "messagesall">
     <div class = "messages" id = ${messagee.id}>
     <div class = "namedata">
        <div class = "name">
         ${message.user_name}
         </div>
        <div class = "data">
         ${message.created_at}
         </div>
         </div>
        <div class = "messagebox">
         
          <p class =  "messagecontent">
          ${message.content}
          </p>

          </div>
          </div>
          </div>`

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
      $('.messagesall').append(html);      
      $('form')[0].reset();
      $('.messagesall').animate({ scrollTop: $('.messagesall')[0].scrollHeight});
      $(".sendbtn").prop('disabled', false);
  })
})

});