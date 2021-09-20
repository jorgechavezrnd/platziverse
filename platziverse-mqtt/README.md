# platziverse-mqtt

## `agent/connected`

``` js
{
  agent: {
    uuid, // auto generar
    username, // definir por configuracion
    name, // definir por configuracion
    hostname, // obtener del sistema operativo
    pid // obtener del proceso
  }
}
```

## `agent/disconnected`

``` js
{
  agent: {
    uuid
  }
}
```

## `agent/message`

``` js
{
  agent,
  metrics: [
    {
      type,
      value
    }
  ],
  timestamp // generar cuando creamos el mensaje
}
```

## Command for run redis with docker
- `docker run --name redis_server -p 6379:6379 -d redis`

## Command for start server in dev mode
- `npm run start-dev`

## Command for initialize project with npm
- `npm init`

## Commands for run some tests with mqtt package
- `mqtt publish -t 'agent/message' -h localhost -m 'hello platziverse'`
- `mqtt publish -t 'agent/message' -h localhost -m '{"hello": "platziverse"}'`
- `mqtt pub -t 'agent/message' -m 'hello'`

## Commands for test and create an agent with some metrics, and check it in database
- Create an agent with two metrics: `mqtt pub -t 'agent/message' -m '{"agent": { "uuid": "yyy", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzibogota" }, "metrics": [{ "type": "memory", "value": "1001" }, { "type": "temp", "value": "33" }]}'`
- Check in database:
  - docker exec -it postgres_server bash
  - su - postgres
  - psql -U platzi platziverse
  - SELECT * FROM agents;
  - SELECT * FROM metrics;
  - \q
- Create other agent with other uuid: `mqtt pub -t 'agent/message' -m '{"agent": { "uuid": "yyyx", "name": "test", "username": "platzi", "pid": 10, "hostname": "platzibogota" }, "metrics": [{ "type": "memory", "value": "1001" }, { "type": "temp", "value": "33" }]}'`
- Check again in database

## Commands for install dependencies
- `npm i --save-dev standard nodemon`
- `npm i --save debug aedes aedes-persistence-redis chalk`
- `npm install -g mqtt`
