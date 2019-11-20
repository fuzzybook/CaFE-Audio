<script>
import arcPath from "./svgArcPath.js"
import { onMount } from 'svelte';

let path = ''

let angle = 0
let progress = 0
onMount(() => {
        path = arcPath([50,50],[50,50],[0, progress], 270)
    });

    const changeProgress = () => {
        let p = parseInt((360.0 / 100.0) * progress)
        path = arcPath([50,50],[50,50],[0, Math.max(p, 359)], 270)
        console.log(path, p, parseInt((360.0 / 100.0) * progress))
    }
    
</script>



<style>
	
</style>

<label>
	<input type=number bind:value={progress} min=0 max=100 >
	<input type=range bind:value={progress} min=0 max=100 on:input="{changeProgress}">
</label>
<svg style="stroke:black; fill:none; stroke-width:2" width="101" height="101"><path d="{path}"></path></svg>

