#!/bin/bash

sequelize model:generate --name User --attributes name:string,email:string,password:string,resetToken:string,resetTokenExpiry:string,permissions:enum