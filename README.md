# Mock Json Server
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://jenkins.joelpodrebarac.me/buildStatus/icon?job=Mock-JSON-Server/master)](https://jenkins.joelpodrebarac.me/job/Mock-JSON-Server/job/master/)

Create a mock server using a json file.

## Installation

To install, you need to have NodeJS and NPM installed on your system. Go to [https://nodejs.org/en/](https://nodejs.org/en/), download and install one of the provided versions. Both NodeJS and NPM are included.

Install the mock-json-server package by running `npm install -g mock-json-server` in your terminal.

Using **npm v5.6.0 or later**? You can skip global installation and directly run `npx mock-json-server data.json` in a folder containing the below explained `data.json`.

**Thats it!**

## Example

To run the server run: `mock-json-server data.json` This starts a server on http://localhost:8000/
you can change the port by running `mock-json-server data.json --port=3000`

`data.json` contains:

```json
{
    "/home": {
        "get": {
            "data": [
                {"id":1,"name": "Steve"}
            ]
        },
        "post": {
            "data": [
                {"id":1,"name": "Steve French"}
            ]
        }
    }
}
```

A Get Request to http://localhost:8000/home will return.

```json
    {
        "data": [
            {"id":1,"name": "Steve"}
        ]
    }
```

A Post Request to http://localhost:8000/home will return.

```json
    {
        "data": [
            {"id":1,"name": "Steve French"}
        ]
    }
```


## Docker

Mock json server is also a docker image. Run it with the command 
```bash
docker run --name mock-json-server -v $(pwd)/test/data.json:/usr/src/app/data.json -p 8000:8000 ajoelpod/mock-json-server
```


### Changing the port

Run the same command as above but with the `PORT` environment variable. Also change the -p to be equal to your new port.
```bash
docker run --name mock-json-server --env PORT=3000 -v $(pwd)/test/data.json:/usr/src/app/data.json -p 3000:3000 ajoelpod/mock-json-server
```

**or**

Just change the forwared ports
```bash
docker run --name mock-json-server -v $(pwd)/test/data.json:/usr/src/app/data.json -p 3000:8000 ajoelpod/mock-json-server
```

### Docker Compose

Example.
```yml
version: '3'
services:
  mock-json:
    image: 'ajoelpod/mock-json-server'
    volumes:
      - ./test/data.json:/usr/src/app/data.json
    ports:
      - 8000:8000
```


## Running Programmatically

```js
const server = require('mock-json-server');
const app = server({
  "/home": {
    "get": {
      "data": [{ "id": 1, "name": "Steve" }]
    },
    "post": {
      "data": [{ "id": 1, "name": "Steve French" }]
    }
  },
  "/test/:id": {
    "get": {
      "data": [{ "id": 1, "name": "Steve" }]
    },
    "post": {
      "data": [{ "id": 1, "name": "Steve French" }]
    }
  }
}, 8000); // Start the server with a JSON object;


// Start the server;
app.start();

// Reload the server with new data;
app.reload({ test : true });

// Stop the server
app.stop();
```
