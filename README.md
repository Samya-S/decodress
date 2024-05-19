# Decodress

Dress Decoded, Style Encoded - A full-stack E-commerce website built using `Next.js` and `MongoDB`.

The application is deployed at: https://decodress.vercel.app

## Table of Contents

- [Installation](#installation)
- [Defining environment variables](#defining-environment-variables)
- [Run the development environment](#run-the-development-environment)


## Installation

1. Clone the repository:

    ```bash
    git clone git@github.com:Samya-S/decodress.git
    ```
    `Make sure you have SSH keys setup in your machine`

2. Navigate to the project directory:

    ```bash
    cd decodress
    ```

3. Install dependencies:
   
   ```bash
   npm install
   ```
   or alternatively
   ```bash
   npm i
   ```
   
   `Make sure to have nodejs and npm installed`

## Defining environment variables

  ```bash
  MONGO_URI="<mongo db url>"
  HOSTING_DOMAIN="<hosting domain>"
  NEXT_PUBLIC_DOMAIN="<hosting domain>"
  JWT_SECRET="<jwt secret>"
  RZPAY_KEY_ID="<razorpay key id>"
  RZPAY_KEY_SECRET="<razorpay key secret>"
  NODEMAILER_AUTH_EMAIL="<nodemailer auth email>"
  NODEMAILER_AUTH_EMAIL_PASSWORD="<nodemailer auth email password>"
  ```

## Run the development environment

  ```bash
  npm run dev
  ```
