FROM python:3.9-alpine

RUN apk update && apk add git make cmake g++ openssl-dev curl

WORKDIR /usr/src/microservice

COPY ./requirements.txt ./

RUN python -m pip install --upgrade pip setuptools wheel
RUN python -m pip install -r ./requirements.txt

COPY ./ ./

RUN sed -i 's/\r$//g' ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["/usr/src/microservice/entrypoint.sh"]

CMD ["uvicorn", "main:ms", "--host", "0.0.0.0", "--port", "8001"]