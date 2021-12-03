FROM python:3.9-alpine

WORKDIR /usr/src/rest_api

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apk update && apk add --no-cache postgresql-dev gcc musl-dev python3-dev bash

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./ ./

RUN sed -i 's/\r$//g' ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/usr/src/rest_api/entrypoint.sh"]

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]