## Routes:
### Admin
#### Auth
- `POST /admin/login`
#### Manage users
- `GET /admin/user/`
- `POST /admin/user/`
- `DELETE /admin/user/:id`
- `PUT /admin/user/:id`
#### Manage categories
- `GET /admin/category/`
- `POST /admin/category/`
- `DELETE /admin/category/:id`
- `PUT /admin/category/:id`
#### Manage posts
- `GET /admin/post/`
- `POST /admin/post/`
- `DELETE /admin/post/:id`
- `PUT /admin/post/:id`

### General
#### Auth
- `POST /login`
#### Category
- `GET /category`
#### Post
- `GET /post`
#### Account
- `POST /account/upgrade`

### Webhook
- `POST /webhook`

## Code structure breakdown
### Folders
- `controllers`: Receives HTTP requests from the client, process it and return the response
- `middlewares`: Preprocess requests before sending to a controller
- `models`: Represent the data in the database
- `services`: Handle 3rd party integrations
- `utils`: Handle general functions
- `validations`: Define request body schema for validations

## How to run locally
- run `npm run dev`