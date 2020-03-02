<!-- ./App.svelte -->
<script>

    import Router from 'svelte-spa-router'

    import { user } from './Stores/User.js'
    import { gameStore } from './Stores/Game.js'
    import { push } from 'svelte-spa-router'

    import FrontMenu from './Pages/FrontMenu.svelte'
    import InitGame from './Pages/InitGame.svelte'
    import Lobby from './Pages/Lobby.svelte'
    import Settings from './Pages/Settings.svelte'
    import NotFound from './Pages/NotFound.svelte'

    import { connect, send } from './Services/Talker.js'

    // Routes
    const routes = {
        '/': FrontMenu,
        '/initgame': InitGame,
        '/lobby/:gameId': Lobby,
        '/settings': Settings,
        '*': NotFound
    };

    let processEvent = function(event) {
        console.log("Event from back-end", event);
        switch (event.name) {
            case 'enter-game':
                gameStore.update((game) => {
                    game.id = event.params.gameId;
                    return game;
                });
                push('/lobby/'+event.params.gameId);
                break;
            default:
                console.log("Unknown event", event);
        };
    };

    // Redirect to settings on load if our user is not configured
    user.subscribe(value => {
        if (!value.configured) {
            push('/settings');
        } else {
            connect(value, processEvent);
        }
    });

</script>

<Router {routes} />

