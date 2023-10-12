# Task Management System

a system to keep track of your tasks

## Setup

To run this command make sure docker is installed in your system

- switch to directory TMS
- `docker-compose up --build`
- either use postman or open swagger-ui in browser via
  [swagger-ui](http://localhost:3000/api-docs/#/) on url http://localhost:3000/api-docs/#/

## Technology Used

- NodeJs
- TypeScript
- ExpressJs
- Postgres
- Swagger
- Docker

# Tasks API Documentation

## Introduction

This documentation provides details on the Tasks API, which allows you to manage tasks and retrieve task metrics. The API is designed to be used in applications that require task tracking and management functionality.

### Tags

- [Tasks](#tasks)
- [Tasks Metrics](#tasks-metrics)
- [Populate](#populate)

## Tasks

### Find All Tasks

- **Method**: GET
- **Summary**: Retrieve a list of all tasks.
- **Parameters**:
  - `page` (query, optional) - Page number for pagination.
  - `limit` (query, optional) - Number of items per page.
- **Responses**:
  - `200` - Successful response.
  - `500` - Server Error.
- **Example**:
  - localhost:3000/tasks
  - localhost:3000/tasks?page=2&limit=5
  - localhost:3000/tasks?page=3&limit=1

### Add Task

- **Method**: POST
- **Summary**: Create a new task.
- **Parameters**:
  - `body` (request body, required) - Task data to create.
- **Responses**:
  - `201` - Task created successfully.
  - `400` - Bad Request.
  - `409` - Conflict.
  - `500` - Server Error.
- **Example**:
  - localhost:3000/tasks with body
  ```
  {
    "title": "add beep",
    "status": "OPEN"
  }
  ```

### Find Task By ID

- **Method**: GET
- **Summary**: Retrieve a task by ID.
- **Parameters**:
  - `id` (path, required) - Task ID.
- **Responses**:
  - `200` - Successful response.
  - `409` - Conflict.
  - `500` - Server Error.
- **Example**:
  - localhost:3000/tasks/1
  - localhost:3000/tasks/100

### Update Task By ID

- **Method**: PUT
- **Summary**: Update a task by ID.
- **Parameters**:
  - `id` (path, required) - Task ID.
  - `body` (request body, required) - Task data to update.
- **Responses**:
  - `200` - Successful response.
  - `400` - Bad Request.
  - `409` - Conflict.
  - `500` - Server Error.
  - localhost:3000/tasks with body
  ```
  {
    "title": "add light",
    "status": "COMPLETED"
  }
  ```

### Delete Task By ID

- **Method**: DELETE
- **Summary**: Delete a task by ID.
- **Parameters**:
  - `id` (path, required) - Task ID.
- **Responses**:
  - `200` - Successful response.
  - `409` - Conflict.
  - `500` - Server Error.
- **Example**:
  - localhost:3000/tasks/1
  - localhost:3000/tasks/100

## Tasks Metrics

### Get Tasks Metrics

- **Method**: GET
- **Summary**: Retrieve task metrics.
- **Responses**:
  - `200` - Successful response.
  - `500` - Server Error.
- **Example**:
  - localhost:3000/tasks/metrics

## Populate

### Populate Table with Fake Data

- **Method**: POST
- **Summary**: Populate the task table with 15 fake data with random date
- **Responses**:
  - `200` - Successful response.
  - `500` - Server Error.
- **Example**:
  - localhost:3000/tasks/populate

## Definitions

### tasks

- **Type**: Object
- **Required Fields**: `title`
- **Properties**:
  - `title` (String) - Title of tasks.
  - `status` (String) - Status of the task (should match the TaskStatus enum values).
    - OPEN
    - IN_PROGRESS
    - COMPLETED

## Schemes

- HTTP
