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
  - In the top right corner click `Add mucket`
    - Name: `default`
    - Click `Add bucket`