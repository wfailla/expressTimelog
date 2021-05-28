# API design

## POST /log

Endpoint to log new time. Payload timestamp (`YYYY-MM-DD-HH-MM`) and activity string.

example payload:

```json
{
    'timestamp': '2021-02-03-12-45',
    'activity': 'coding'
}
```

## GET /log

Endpoint to get all logs of a day. Query parameter day (`YYYY-MM-DD`).

# TODO:

- implement tasks
- implement categories