var $ = jQuery.noConflict();
$(document).ready(function(){
	if ( typeof wpvr_audio == 'undefined' && typeof wpvr_cmt_audio !='undefined'  ) {
		var host_url = wpvr_cmt_audio.ajaxurl + '/filename=comment_file' + wpvr_cmt_audio.comment_id + '?action=wpvr_upload_cmt_file';
		var plugin_url = wpvr_cmt_audio.plugins_url;
	}
	else {
		var host_url = wpvr_audio.ajaxurl + '/filename=recorded_file' + wpvr_audio.post_id + '?action=wpvr_upload_file';
		var plugin_url = wpvr_audio.plugins_url;
	}
  $.jRecorder(
     { 
        host: host_url,  
        callback_started_recording:     function(){callback_started(); },
        callback_stopped_recording:     function(){callback_stopped(); },
        callback_activityLevel:         function(level){callback_activityLevel(level); },
        callback_activityTime:     		function(time){callback_activityTime(time); },
        callback_finished_sending:      function(time){ callback_finished_sending(); },
        swf_path : plugin_url + '/wp-voice-recorder/js/jRecorder.swf',
     }
   );
   
	  $('#record').click(function() {
		 $.jRecorder.record(360000);
		 
	  })
	  
	  $('#stop').click(function() {
		$.jRecorder.stop();
		$.jRecorder.sendData();
		

	  })
	  
	  function callback_finished()
	  {
		  $('#status').html('Recording is finished');
	  }
	  
	  function callback_started()
	  {
		  $('#status').html('Recording is started');
	  }
	  
	  function callback_error(code)
	  {
		  $('#status').html('Error, code:' + code);
	  }
	  
	  
	  function callback_stopped()
	  {
		  $('#status').html('Stop request is accepted');
	  }

	  function callback_finished_recording()
	  {
		
			$('#status').html('Recording event is finished');
	  }
	  
	  function callback_finished_sending()
	  {
		  $('#status').html('Recording successfully saved!!'); 
	  }
	  
	  function callback_activityLevel(level)
	  {
		
		$('#level').html(level);
		
		if(level == -1)
		{
		  $('#levelbar').css("width",  "2px");
		}
		else
		{
		  $('#levelbar').css("width", (level * 2)+ "px");
		}
	  }
	  
	  function callback_activityTime(time)
	  {
	   
	   //jQuery('.flrecorder').css("width", "1px"); 
	   //jQuery('.flrecorder').css("height", "1px"); 
		$('#time').html(time);
		
	  }
});