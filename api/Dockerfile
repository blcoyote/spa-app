FROM python:3.12-bookworm

RUN apt-get update && apt-get dist-upgrade -y
WORKDIR /app
RUN python -m pip install --upgrade pip
RUN export GRPC_PYTHON_BUILD_SYSTEM_OPENSSL=1
RUN export GRPC_PYTHON_BUILD_SYSTEM_ZLIB=1
COPY ./requirements.txt /app/requirements.txt
RUN python -m pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY ./app /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80", "--proxy-headers"]
