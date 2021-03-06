/*
 * jRecorder Plugin for jQuery JavaScript Library (Alpha)
 * http://www.sajithmr.me/jrecorder
 *
 * Copyright (c) 2011 - 2013 Sajithmr.ME
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Sajith Amma
 * Version: 1.1
 * Date: 14 December 2011

Version changes

Added preview option right after recording.
Added seperate function sendData to trigger to send data to server (it won't send automcatically to server)


 */

/* Code is not verified using http://www.jshint.com/ */

var $ = jQuery.noConflict(); 
$(document).ready(function (){	
	var methods = {
    	play : function( options ) { 
					
					alert(options);
				
	 			},
    	pause : function( ) { }
    
  	};

	var jRecorderSettings = {} ;
	$.jRecorder = function( options, element ) {
		// allow instantiation without initializing for simple inheritance
				
		if(typeof(options) == "string")
		{
			if ( methods[options] ) 
			{
				return methods[ options ].apply( this, Array.prototype.slice.call( arguments, 1 ));
				
			}
			return false;
		}
		
		//if the element to be appended is not defind, append to body
		if(element == undefined)
		{
			element = $("body");
		}
			if ( typeof wpvr_variables == 'undefined' && typeof wpvr_cmt_variables !='undefined'  ) {
				var plugins_url = wpvr_cmt_variables.plugins_url;
				var host_url = wpvr_cmt_variables.ajaxurl + '/filename=comment_file' + wpvr_cmt_variables.comment_id + '?action=wpvr_upload_cmt_file';
			}
			else {
				var plugins_url = wpvr_variables.plugins_url;
				var host_url = wpvr_variables.ajaxurl + '/filename=recorded_file' + wpvr_variables.post_id + '?action=wpvr_upload_file';
			}
		//default settings
						var settings = {
						'rec_width': '300',
						'rec_height': '200',
						'rec_top': '45%',
						'rec_left': '0px',
						'recorderlayout_id' : 'flashrecarea',
						'recorder_id' : 'record',
						'recorder_name': 'record',
						'wmode' : 'transparent',
						'bgcolor': '#ff0000',
						'swf_path': plugins_url + '/wp-voice-recorder/js/jRecorder.swf',
						'host' :  host_url,
						'callback_started_recording' : function(){},
						'callback_finished_recording' : function(){},
						'callback_stopped_recording': function(){},
						'callback_error_recording' : function(){},
						'callback_activityTime': function(time){},
						'callback_activityLevel' : function(level){}
						};
	
						//if option array is passed, merget the values
						if ( options ) { 
					        $.extend( settings, options );
					     }
						jRecorderSettings = settings;
							if(typeof $.browser != 'undefined' &&  $.browser.msie && Number($.browser.version) <= 8) {
							var objStr = '<object  name="'+ settings['recorder_name'] +'" id="' + settings['recorder_id'] + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+ settings['rec_width'] +'" height="'+ settings['rec_height']+'"></object>';

							var paramStr = [
								'<param name="movie" value="'+ settings['swf_path'] + '?host=' + settings['host'] +  '" />',
								
								'<param name="allowScriptAccess" value="always" />',
								'<param name="bgcolor" value="' + settings['bgcolor'] + '" />',
								'<param name="wmode" value="' +  settings['wmode'] + '" />'
							];

							htmlObj = document.createElement(objStr);
							for(var i=0; i < paramStr.length; i++) {
								htmlObj.appendChild(document.createElement(paramStr[i]));
							}
							
							
							//var divStr = ' <div id="'+ settings['recorderlayout_id'] +'" style="position:absolute;top:0px;left:0px;z-index:-1" ></div>';
							//var divObj = document.createElement(divStr);
							
							
						} else {
							var createParam = function(el, n, v) {
								var p = document.createElement("param");
								p.setAttribute("name", n);	
								p.setAttribute("value", v);
								el.appendChild(p);
							};

							htmlObj = document.createElement("object");
							htmlObj.setAttribute("id", settings['recorder_id'] );
							htmlObj.setAttribute("name", settings['recorder_name'] );
							htmlObj.setAttribute("data",  settings['swf_path'] + '?host=' + settings['host'] );
							htmlObj.setAttribute("type", "application/x-shockwave-flash");
							htmlObj.setAttribute("width", settings['rec_width']); // Non-zero
							htmlObj.setAttribute("height", settings['rec_height']); // Non-zero
							createParam(htmlObj, "allowscriptaccess", "always");
							createParam(htmlObj, "bgcolor", settings['bgcolor']);
							createParam(htmlObj, "wmode", settings['wmode'] );
						}

						var divObj = document.createElement("div");
						divObj.setAttribute("id", settings['recorderlayout_id']);
						divObj.setAttribute("style", "position:fixed;top:"+ settings['rec_top'] +";right:"+ settings['rec_left'] +";z-index:-1");
						
						divObj.appendChild(htmlObj);
						element.append(divObj);
	};
	
	//function call to start a recording
	$.jRecorder.record = function(max_time){
								//change z-index to make it top
								$(  '#' + jRecorderSettings['recorderlayout_id'] ).css('z-index', 10000);
								var recorder = getFlashMovie(jRecorderSettings['recorder_name']);
								
								getFlashMovie(jRecorderSettings['recorder_name']).jStartRecording(max_time);
								
						} 

	//function call to stop recording and save the recording simontaneously				
	$.jRecorder.stop = function(){
		getFlashMovie(jRecorderSettings['recorder_name']).jStopRecording();
	//	getFlashMovie(jRecorderSettings['recorder_name']).jSendFileToServer();
	} 
		
	//function call to send wav data to server url from the init configuration					
	$.jRecorder.sendData = function(){
		var recorded = getFlashMovie(jRecorderSettings['recorder_name']);
		console.log( recorded );
		recorded.jSendFileToServer();	
	} 

	$.jRecorder.callback_started_recording = function(){
		jRecorderSettings['callback_started_recording']();	
	}
	
	$.jRecorder.callback_finished_recording  = function(){	
		jRecorderSettings['callback_finished_recording']();
	}
	
	$.jRecorder.callback_error_recording = function(){		
		jRecorderSettings['callback_error_recording']();		
	}
	
	$.jRecorder.callback_stopped_recording = function(){
		
		jRecorderSettings['callback_stopped_recording']();
	}

	$.jRecorder.callback_finished_sending = function(){
		jRecorderSettings['callback_finished_sending']();
	}
	
	$.jRecorder.callback_activityLevel = function(level){
		
		jRecorderSettings['callback_activityLevel'](level);	
		
	}
	
	$.jRecorder.callback_activityTime = function(time){
		//put back flash while recording
		$(  '#' + jRecorderSettings['recorderlayout_id'] ).css('z-index', -1);
		jRecorderSettings['callback_activityTime'](time);	
	}
			
	//function to return flash object from name
	function getFlashMovie(movieName) {
       var isIE = navigator.appName.indexOf("Microsoft") != -1;
       return (isIE) ? window[movieName] : document[movieName];
     }	
	 
});



