
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
    $('#tbList tbody').empty();
  }

  function getItem(id) {
    console.log('@DBUG getItem', id);
    location.replace('/user?id=' + id);
  }

  function getPage() {
    setInitForm();
    $.ajax({
      type: 'get'
      ,url: '/api/users'
      ,headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': $('#_csrf').val()
      }
      , dataType: 'json'
      , cache: false
      , success: function(data){
        if (!data.length) return;
        $.each(data, function(index, item) {
          var html = [];
          html.push("<tr>"
          + "<td>" + item.username + "</td>"
          + "<td>" + item.balance + "</td>"
          // + "<td>" + "<button type='button' style='height:35px;width:60px'class='login100-form-btn' onclick=\"getItem('" + item.id + "');\">Detail</button>" + "</td>"
          + "<td>" + "<button type='button' style='height:35px;width:60px'class='login100-form-btn'><a style='color:#fff' href='/user?id=" + item.id +"'>Detail</a></button>" + "</td>"
          + "</tr>");
          $('#tbList tbody').append(html);
        })
      }
      , error: function(error) {
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

  $('#submit-btn').on('click', function () {
    console.log('@DEBUG submit', $('#_csrf').val().trim());
    $.ajax({
      type: 'get'
      , url: '/api/transferring?account_id=' + $('#account_id').val() + '&balance=' + Number($('#balance').val())
      + '&_csrf=' + $('#_csrf').val().trim()
      , headers: {
          'Content-Type': 'application/json',
          'CSRF-Token': $('#_csrf').val().trim()
      }
      , dataType: 'json'
      , cache: false
      , success: function(data){
        getPage();
      }
      , error: function(error) {
        }
    });
  });

})(jQuery);