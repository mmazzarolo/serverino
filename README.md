![GitHub Actions](https://github.com/mmazzarolo/serverino/workflows/Lint%20&%20Test/badge.svg)
[![Install Size](https://packagephobia.now.sh/badge?p=serverino)](https://packagephobia.now.sh/result?p=serverino)

<br />

# Serverino! <img src="./.github/banner.png" width="110" align="left">

Tiny CLI-based static server

<br />
<br />

Serverino is a lightweight tool for serving static content on localhost.

Thanks to locally-trusted development certificates it can also host your static content on https://localhost.

No setup required.

Under the hood Serverino is powered by [Express](https://expressjs.com/) and [https-localhost](https://github.com/daquinoaldo/https-localhost).

## Usage

The quickest way to get started is to run serverino in your project directory using [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner).

```
npx serverino
```

If you prefer, you can also install the package globally using [npm](https://npmjs.com/) or [Yarn](https://yarnpkg.com/).

```bash
# Using npm
npm install --global serverino

# Using yarn
yarn global add serverino
```

Once that's done, you can run this command inside your project's directory...

```bash
serverino
```

...or specify which folder you want to serve:

```bash
serverino folder_name
```

That's it! :tada:

## Available options

```
Usage
    $ serverino [dir] [path]

  Options
    --port -p     Port
    --secure -s   Use HTTPS
    --cors -c     Set "Access-Control-Allow-Origin" to "*"
    --verbose -v  Log requests

  Examples
    $ serverino
    $ serverino ./dist
    $ serverino ./dist /admin/

  Run without arguments serves the current directory on http:/localhost:8080/.
```

## Contributing

Each contribute is welcome!  
Please, checkout the [contributing guidelines](.github/CONTRIBUTING.md).

## License

Is released under [AGPL-3.0 - GNU Affero General Public License v3.0](LICENSE).

### Briefly:

- modification and redistribution allowed for both private and **commercial use**
- you must **grant patent rigth to the owner and to all the contributors**
- you must **keep it open source** and distribute under the **same license**
- changes must be documented
- include a limitation of liability and it **does not provide any warranty**

### Warranty

THIS TOOL IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU.
For the full warranty check the [LICENSE](./LICENSE.md).
