# 🏗 Scaffold-ETH-VUE

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NuxtJS, Walletconnect, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- [Pnpm(>=9.0)](https://pnpm.io/motivation)
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH-VUE, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/TomatoDroid/scaffold-eth-vue.git
cd scaffold-eth-vue
pnpm install
```

2. Run a local network in the first terminal:

```
pnpm chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
pnpm deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `pnpm deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
pnpm start
```

Visit your app on: `http://localhost:3001`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `nuxt/scaffold.config.ts`.

**What's next**:

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `nuxt/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`
- Edit your smart contract test in: `packages/hardhat/test`. To run test use `pnpm hardhat:test`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH-VUE.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH-VUE

We welcome contributions to Scaffold-ETH-VUE!

Please see [CONTRIBUTING.MD](https://github.com/TomatoDroid/scaffold-eth-vue/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH-VUE.

## Thanks

This project is copy from [scaffold-eth-2](https://github.com/scaffold-eth/scaffold-eth-2)