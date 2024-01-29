# Vite + SvelteKit + Motoko

### Get started directly:

> [!WARNING]
> Due to current limitations, this template does not work in a Browser Editor when using gitpod. Please use VS Code for desktop instead.
> <img width="633" alt="Screenshot 2024-01-29 at 12 44 57" src="https://github.com/letmejustputthishere/vite-sveltekit-motoko/assets/32162112/2f2c025d-354b-47ca-9303-56bce180f6e7">


[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/letmejustputthishere/vite-sveltekit-motoko)

This template gives you everything you need to build a full-stack Web3 application on the [Internet Computer](https://internetcomputer.org/).

For an example of a real-world dapp built using this starter project, check out the [source code](https://github.com/dfinity/feedback) for DFINITY's [Developer Experience Feedback Board](https://dx.internetcomputer.org/).

## 📦 Create a New Project

> [!IMPORTANT]
> Make sure that [Node.js](https://nodejs.org/en/) `>= 18`, [mops](https://docs.mops.one/quick-start) `>=0.39.2` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.16` are installed on your system.

Run the following commands in a new, empty project directory:

```sh
npx degit letmejustputthishere/vite-sveltekit-motoko vite-sveltekit-motoko # Download this starter project
cd vite-sveltekit-motoko # Navigate to the project directory
dfx start --clean --background # Run dfx in the background
npm run setup # Install packages, deploy canisters, and generate type bindings

npm start # Start the development server
```

When ready, run `dfx deploy --network ic` to deploy your application to the Internet Computer.

## 🛠️ Technology Stack

- [Vite](https://vitejs.dev/): high-performance tooling for front-end web development
- [SvelteKit](https://kit.svelte.dev/): a component-based UI library
- [TypeScript](https://www.typescriptlang.org/): JavaScript extended with syntax for types
- [Sass](https://sass-lang.com/): an extended syntax for CSS stylesheets
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages
- [Motoko](https://github.com/dfinity/motoko#readme): a safe and simple programming language for the Internet Computer
- [Mops](https://mops.one): an on-chain community package manager for Motoko
- [mo-dev](https://github.com/dfinity/motoko-dev-server#readme): a live reload development server for Motoko
- [eslint](https://eslint.org/): a static code analysis tool used in software development for identifying problematic patterns or code that doesn't adhere to certain style guidelines in JavaScript and TypeScript
- [Internet Identity](https://github.com/dfinity/internet-identity/tree/main): a decentralized identity provider for the Internet Computer

## 📚 Documentation

- [Vite developer docs](https://vitejs.dev/guide/)
- [SvelteKit quick start guide](https://learn.svelte.dev/tutorial/introducing-sveltekit)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)
- [Motoko developer docs](https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/)
- [Mops usage instructions](https://j4mwm-bqaaa-aaaam-qajbq-cai.ic0.app/#/docs/install)
- [Internet Identity docs](https://internetcomputer.org/docs/current/developer-docs/integrations/internet-identity/overview)

## 💡 Tips and Tricks

- Customize your project's code style by editing the `.prettierrc` file and then running `npm run format`.
- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Install a Motoko package by running `npx ic-mops add <package-name>`. Here is a [list of available packages](https://mops.one/).
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.
