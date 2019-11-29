var socket = io();

new Vue({
	el: "#chat",
	data: {
		message: "",
		messages: []
	},
	methods: {
		send: function(e) {
			if (!this.message) {
				return;
			}
			socket.emit('message.sent', this.message)
	        //this.messages.push(this.message);
			this.message = '';
		}
	},
	mounted: function () {
        socket.on('message', function (message) {
            this.messages.push(message);

        }.bind(this))
    }


});