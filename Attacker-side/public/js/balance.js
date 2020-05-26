
(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/

  var input = $('.validate-input .input100');
  // getPage();

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
    console.log('@DEBUG balance getPage()');
    $.ajax({
      type: 'post'
      ,url: '192.168.239.10:8000/api/auth'
      ,headers: {
          'Content-Type': 'application/json'
      }
      , data: JSON.stringify({
        token: localStorage.getItem('token')
      })
      , dataType: 'json'
      , cache: false
      , success: function(data){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        if (data && data.code === 'UNAUTHORIZED') {
          localStorage.removeItem('token');
          location.replace('/');
          return false;
        }
        console.log('@DEBUG getPage success', data.user);
        $('#username').text(data.user.username);
        $('#current_balance').val(data.user.balance);
        $('#user_id').val(data.user.id);
      }
      , error: function(error) {
        }
    });
  }

  $('#balance').on('keyup', function() {
    console.log('@DEBUG keyup', $(this).val());
    // $(this).val($(this).val().replace(/[^1-9-][^0-9-]*|(?!^)-/g, ''));

    $(this).val($(this).val().replace(/^[^1-9\-]|([^0-9])*/g, ''));
  });

  $('#logout-btn').on('click', function () {
    localStorage.removeItem('token');
    location.replace('/');
  });

  $('#submit-btn').on('click', function () {
    console.log('@DEBUG btn submit');
    $.ajax({
      type: 'put'
      , url: 'http://192.168.239.10:8000/api/users/' + $('#user_id').val().trim()
      , headers: {
          'Content-Type': 'application/json'
      }
      , data: JSON.stringify({
        balance: Number($('#balance').val())
      })
      , dataType: 'json'
      , cache: false
      , success: function(data){
      }
      , error: function(xhr, status, message) {
        console.log('@ERROR', message);
        alert(`@ERROR ${message}`);
        }
    });
  });

})(jQuery);