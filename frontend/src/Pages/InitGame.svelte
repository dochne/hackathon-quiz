<script>
    import Button from '../Components/Button.svelte'
    import { push } from 'svelte-spa-router'
    import { send } from '../Services/Talker.js'

    let initGame = function() {
        send(
            'create',
            {}
        );
    };

</script>

<style>
    div {
        display: block;
    }
</style>

<div>
    <Button label="Join game" action={() => push("/game")} />
    <Button label="Start a new game" action={ initGame } />
</div>
