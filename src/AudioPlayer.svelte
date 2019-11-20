<script context="module">
	const elements = new Set();
</script>

<script>
    import { onMount } from 'svelte';
    import ProgressBar from './ProgressBar/index.svelte'
    
	export let url;
	export let title;
	export let composer;
	export let performer;
	let audio;
    let paused = true;
    let src = ''
    let currentTime = 0
    let progress = 0
    
	onMount(() => {
        reload()
		elements.add(audio);
        
        function step(timestamp) {
            currentTime = audio.currentTime
            progress = audio.currentTime / (audio.duration / 100)
            // console.log(currentTime)
            series[0].perc = progress || 0
            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
        return () => elements.delete(audio);
    });

	function stopOthers() {
		elements.forEach(element => {
			if (element !== audio) element.pause();
		});
    }

    function reload() {
        audio.pause()
        src = url + '?' + new Date().getTime()
    }

    function click() {
        if(paused) {
            audio.play()
        } else {
            audio.pause()
        }
        console.log(click)
    }
    
    let series = [{
			perc: progress,
			color: '#2196f3'
		}];
    let bar;
    
</script>

<style>
	player { margin: 0 0 1em 0; max-width: 800px }
	h2, p { margin: 0 0 0.3em 0; }
	audio { width: 100%; margin: 0.5em 0 1em 0; }
	.playing { color: #ff3e00; }
</style>

<player class:playing={!paused}>
	<h2>{title}</h2>
	<p><strong>{composer}</strong> / performed by {performer}</p>
    <!-- <ProgressBar {series} bind:this={bar} width="100" height="100" style="radial" thickness="10" on:click="{click}" status="{paused}"/> -->

	<audio
		bind:this={audio}
		bind:paused
		on:play={stopOthers}
		controls
		{src}
	></audio>
</player>