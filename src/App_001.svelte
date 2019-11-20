<script>
	export let name;
</script>
<main>
	<h1>Hello {name}!</h1>
	<div>
	<audio controls>
  		<source src="music/Lentement.mp3" type="audio/mpeg">
		Your browser does not support the audio element.
	</audio>
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