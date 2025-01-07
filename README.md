# Contact form application

Contact Form Web

## Notes
Both of the instances have `Dockerfile` and `docker-compose` included.

Can be easily set-up and deployed by using:
```
docker-compose up --build -d
```

## Main functionalities (same across both app)
- Login
- Register
- User can fill in Contact Form
- Admin can view Contact Form submission

## Reasons for making 2 kind of website
**Laravel:** Demonstrates how easy it is to build authentication, authorization, validation, and encryption using out-of-the-box solutions with no hassle.
<br>
<br>
**Koa:** Provides a more granular approach, requiring more effort in middleware setup, securing routes, and implementing features like authentication and authorization, offering greater control but with additional work.
## Laravel
In my testing, I used `mysql` as storage backend.
```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=redacted
DB_USERNAME=redacted
DB_PASSWORD=redacted
```
### Creating an account
Head to `/register` and register an account. You can now fill in the contact form.

### Creating an admin account
Get into the Docker shell/shell, run this command below. This will generate a random password for admin.
```
php artisan make:admin admin@example.com
```

## Koa
In my testing, I used `mysql` as storage backend.

### Creating an account
Head to `/register` and register an account. You can now fill in the contact form.

### Creating an account
Get into the Docker shell/shell, run this command below. This will generate a random password for admin.
```
node utils/createAdmin.js
```

## Disclaimer
