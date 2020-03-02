import AppEvent from "./AppEvent.ts";
import { Game } from "./game.ts";
import UserEventEmitter from "./UserEventEmitter.ts";
import { WebSocket } from "https://deno.land/std/ws/mod.ts";
// import rand from "https://github.com/rsp/deno-rand"

// Because I'm a terrible person, I'm going to put all my f'ing state on here. Also my domain logic. And everything. All because it's half 3 and I've not got much work done
const games = {};
const connectionMap = {};
const playerMap = {};

function makeId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function emit(event: AppEvent, connection: WebSocket) {
    connection.send(JSON.stringify(event));
}

function emitToPlayers(game: Game, event: AppEvent)
{
    for (var x=0; x < game.players.length; x++) {
        emit(event, playerMap[game.players[x]].connection);
    }
}

function getPlayer(connection: WebSocket) {
    for (let id in connectionMap) {
        if (connectionMap.hasOwnProperty(id) && connectionMap[id] === connection) {
            return playerMap[id];
        }
    }
    return null;
}


export default function run(event: AppEvent)
{
    console.log("Trying to handle", event);
    let name = event.name;
    let params = event.params;

    let player = getPlayer(event.connection);
    if (player === null) {
        if (name === "identify") {
            let user = params['user'];
            let userId = user.id;
            connectionMap[userId] = event.connection;
            playerMap[userId] = user;
            playerMap[userId]['connection'] = event.connection;
            console.log(playerMap);
        }
        return;
    }

    let id;
    switch (name) {
        case "create":
            id = makeId(6);
            games[id] = new Game(id);
            // Send the original connection a "enter-game" event
            emit(new AppEvent('enter-game', {gameId: id}), event.connection)
            games[id].addPlayer(player.id);
            emitToPlayers(games[id], new AppEvent('user-entered-game', {gameId: id, playerId: player.id, playerName: player.name}))
            break;

        case "join":
            if (games[id] !== undefined) {
                let players = games[id].players;
                emit(new AppEvent('enter-game', {gameId: id, players: players}), event.connection);
                games[id].addPlayer(player.id);
                emitToPlayers(games[id], new AppEvent('user-entered-game', {gameId: id, playerId: player.id, playerName: player.name}))
            }
            break;

        case "answer":
            id = params['gameId'];
            if (games[id] !== undefined) {
                if (games[id].answerQuestion(player.id, params['questionId'], params['answer'])) {
                    emitToPlayers(games[id], new AppEvent('user-answered', {gameId: id, playerId: player.id, questionId: params['questionId']}));
                }
            }
            break;

        case "ready":
            id = params['gameId'];
            if (games[id] !== undefined) {
                games[id].setPlayerReadyState(player.id, params['ready'])

                if (games[id].allPlayersAreReady()) {
                    emitToPlayers(games[id], new AppEvent('start-game', {gameId: id, wait: 5000}));
                    setTimeout(function() {
                        emitToPlayers(games[id], new AppEvent('question', {gameId: id, question: 'Why is Andy such a strange man', answers: [
                            'Potato Salad', 'Brotkast', 'Banana Republic', 'Cheeese'
                        ]}));
                    }, 5000);
                }
            }
            break;

    }

    
}
