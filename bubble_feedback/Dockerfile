FROM python:3.7.6-alpine3.10
RUN mkdir -p /app
WORKDIR /app

RUN apk update
RUN apk add g++ gcc
RUN python3 -m pip install -U pip


COPY bubble_feedback-0.1.0-py3-none-any.whl .
RUN python3 -m pip install bubble_feedback-0.1.0-py3-none-any.whl
RUN rm -rf bubble_feedback-0.1.0-py3-none-any.whl

EXPOSE 5000
CMD python3 -m bubble_feedback.web.server