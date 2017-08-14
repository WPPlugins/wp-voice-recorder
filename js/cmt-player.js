jQuery('.comment-content').click(function() {
	var comment_id = $(this).children('#cmt-id').val();
	var file_url = $(this).children('#cmt-file-url').val();
	jQuery("#jquery_jplayer_" + comment_id).jPlayer({
		ready: function () {
		  jQuery(this).jPlayer("setMedia", {
			wav: file_url
		  });
		},
		swfPath: wpvr_cmtvar.plugin_url+'/wpvr-recorder/js/',
		supplied: "wav",
		cssSelectorAncestor: "#jp_container_" + comment_id,
		wmode: "window"
	});
});