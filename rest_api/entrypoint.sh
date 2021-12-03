#!/bin/bash

if [ "$DB" = "postgresql" ]
then
    echo "Waiting for postgres..."

    # shellcheck disable=SC2086
    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# shellcheck disable=SC2143
if [[ $(python manage.py showmigrations | grep '\[ \]') ]]
then
    python manage.py flush --no-input
    python manage.py migrate
fi

exec "$@"
