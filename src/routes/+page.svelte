<script lang="ts">
	import { HttpAgent } from '@dfinity/agent';
	import { createActor, canisterId, backend } from '../declarations/backend';
	import { AuthClient } from '@dfinity/auth-client';
	import { onMount } from 'svelte';

	let input = '';
	let disabled = false;
	let greeting = '';
	let principal = '';
	let state: 'loading' | 'authenticated' | 'unauthenticated' = 'loading';

	onMount(async () => {
		let authClient = await AuthClient.create();
		state = (await authClient.isAuthenticated()) ? 'authenticated' : 'unauthenticated';
		if (state === 'authenticated') {
			const identity = authClient.getIdentity();
			const agent = new HttpAgent({ identity });
			actor = createActor(canisterId, {
				agent
			});
		}
	});

	// we use the default unauthenticated actor
	// until the user signs in
	let actor = backend;

	const handleGreet = async () => {
		disabled = true;

		try {
			// Call the IC
			greeting = await actor.greet(input);
		} catch (err: unknown) {
			console.error(err);
		}

		disabled = false;
	};

	const handleWhoAmI = async () => {
		disabled = true;

		try {
			// Call the IC
			principal = (await actor.whoAmI()).toString();
		} catch (err: unknown) {
			console.error(err);
		}

		disabled = false;
	};

	const signIn = async () => {
		try {
			// create an auth client
			let authClient = await AuthClient.create();

			// start the login process and wait for it to finish
			await new Promise<void>((resolve, reject) => {
				authClient.login({
					identityProvider:
						process.env.DFX_NETWORK === 'ic'
							? 'https://identity.ic0.app'
							: `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
					onSuccess: resolve,
					onError: reject,
					windowOpenerFeatures: `toolbar=0,location=0,menubar=0,width=400,height=600,left=${window.screen.width / 2 - 200},top=${window.screen.height / 2 - 300}`
				});
			});

			state = 'authenticated';

			// At this point we're authenticated, and we can get the identity from the auth client:
			const identity = authClient.getIdentity();
			// Using the identity obtained from the auth client, we can create an agent to interact with the IC.
			const agent = new HttpAgent({ identity });
			// Using the interface description of our webapp, we create an actor that we use to call the service methods.
			actor = createActor(canisterId, {
				agent
			});
		} catch (err: unknown) {
			console.error(err);
		}
	};

	const signOut = async () => {
		try {
			// create an auth client
			let authClient = await AuthClient.create();

			// start the logout process and wait for it to finish
			await authClient.logout();

			state = 'unauthenticated';

			actor = backend;
		} catch (err: unknown) {
			console.error(err);
		}
	};
</script>

<svelte:head>
	<title>Vite + SvelteKit + Motoko</title>
</svelte:head>

<main class="App">
	{#if state === 'loading'}
		<div class="spinner ii-button"></div>
	{:else if state === 'authenticated'}
		<button class="ii-button" on:click={signOut}>Sign out</button>
	{:else}
		<button class="ii-button" on:click={signIn}>Sign in with Internet Identity</button>
	{/if}
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

	<form on:submit|preventDefault={handleGreet}>
		<label for="name">Enter your name: &nbsp;</label>
		<input id="name" alt="Name" type="text" bind:value={input} {disabled} />
		<button type="submit" {disabled}>Click Me!</button>
	</form>

	<section class="display-content">
		{greeting}
	</section>

	<form on:submit|preventDefault={handleWhoAmI}>
		<button type="submit" {disabled}>Who Am I?</button>
	</form>

	<section class="display-content">
		{principal}
	</section>
</main>

<style lang="scss">
	.App {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
		text-align: center;
	}

	.ii-button {
		position: absolute;
		top: 0;
		right: 0;
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
		.logo.vite {
			animation: logo-spin infinite 60s linear reverse;
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

	.display-content {
		margin: 10px auto;
		padding: 10px 60px;
		border: 1px solid #888;
		background-color: #888;
		border-radius: 8px;
	}

	.display-content:empty {
		display: none;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-top: 4px solid #000;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 2s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
