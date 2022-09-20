# Important please read
 You are required to dockerize your application for us to run your submission. The following templates are available for you to use for your submission. Feel free to use these templates or you may submit your challenge with your own dockerized services (more brownie points!).

 Please read through this README closely as it may have important information to assist you on your coding challenge adventure!

# Installing Docker
You are required to install docker on your system. Please follow this [link](https://docs.docker.com/get-docker/) to get your installation package for Docker 

Docker does a great job running you through on how to install docker on OSX, Windows or Linux based OS.

Once you installed Docker and this is your first time using it, we recommend you to go through the 2 minute tutorial found here:

https://docs.docker.com/get-started/#start-the-tutorial

# Run - Frontend (React)
Go to react-template repo and run
```
docker-compose build
docker-compose up
```

You should now be able to access the running templated project through localhost at the port shown in the terminal. In the example below, http://localhost:3000.

```
❯ docker-compose up
Docker Compose is now in the Docker CLI, try `docker compose up`

Recreating hello-world ... done
Attaching to hello-world
hello-world    |
hello-world    | > react-template@0.1.0 start /app
hello-world    | > react-scripts start
hello-world    |
hello-world    | ℹ ｢wds｣: Project is running at http://172.19.0.2/
hello-world    | ℹ ｢wds｣: webpack output is served from
hello-world    | ℹ ｢wds｣: Content not from webpack is served from /app/public
hello-world    | ℹ ｢wds｣: 404s will fallback to /
hello-world    | Starting the development server...
hello-world    |
hello-world    | Compiled successfully!
hello-world    |
hello-world    | You can now view react-template in the browser.
hello-world    |
hello-world    |   Local:            http://localhost:3000
hello-world    |   On Your Network:  http://172.19.0.2:3000
hello-world    |
hello-world    | Note that the development build is not optimized.
hello-world    | To create a production build, use npm run build.
hello-world    |
```

If you need to shut down the project, run `docker-compose down`. 

# Run - Backend (Node + Express)

Go to express-template repo and run
```
docker-compose build
docker-compose up
```

You should see something like

```
Listening on 8080. Ctrl+c to stop this server.
```

## API Reference

#### Post: Notify Supervisor

```http
  POST /api/supervisor/submit
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**. First Name |
| `lastName` | `string` | **Required**. Last Name |
| `supervisor` | `object` | **Required**. Supervisor object |
| `email` | `string` | email |
| `phoneNumber` | `string` | phone number |
