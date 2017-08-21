odoo.define('website_portal_request.discussion', function (require) {
'use strict';

var ajax = require('web.ajax');
var web_editor_base = require('web_editor.base')
var mail_thread =require('website_mail.thread');


// Extend mail thread widget
var RequestMailThread = mail_thread.WebsiteMailThread.extend({

    // this is only one place found to inject code that cleanups
    // summernote editor
    prepend_message: function(message_data){
        this.$el.find('form').find('.note-editable').html('');
        return this._super(message_data);
    }
});

// Add summernote editor to website request chatter
$('#discussion .o_website_chatter_form textarea[name="message"]').each(function () {
    var $textarea = $(this);
    if (!$textarea.val().match(/\S/)) {
        $textarea.val("<p><br/></p>");
    }
    var $form = $textarea.closest('form');
    var toolbar = [
            ['style', ['style']],
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['history', ['undo', 'redo']],
            ['insert', ['picture']],
            ['misc', ['help']]
        ];
    $textarea.summernote({
            height: 100,
            toolbar: toolbar,
            styleWithSpan: false,
            onImageUpload: function(images) {
                $.each(images, function(index, image) {
                    ajax.post('/website_portal_request/image_upload', {
                        'upload': image
                        //'mime_type': image.type,
                    }).done(function (data) {
                        data = JSON.parse(data)
                        if (data['status'] == 'OK') {
                            var image = $('<img>').attr('src', data['attachment_url']);
                            $textarea.summernote('insertNode', image[0]);
                        } else {
                            alert ("Smthing gone wrong during image upload\n" + data['message']);
                        }
                    });
                });
            }
    });

    $form.on('click', 'button, .a-submit', function () {
        $textarea.val($form.find('.note-editable').code());
    });
});

web_editor_base.ready().then(function(){
    if($('.o_website_portal_request_mail_thread').length) {
        var mail_thread = new RequestMailThread($('body')).setElement($('.o_website_portal_request_mail_thread'));
    }
});



});