# Setup

## Environmental variables

To set up the PDF server, you will need to specify some environment variables on the server.

|           |  Variable               | Default                   | Description |
|-----------|-------------------------|---------------------------|-------------|
| Core      | `FORMIO_SERVER`         | https://api.form.io       | URL of the formio-enterprise server.
|           | `LICENSE_KEY`           |                           | A license key that contains pdfServer scope.
|           |                         |                           |
| Database  | `MONGO`                 | mongodb://localhost:27017 | Mongo connection string
|           | `MONGO_DB_NAME`         | formio                    | Mongo database name
|           | `MONGO_SA`              |                           | SA certificate if using SSL DB connection
|           | `FORMIO_PDF_PROJECT`    |                           | If not using mongo, the url of the project containing the pdf resource.
|           | `FORMIO_PDF_APIKEY`     |                           | If not using mongo, an api key for the project containing the pdf resource.
|           |                         |                           |
| Config    | `DOCKER_SECRETS`        | false                     | Whether to enable using docker secrets.
|           | `DOCKER_SECRETS_PATH`   | /run/secrets              | The path to the docker secrets.
|           |                         |                           |
| Rendering | `FORMIO_LIBURL`         |                           | URL of the PDF front-end library (see [formio-pdf](https://github.com/formio/formio-pdf))
|           | `FORMIO_VIEWER`         |                           | URL to a version of the pdf viewer application
|           | `PDF2HTMLEX_PATH`       | /usr/bin/pdf2htmlEX       | path to pdf to html converter
|           | `PDFUNITE_PATH`         | /usr/bin/pdfunite         | path to pdfunite
|           |                         |                           |
| Storage   | `FORMIO_S3_SERVER`      |                           | S3 server URL
|           | `FORMIO_S3_PORT`        | 9000                      | S3 server port
|           | `FORMIO_S3_BUCKET`      |                           | S3 server bucket name
|           | `FORMIO_S3_KEY`         |                           | S3 access key
|           | `FORMIO_S3_SECRET`      |                           | S3 secret key

## Minio
You can setup your local S3 server using [minio](https://www.minio.io/).
There are appropriate versions for Linux/Mac/Windows in [downloads](https://www.minio.io/downloads.html) page.
