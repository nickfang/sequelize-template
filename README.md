# Sequelize

## Setup

  1. `createdb sequelize-template`
  1. `npm run initdb`
  1. `npm start`

## Trouble Shooting

- Destory with `onDelete: 'CASCADE'` and `paranoid: true` does not work.  The cascade get's stopped if paranoid is turned on.  In order to make it work, associated models will need to be destroyed through the afterDestroy hook.  `hooks: true` will also need to be set since before/afterDestroy hooks are not run when destroy is run.

---

# Postgres

## postgres cli scripts
Run psql
```
psql -U postgres
```

Create User - The user created when postgresql was installed was 'postgres'.  The default user seems to be the user logged into the machine.  Create user so the -U flag isn't needed when running all the postgresql scripts.
```
createuser -U postgres --interactive --pwprompt
```

## psql commands

Change password
```
ALTER USER <user> WITH PASSWORD <password>
