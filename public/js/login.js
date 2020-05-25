
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

  function getPage() {
    console.log('@DEBUG login getPage()');
    $.ajax({
      type: 'post'
      ,url: '/api/auth'
      ,headers: {
          'Content-Type': 'application/json'
      }
      , data: JSON.stringify({
        token: localStorage.getItem('token')
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
    console.log("@DEBUG login btn", $('#username').val(), $('#password').val());
    $.ajax({
      type: 'post'
      ,url: '/api/auth'
      ,headers: {
          'Content-Type': 'application/json'
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
        location.replace('/balances');
      }
      , error: function(error) {
          console.log('@DEBUG response login', error);
          alert(error.responseJSON.message);
        }
    });
  })

})(jQuery);