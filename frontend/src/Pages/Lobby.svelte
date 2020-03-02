<script>
    export let params = {}
</script>

<h1>Lobby</h1>

<p>{ params.gameId }</p>

<ul>

    {#each game.player as player} 
        <li>{{player.name}}</li>
    {/each}
</ul>