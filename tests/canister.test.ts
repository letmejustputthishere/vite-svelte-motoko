import { describe, it, expect, afterEach, beforeEach } from 'vitest';

import { AnonymousIdentity } from '@dfinity/agent';
import { PocketIc, createIdentity, type Actor } from '@hadronous/pic';
import type { _SERVICE } from '../src/declarations/backend/backend.did';
import { deployCanister } from './setup';

describe('canister tests', () => {
	let pic: PocketIc;
	let actor: Actor<_SERVICE>;

	const alice = createIdentity('superSecretAlicePassword');
	const bob = createIdentity('superSecretBobPassword');

	afterEach(async () => {
		await pic.tearDown();
	});

	describe('when calling greet on the canister deployed with the default init args', () => {
		beforeEach(async () => {
			({ pic, actor } = await deployCanister({
				deployer: alice.getPrincipal()
			}));
		});

		it('the argument should be prefixed with `Hello, `', async () => {
			await expect(actor.greet('Moritz')).resolves.toEqual('Hello, Moritz!');
		});

		it('the argument should be prefixed with `Hello, `, even for very long names', async () => {
			const veryLongName = 'a'.repeat(1000);
			await expect(actor.greet(veryLongName)).resolves.toEqual('Hello, ' + veryLongName + '!');
		});

		it('a call to whoami with the anonymous principal should return the anonymous principal', async () => {
			actor.setIdentity(new AnonymousIdentity());
			await expect(actor.whoAmI()).resolves.toEqual(new AnonymousIdentity().getPrincipal());
		});

		it('a call to whoami with the alice principal should return the alice principal', async () => {
			actor.setIdentity(alice);
			await expect(actor.whoAmI()).resolves.toEqual(alice.getPrincipal());
		});

		it('a call to whoami with the bob principal should return the bob principal', async () => {
			actor.setIdentity(bob);
			await expect(actor.whoAmI()).resolves.toEqual(bob.getPrincipal());
		});
	});

	describe('when calling greet on the canister deployed with `bonjour` as an init arg', () => {
		beforeEach(async () => {
			({ pic, actor } = await deployCanister({
				initArgs: { phrase: 'bonjour' },
				deployer: alice.getPrincipal()
			}));
		});

		it('the argument should be prefixed with `bonjour, `', async () => {
			await expect(actor.greet('Moritz')).resolves.toEqual('bonjour, Moritz!');
		});

		it('the argument should be prefixed with `Hello, `, even for very long names', async () => {
			const veryLongName = 'a'.repeat(1000);
			await expect(actor.greet(veryLongName)).resolves.toEqual('bonjour, ' + veryLongName + '!');
		});

		it('a call to whoami with the anonymous principal should return the anonymous principal', async () => {
			actor.setIdentity(new AnonymousIdentity());
			await expect(actor.whoAmI()).resolves.toEqual(new AnonymousIdentity().getPrincipal());
		});

		it('a call to whoami with the alice principal should return the alice principal', async () => {
			actor.setIdentity(alice);
			await expect(actor.whoAmI()).resolves.toEqual(alice.getPrincipal());
		});

		it('a call to whoami with the bob principal should return the bob principal', async () => {
			actor.setIdentity(bob);
			await expect(actor.whoAmI()).resolves.toEqual(bob.getPrincipal());
		});
	});
});
