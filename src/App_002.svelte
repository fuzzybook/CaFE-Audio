<script>
	export let name;
	import AudioPlayer from './AudioPlayer.svelte';

</script>
<main>
	<h1>Hello {name}!</h1>
	<div>
	<AudioPlayer url="music/Lentement.mp3" title="Lentement" composer="Pippo" performer="Pippone"/>
	<AudioPlayer url="music/Bubble.mp3" title="Bubble" composer="Pippo" performer="Pippone"/>
	<AudioPlayer url="music/Hidden.mp3" title="Hidden" composer="Pippo" performer="Pippone"/>
	</div>
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>