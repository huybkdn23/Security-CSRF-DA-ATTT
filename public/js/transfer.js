
(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/

  var input = $('.validate-input .input100');
  getPage();

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

  function setInitForm() {
    $('#account_id').val('');
    $('#balance').val('');
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
    setInitForm();
    $.ajax({
      type: 'post'
      ,url: '/api/auth'
      ,headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': $('#_csrf').val()
      }
      , data: JSON.stringify({
        token: getCookie(document.cookie, 'token')
        ,_csrf: $('#_csrf').val()
      })
      , dataType: 'json'
      , cache: false
      , success: function(data){
        if (data && data.code === 'UNAUTHORIZED') {
          localStorage.removeItem('token');
          location.replace('/');
          return false;
        }
        $('#username').text(data.user.username);
        $('#current_balance').val(data.user.balance);
        $('#user_id').val(data.user.id);
      }
      , error: function(error) {
        console.log('@ERROR', error);
      }
    });
  }

  $('#balance').on('keyup', function() {
    $(this).val($(this).val().replace(/^[^1-9-]|([^0-9])*/g, ''));
  });

  $('#logout-btn').on('click', function () {
    localStorage.removeItem('token');
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    location.replace('/');
  });

  // $('#submit-btn').on('click', function () {
  //   console.log('@DEBUG submit', $('#_csrf').val().trim());
  //   $.ajax({
  //     type: 'get'
  //     , url: '/api/transferring?account_id=' + $('#account_id').val() + '&balance=' + Number($('#balance').val())
  //     + '&_csrf=' + $('#_csrf').val().trim()
  //     , headers: {
  //         'Content-Type': 'application/json',
  //         'CSRF-Token': $('#_csrf').val().trim()
  //     }
  //     , dataType: 'json'
  //     , cache: false
  //     , success: function(data){
  //       getPage();
  //     }
  //     , error: function(error) {
  //       }
  //   });
  // });

})(jQuery);