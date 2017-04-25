(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text, message_side) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            if (message_side === 'right') {
                $.ajax({
                    url: "https://api.a3rt.recruit-tech.co.jp/talk/v1/smalltalk",
                    type: "POST",
                    dataType: "json",
                    data: {
                        "apikey": "LGWC2sCr65fohOQzDKKjoODKR2BEMSH9",
                        "query": text
                    },
                    success: function(data) {
                        bot_message = new Message({
                            text: data.results[0].reply,
                            message_side: 'left'
                        });
                        bot_message.draw();
                                            $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                    },
                    error: function() {
                        alert("エラーが発生しました。リロードして下さい。");
                    }
                })
            }
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText(), 'right');
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText(), 'right');
            }
        });
        sendMessage('Hello! I\'m N :)', 'left');
    });
}.call(this));
