import { IDL } from '@dfinity/candid';
import { idlFactory, init } from '../src/declarations/backend/backend.did.js';
import type { _SERVICE } from '../src/declarations/backend/backend.did';
import { resolve } from 'node:path';
import { PocketIc } from '@hadronous/pic';
import { Principal } from '@dfinity/principal';

type InitArgs = {
	phrase: string;
};
const defaultInitArgs: InitArgs = {
	phrase: 'Hello'
};
const WASM_PATH = resolve(__dirname, '..', '.dfx', 'local', 'canisters', 'backend', 'backend.wasm');

interface DeployOptions {
	initArgs?: InitArgs;
	deployer?: Principal;
}

export async function deployCanister({
	initArgs = defaultInitArgs,
	deployer = Principal.anonymous()
}: DeployOptions) {
	const encodedInitArgs = IDL.encode(init({ IDL }), [initArgs]);
	const pic = await PocketIc.create();
	const fixture = await pic.setupCanister<_SERVICE>(
		idlFactory,
		WASM_PATH,
		undefined,
		encodedInitArgs,
		deployer
	);
	const actor = fixture.actor;
	const canisterId = fixture.canisterId;
	return { pic, actor, canisterId };
}
