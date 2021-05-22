## MineLegion Launcher

### Install Dependencies

```
$ cd launcher

# using yarn or npm
$ yarn (or `npm install`)
```

### Create Code Signing Certificate

```
$ npx electron-builder create-self-signed-cert -p MineLegion

# this will generate you a MineLegion.pkv file
# you must point an environment variable (CSC_LINK) to this file 
```

### Use it

```
# development mode
$ yarn dev (or `npm run dev` or `pnpm run dev`)

# production build
$ yarn build (or `npm run build` or `pnpm run build`)
```

### Publishing
1. Create a Github personal token with permissions to create builds in the repo specified in `package.json`
2. Set up an environment variable named `GH_TOKEN` with the newly generated token's value
3. Set up a code signing certificate via `CSC_LINK` envorinment variable as specified above (optional)
4. Run `npm run publish` in your command prompt
5. Publish the draft release in Github Releases UI

### Notes
This project is intended to be used for online mode, so please try to use a paid version of the game. The offline mode usage is purely for debugging purposes.

### Resources
[Website](https://minelegion.hu)
[Discord](https://discord.gg/CEPV3acrJx)