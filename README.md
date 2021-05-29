# 3-5-2

3-5-2 is a fantasy football web application. It follows many of the similar concepts of fantasy.premierleague.com, but the crucial addition is an auction / bidding system for players. The intention is also to add additional paid for features that allow individual one off competitions.

## Technology

3-5-2 is a SaaS web application and utilizes the following technologies:

- NextJS
- NextAuth
- MySQL
- ReactJS
- Material UI
- Tailwind CSS
- Docker

## Local Development

The project should be ready for local development. You will need Docker and Docker Compose installed on your local machine:

[https://docs.docker.com/compose/install](https://docs.docker.com/compose/install)

Then clone the repository, change directory and run:

```
docker-compose build
docker-compose up
docker-compose exec 3-5-2-server npm run migrate
```

The application should then be connected to a MySQL docker container, and running on `http://localhost:3000`. You will also need a `.env.local` file, which is not in the repository so reach out to Jamie or Sam.