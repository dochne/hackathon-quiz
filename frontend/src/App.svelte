<!-- ./App.svelte -->
<script>

    import Router from 'svelte-spa-router'

    import { user } from './Stores/User.js'
    import { push } from 'svelte-spa-router'

    import FrontMenu from './Pages/FrontMenu.svelte'
    import Game from './Pages/Game.svelte'
    import Settings from './Pages/Settings.svelte'
    import NotFound from './Pages/NotFound.svelte'

    import { send } from './Services/Talker.js'

    // Routes
    const routes = {
        '/': FrontMenu,
        '/game': Game,
        '/settings': Settings,
        '*': NotFound
    }

    // Redirect to settings on load if our user is not configured
    user.subscribe(value => {
        if (!value.configured) {
            push('/settings');
        } else {
            send("Help");
        }
    });

</script>

<Router {routes} />

