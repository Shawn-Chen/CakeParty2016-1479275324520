/**
 * Module dependencies.
 */

'use strict';

require('dotenv').config({silent: true});

var express  = require('express'),
  app        = express(),
  fs         = require('fs'),
  path       = require('path'),
  bluemix    = require('./config/bluemix'),
  extend     = require('util')._extend,
  watson     = require('watson-developer-cloud');

// all environments
app.use('/api/speech-to-text/', require('./stt-token.js'));
app.use('/api/text-to-speech/', require('./tts-token.js'));



var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);

