const exampleSocket = new WebSocket("ws://demos.kaazing.com/echo");

export let send = function(message) {
    exampleSocket.send(message);
};

exampleSocket.onmessage = function(message)
{
    console.log(message);
};
