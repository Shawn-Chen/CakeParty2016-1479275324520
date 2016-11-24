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


$(document).ready(function () {
  var $chat_blue = $('#q6 .label-blue'),
    $chat_red = $('#q6 .label-red'),
    $question = $('#q6 p.question'),
    $blue_percentage = $('#q6 .blue-percentage'),
    $red_percentage = $('#q6 .red-percentage'),
    $play_btn = $('#q6 .glyphicon-play-circle'),
    $micButtonBlue = $('#q6 .btn-blue'),
    $micButtonBlueFinish = $('#q6 .btn-blue-finish'),
    $micButtonRed = $('#q6 .btn-red'),
    $micButtonRedFinish = $('#q6 .btn-red-finish');

  // note: these tokens expire after an hour.
  var getSTTToken = $.ajax('/api/speech-to-text/token');
  var getTTSToken = $.ajax('/api/text-to-speech/token');

  function play() {
    getTTSToken.then(function(token) {
      WatsonSpeech.TextToSpeech.synthesize({
        text: $question.html(),
        token: token,
      });
    });
  }

  function record_blue() {
    getSTTToken.then(function(token) {
      $micButtonBlue.addClass('disabled');
      $micButtonBlueFinish.removeClass('disabled');
      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        continuous: true,
        outputElement: $chat_blue[0],
        clear: true,
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
      document.querySelector('#q6 .btn-blue-finish').onclick = function(){
        //console.log(stream);
        stream.stop();
        $micButtonBlueFinish.addClass('disabled');
        $micButtonBlue.removeClass('disabled');
        var len = $chat_blue.html().levenshtein($question.html());
        var strlength = Math.max($chat_blue.html().length, $question.html().length);
        $blue_percentage.html((((strlength - len)/strlength)*100).toFixed(5)+"%");
      };
    });
  }
  function record_red() {
    getSTTToken.then(function(token) {
      $micButtonRed.addClass('disabled');
      $micButtonRedFinish.removeClass('disabled');
      var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
        token: token,
        continuous: true,
        outputElement: $chat_red[0],
        clear: true,
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
      document.querySelector('#q6 .btn-red-finish').onclick = function(){
        //console.log(stream);
        stream.stop();
        $micButtonRedFinish.addClass('disabled');
        $micButtonRed.removeClass('disabled');
        var len = $chat_red.html().levenshtein($question.html());
        var strlength = Math.max($chat_blue.html().length, $question.html().length);
        $red_percentage.html((((strlength - len)/strlength)*100).toFixed(5)+"%");
      };
    });
  }
  $micButtonBlue.click(record_blue);
  $micButtonRed.click(record_red);
  $play_btn.click(play);

});
