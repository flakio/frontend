# frontend
Front End SPA

## Deployment


`curl -s -XPOST localhost:8080/marathon/v2/apps -d@marathon.json -H "Content-Type: application/json"`

__Download and deploiy__

`curl https://raw.githubusercontent.com/flakio/frontend/master/marathon.json | curl -qs -XPOST localhost:8080/marathon/v2/apps -d@- -H "Content-Type: application/json"`
