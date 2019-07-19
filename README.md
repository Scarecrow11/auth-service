This api controls the login for the user, at registration gives him a token.
Upon next requests this token will be checked.

Token expired after 5 minutes.

  Query types:

#### post /v1/auth/register
- registers the user
- creates a token
- send email whith conformation code
- expects username, email, password

#### post /v1/auth/login
- authorizes user
- creates a token
- expects email, password
- if confirm email login else send email again

#### post /v1/auth/logout
- removes token

#### get /v1/users/
- returns all users emails , usernames
- only to authorized users
- only if confirm email

#### get /v1/users/current/
- returns all user data
- only to authorized users

#### get /v1/users/forgotpassword
- send email to user
- expects email

#### post /v1/users/checkcodepassword
- check code and update password
- expects email, code, password

#### post /v1/users/checkcodeemail
- confirm email
- expects email, code