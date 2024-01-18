<script lang="ts">
	import { createActor } from '../declarations/backend';

	let input = '';
	let disabled = false;
	let greeting = '';

	const handleOnSubmit = async () => {
		disabled = true;

		try {
			// Canister IDs are automatically expanded to .env config - see vite.config.ts
			const canisterId = process.env.CANISTER_ID_BACKEND!;

			// Create an actor to interact with the IC for a particular canister ID
			const actor = createActor(canisterId);

			// Call the IC
			greeting = await actor.greet(input);
		} catch (err: unknown) {
			console.error(err);
		}

		disabled = false;
	};
</script>

<svelte:head>
	<title>Vite + SvelteKit + Motoko</title>
</svelte:head>

<main class="App">
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="vite.svg" class="logo vite" alt="Vite logo" />
		</a>
		<a href="https://kit.svelte.dev/" target="_blank">
			<img src="svelte.svg" class="logo svelte" alt="Svelte logo" />
		</a>
		<a
			href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
			target="_blank"
		>
			<span class="logo-stack">
				<img src="motoko_shadow.png" class="logo motoko-shadow" alt="Motoko logo" />
				<img src="motoko_moving.png" class="logo motoko" alt="Motoko logo" />
			</span>
		</a>
	</div>
	<h1>Vite + SvelteKit + Motoko</h1>

	<form on:submit|preventDefault={handleOnSubmit}>
		<label for="name">Enter your name: &nbsp;</label>
		<input id="name" alt="Name" type="text" bind:value={input} {disabled} />
		<button type="submit" {disabled}>Click Me!</button>
	</form>

	<section id="greeting">
		{greeting}
	</section>
</main>

<style lang="scss">
	.App {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
	}
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #61dafbaa);
	}

	@keyframes logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: no-preference) {
		.logo.svelte {
			animation: logo-spin infinite 60s linear;
		}
	}

	.logo.motoko:hover {
		filter: drop-shadow(0 0 2em #61dafbaa);
	}

	.logo-stack {
		display: inline-grid;
	}

	.logo-stack > * {
		grid-column: 1;
		grid-row: 1;
	}

	@keyframes logo-swim {
		from {
			transform: rotate(4deg) translateY(0);
		}
		50% {
			transform: rotate(-5deg) translateY(0);
		}
		to {
			transform: rotate(4deg) translateY(0);
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.logo.motoko {
			animation: logo-swim 5s ease-in-out infinite;
		}
	}

	form {
		display: flex;
		justify-content: center;
		gap: 0.5em;
		flex-flow: row wrap;
		max-width: 40vw;
		margin: auto;
		align-items: baseline;
		font-family: sans-serif;
		font-size: 1.5rem;
	}

	button[type='submit'] {
		padding: 5px 20px;
		margin: 10px auto;
		float: right;
	}

	#greeting {
		margin: 10px auto;
		padding: 10px 60px;
		border: 1px solid #888;
		background-color: #888;
		border-radius: 8px;
	}

	#greeting:empty {
		display: none;
	}
</style>
