FROM tensorflow/tensorflow:2.4.1
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]
