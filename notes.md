# hacktivoverflow

## User List
1. Vomakoja 
    - email: vomakoja@geroev.net
    - password: vomakoja
2. Bob 
    - email: bob@mail.com
    - password: bob
3. Upvoter 
    - email: upvoter@mail.com
    - password: upvoter

## .env
JWT_secret=< secret to be used for JWT Token> / 108_stars

mlab_user=admin

mlab_password=Adm1n1strator

email_pass=< password used to send email>
 * Note that the email address used to send email is harcoded in "helpers/nodemailer.js"
 * Please use own email if you want to test the nodemailer function.

googleClientId=< google client id> / 948254138064-hh07f9ka4k2kgbs0spgqoho7lhvgvb4v.apps.googleusercontent.com

## Link Deploy
https://xavier-ho-client.thenile.online/

## Additional Feature
- Chart to show Popular Users
- WYSIWYG editor for body of question and answer

## Bugs
- When deleting question, the loading animation seems to load twice 
- Google (gapi) might not be loaded: try refreshing if that happens.

## Obstacles
- Managing time between potfolio and livecode