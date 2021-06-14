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
- implement as electron app
- implement report
- implement log export
    - export day
    - export grouped (for one day)
    - csv export of all entries
- implement log import? 

## Report example

```
Arrived at 07:29

Timetracking and reading up on mattermost and emails            10 min
TT-387: umsetzung                                               7 hours 16 min
Meeting: daily                                                  31 min

Total work done: 7 hours 57 min

By category:

Meeting                                                         31 min
TT-387                                                          7 hours 16 min
(none)                                                          10 min

Slacking:

Mittag**                                                        27 min

Time spent slacking: 27 min
```