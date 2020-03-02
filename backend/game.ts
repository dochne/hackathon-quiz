export class Game {
    id: string;
    players: any;
    playersReady: any;
    questions: [];

    constructor(id: string)
    {
        this.id = id;
        this.playersReady = {};
    }

    addPlayer(playerId: string)
    {
        this.players.push(playerId);
        this.playersReady[playerId] = false;
    }

    setPlayerReadyState(playerId: string, ready: boolean)
    {
        this.playersReady[playerId] = ready;
    }

    allPlayersAreReady()
    {
        for (var x=0; x<this.players.length; x++) {
            if (!this.playersReady[this.players[x]].ready) {
                return false;
            }
        }

        return true;
    }
}