/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global $:true */


// conversation variables
var conversation_id, client_id;

$(document).ready(function () {
  var $chat_blue = $('#label-blue'),
    $jsonPanel = $('#json-panel .base--textarea'),
    $information = $('.data--information'),
    $profile = $('.data--profile'),
    $loading = $('.loader'),
    $micButtonBlue = $('#btn-blue'),
    $micButtonBlueFinish = $('#btn-blue-finish');

  // note: these tokens expire after an hour.
  var getSTTToken = $.ajax('/api/speech-to-text/token');
  var getTTSToken = $.ajax('/api/text-to-speech/token');

  function record() {
    getSTTToken.then(function(token) {
      $micButtonBlue.addClass('disabled');
      $micButtonBlueFinish.removeClass('disabled');
      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        continuous: true,
        outputElement: $chat_blue[0],
        claer: true,
        'X-WDC-PL-OPT-OUT': 1,
        max_alternatives: 1,
        keepMicrophone: navigator.userAgent.indexOf('Firefox') > 0
      });
      stream.on('data', function(data) {
        //console.log(data);
      });
      stream.on('error', function(err) {
        console.log(err);
      });
      document.querySelector('#btn-blue-finish').onclick = function(){
        //console.log(stream);
        stream.stop();
        $micButtonBlueFinish.addClass('disabled');
        $micButtonBlue.removeClass('disabled');
      };
    });
  }
  function evaluate() {

  }
  $micButtonBlue.click(record);
  //$micButtonBlueFinish.click(evaluate);
  //$micButton.toggle(record,deactivateMicButton,false);

  var converse = function(userText) {

  };
/*
  var getProfile = function() {
    var params = {
      conversation_id: conversation_id,
      client_id: client_id
    };

    $.post('/profile', params).done(function(data) {
      $profile.empty();
      data.name_values.forEach(function(par) {
        if (par.value !== '')
          addProperty($profile, par.name + ':', par.value);
      });
    }).fail(function(error){
      talk('WATSON', error.responseJSON ? error.responseJSON.error : error.statusText);
    });
  };

  var talk = function(origin, text) {
    var $chatBox = $('.chat-box--item_' + origin).first().clone();
    var $loading = $('.loader');
    $chatBox.find('p').html($('<p/>').html(text).text());
    // $('.chat-box--pane').append($chatBox);
    $chatBox.insertBefore($loading);
    setTimeout(function() {
      $chatBox.removeClass('chat-box--item_HIDDEN');
    }, 100);
  };

  var addProperty = function($parent, name, value) {
    var $property = $('.data--variable').last().clone();
    $property.find('.data--variable-title').text(name);
    $property.find('.data--variable-value').text(value);
    $property.appendTo($parent);
    setTimeout(function() {
      $property.removeClass('hidden');
    }, 100);
  };

  var submitMessage = function(text) {
    talk('YOU', text);
    scrollChatToBottom();
    clearInput();
  };
*/
  var clearInput = function() {
    $('.chat-window--message-input').val('');
  };

  $('.tab-panels--tab').click(function(e){
    e.preventDefault();
    var self = $(this);
    var inputGroup = self.closest('.tab-panels');
    var idName = null;

    inputGroup.find('.active').removeClass('active');
    self.addClass('active');
    idName = self.attr('href');
    $(idName).addClass('active');
  });

  // Initialize the conversation
  //converse();

});
