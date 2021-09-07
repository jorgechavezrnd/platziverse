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

## Commands for install dependencies
- `npm i --save-dev standard nodemon`
- `npm i --save debug aedes aedes-persistence-redis chalk`
- `npm install -g mqtt`
