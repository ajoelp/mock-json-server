# Mock Json Server

Create a mock server using a json file.

## Installation

To install you need to have NodeJS and NPM installed on your system [https://nodejs.org/en/](https://nodejs.org/en/)
Install the mock-json-server package by running `npm install -g mock-json-server`

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
