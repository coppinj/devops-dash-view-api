# DevOps Dashboard View API

## Description
This project is the backend API for the DevOps Dashboard, built using NestJS. It provides endpoints to manage and retrieve data related to the DevOps pipeline.

## Prerequisites
- Docker

## Installation
Instructions to set up and run the project.

### Docker
1. Clone the repository and initialize submodules:
    ```sh
    git clone --recurse-submodules https://github.com/coppinj/devops-dash-view-api.git
    cd devops-dash-view-api
    ```

   If you have already cloned the repository without submodules, initialize them manually:
    ```sh
    git submodule update --init --recursive
    ```

2. Start the backend service with Docker Compose:
    ```sh
    docker-compose up
    ```

This will automatically:
- Build the Docker image for the backend
- Install dependencies using yarn
- Start the development server

## Usage
### Accessing the API
- Backend (NestJS): `http://localhost:49001`

## Contribution
1. Fork the project
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Create a Pull Request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors
Julien Coppin (coppinj)
