let socketConnection;

let subscribers = [];

export let connect = function(user, subscriber) {
    socketConnection = new WebSocket("ws://localhost:8090");
    subscribe(subscriber);

    socketConnection.onmessage = function(message)
    {
        try {
            const event = JSON.parse(message.data);

            // Fire off to subscribers
            subscribers.forEach((subscriber) => {
                subscriber(event);
            });
        } catch (e) {
            console.log("I got a bad message", message);
        }
    };


    return new Promise((resolve) => {
        socketConnection.onopen = function() {
            send('identify',{
                user: user
            });
        };
    });
};

export let send = function(name, params) {
    socketConnection.send(JSON.stringify({
        name: name,
        params: params
    }));
};

export let subscribe = function (subscriber) {
    subscribers.push(subscriber);
};
