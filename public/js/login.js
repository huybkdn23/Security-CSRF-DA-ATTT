
(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/

  //redirect if token is exist
  getPage();
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit',function(){
      var check = true;

      for(var i=0; i<input.length; i++) {
          if(validate(input[i]) == false){
              showValidate(input[i]);
              check=false;
          }
      }

      return check;
  });


  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
          hideValidate(this);
      });
  });

  function validate (input) {
      if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
              return false;
          }
      }
      else {
          if($(input).val().trim() == ''){
              return false;
          }
      }
  }

  function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
  }

  function getCookie(cookie, name) {
    var nameEQ = name + "=";
    var ca = cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  function getPage() {
    $.ajax({
      type: 'post'
      ,url: '/api/auth'
      ,headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': $('#_csrf').val()
      }
      , data: JSON.stringify({
        token: getCookie(document.cookie, 'token')
      })
      , dataType: 'json'
      , cache: false
      , success: function(data){
        if (data && data.code === 'VALID_ACCOUNT') location.replace('/balances');
      }
      , error: function(error) {
        }
    });
  }

  $('#login-btn').on('click', function () {
    $.ajax({
      type: 'post'
      ,url: '/api/auth'
      ,headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': $('#_csrf').val()
      }
      , data: JSON.stringify({
        username: $('#username').val().trim(),
        password: $('#password').val()
      })
      , dataType: 'json'
      , cache: false
      , success: function(data){
          console.log('Login successfuly', data);
          localStorage.setItem('token', data.token);
          document.cookie = 'token=' + data.token + ';path=/';
          location.replace('/balances');
      }
      , error: function(error) {
          alert(error.responseJSON.message);
        }
    });
  })

})(jQuery);