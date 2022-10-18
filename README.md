# x11-sentinel-dashboard

React based client application which serves as a browser based dashboard for the
x11-sentinel application.

## Configurations

The application can be configured with the following environment variables:

*   `APP_SERVER_PORT`
    When starting the application via Docker, the built application will be
    availabe on this port. When running the project locally you should
    ignore this variable.

*   `REACT_APP_SENTINEL_SERVER_URL`
    The URL of the x11-sentinel backend service.

*   `REACT_APP_VERIFICATION_THRESHOLD`
    A float value between 0.0 and 1.0. This value defines a threshold in the
    verification score. If a verification is below this threshold it is
    called an "incident".

*   `REACT_APP_QUERY_INTERVAL`
    The components will update their state by sending requests to the
    server. This interval controls how often state updates will fire.

*   `REACT_APP_TABLE_QUERY_INTERVAL`
     Updating tables should less frequent than e.g. updating a chart.
     Frequent updates on tables can cause a headache because the column based
     sorting resets on update. This interval controls how often state updates
     for tables will fire.

## Building and running the project

### Dependencies

*   **nodejs**
    Install version at least `16.14.0`. Recommended way of installation for
    Linux based environments is via the `asdf` package manager.

*   **yarn**
    Install version at least `1.22.10`. Recommended way of installation for
    Linux based environments is via the `asdf` package manager.

### Building and running the project locally

1.  Install the dependencies:

    ```
    make install-deps
    ```

2.  Export the environment variables needed by the project. Using `direnv` is
    highly recommended for this purpose. Sensible default configuration values
    can be found in the `env.local` file.

3.  Start the development server:

    ```
    make server
    ```

### Building and running the project with Docker

1.  Build the project with the following command:

    ```
    docker-compose --env-file env.local -f docker-compose.yml build
    ```

2.  Start the container with the following command:

    ```
    docker-compose --env-file env.local -f docker-compose.yml up -d
    ```

### Testing the project with test dummy users

The project includes test data generation for development purposes. To build and
run the project in test mode export and set the `REACT_APP_TEST` variable to
true. In order to create a Docker container in test environment, use the
`env.test` file:

1.  Build the project with the following command:

    ```
    docker-compose --env-file env.test -f docker-compose.yml build
    ```

2.  Start the container with the following command:

    ```
    docker-compose --env-file env.test -f docker-compose.yml up -d
    ```
