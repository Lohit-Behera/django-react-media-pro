# Media Pro

## Overview

The Image Enhancement and Recognition Platform is a comprehensive web application that allows users to upload images and perform various enhancement and recognition tasks. Leveraging state-of-the-art image processing and machine learning techniques, the platform offers functionalities such as image upscaling, background removal, filtering, and object recognition.

## Features

- Image enhancement:
  - Upscaling using OpenCV ESPCN model
  - Background removal and blurring using rembg
  - Image filtering (e.g., enhance, add saturation, grayscale) using pillow
  - Format conversion and downsizing using pillow
- Object recognition:
  - Recognizes animals and food items from uploaded images using PyTorch models

## Tech Stack

- Backend: Django REST Framework
- Frontend: React.js
- Image Processing Libraries: OpenCV, pillow
- Object Recognition Framework: PyTorch

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in Backend

`SECRET_KEY`

`EMAIL_HOST_USER`
`EMAIL_HOST_PASSWORD`

`USER`
`PASSWORD`
`HOST`
`PORT`

## Installation

Clone the repository:

```bash
  git clone https://github.com/Lohit-Zeno/eshop.git

```

Navigate to the project directory:

```bash
  cd django-react-media-pro
```

Create Python virtual environment using [virtualenv](https://virtualenv.pypa.io/en/latest/):

```bash
  pip install virtualenv
```

```bash
  python -m venv myenv
```

```bash
  myenv\Scripts\activate
```

install python libraries

```bash
  cd backend
```

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  python manage.py runserver
```

In another terminal for React js

```bash
  cd django-react-media-pro
  cd frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
