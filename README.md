## Multi container app

### Development environment Couchbase

- `docker run -d --name db -p 8091-8094:8091-8094 -p 11210:11210 couchbase`
- Create a cluster
  - Cluster Name: `main`
  - Create Admin User: `Administrator`
  - Create Password: `password`
  - Click `Next: Accept Terms`
    - [x] I accept the terms & conditions
    - [ ] Share usage information and get software update notifications.
  - Click `Configure Disk, Memory, Services`
      - [x] Data: `512 MiB`
      - [ ] Query
      - [ ] Index
      - [ ] Search
      - [ ] Analytics
      - [ ] Eventing
      - [ ] Backup
  - Click `Save & Finish`
  - In the left menu click `Buckets`
  - In the top right corner click `Add bucket`
    - Name: `default`
    - Click `Add bucket`

### Creating a new user and authorizing the user

- Start the Django management console
  - `python manage.py shell`
- Import the user model
  - `from django.contrib.auth.models import User`
- Create a user
  - `User.objects.create_user(username='<username>', email='<email>', password='<password>')`
- Fetch the user token (cURL)
  ```
    curl --location --request POST 'http://localhost:8000/token/' \
         --header 'Content-Type: application/json' \
         --data-raw '{"username": "<username>", "password": "<password>"}'
  ```
- Use the access token for authorization
  ```
    curl --location --request GET 'http://localhost:8000/api/items/' \
         --header 'Authorization: Bearer <access_token>'
  ```