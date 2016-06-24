# Mock Json Server

Create a mock server using a json file.

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