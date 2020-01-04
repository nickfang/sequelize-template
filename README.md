# sequelize-template




# postgres cli scripts

Run psql
```
psql -U postgres
```

Create User - The user created when postgresql was installed was 'postgres'.  The default user seems to be the user logged into the machine.  Create user so the -U flag isn't needed when running all the postgresql scripts.
```
createuser -U postgres --interactive --pwprompt
```

# psql commands

Change password
```
ALTER USER <user> WITH PASSWORD <password>
```
