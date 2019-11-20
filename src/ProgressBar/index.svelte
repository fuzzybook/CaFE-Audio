<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { setContext } from 'svelte';
	import { derived } from 'svelte/store';
	import RadialProgressBar from './RadialProgressBar.svelte';
	import LinearProgressBar from './LinearProgressBar.svelte';

	export let style = 'default'; // [thin, radial]
	export let showProgressValue = true;
	export let width = null;
	export let thickness = null;
	export let height = null;
	export let textSize = null;
	export let status = false;

	if(width == 'auto')
		width = '100%';

	export let colors = [
		'#FFC107',
		'#4CAF50',
		'#03A9F4'
	];

	export let series = [];

	const twOpts = {
		duration: 1000,
		easing: cubicOut
	};

	if(!Array.isArray(series))
		series = [series];

	series = series.map((s, idx) => {
		if(typeof s != 'object')
			s = {perc: s};

		s.offset = tweened(0, twOpts);
		s.prevOffset = tweened(0, twOpts);

		if(!s.color)
			s.color = colors[idx % colors.length];

		return s;
	});

	const valueStore = tweened(Array(series.length).fill(0), twOpts);
	const valStore = derived(
		valueStore,
		// $valueStore => $valueStore.map(s => Math.round(s) + '%').join(' + ')
		$valueStore => $valueStore.map(s => parseFloat(s).toFixed(2)+ '%').join(' + ')
	);

	$: {
		valueStore.set(series.map(s => s.perc));

		let cumOffset = 0;
		series.forEach((s, idx) => {
			s.prevOffset.set(cumOffset);
			cumOffset += s.perc;
			s.offset.set(cumOffset);
		});
	}

	setContext('valStore', valStore);

	export function updatePerc(perc, seriesIdx = 0) {
		series[seriesIdx].perc = perc;
	}

</script>

<style>
	.comander:hover .btn{
		fill: black;
	}
	.btn{
		fill: #b9b3b378;
	}
</style>

{#if style == 'radial'}
	<div on:click style="position:relative; width:{width}px; height:{height}px;">
		<div class="comander" style="position:absolute; width: {width}px; top:{(height - 48) / 2}px">
		{#if !status}
		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path class="btn" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
		{:else}
		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path class="btn" d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
		{/if}
		</div>
		<RadialProgressBar {series} {thickness} {width} {height} {textSize} {showProgressValue} />
	</div>
{:else}
	<LinearProgressBar {series} {style} {width} {height} {textSize} {showProgressValue} />
{/if}