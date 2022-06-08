# serverless-lambda-functions

-------------------------------------------AWS LAMBDA-----------------------------------------

AWS Lambda is an event-driven, serverless computing platform that executes your code in response to events. It manages the underlying infrastructure scaling it up or down to meet the event rate. You're only charged for the time your code is executed.

Serverless relies on CloudFormation to do the provisioning.
Serverless doesn’t mean an absence of servers, because there actually are servers. It only means the burden of managing these servers is taken away from you.

This project is based on the aws lambda functions using nodejs, serverless technology and mongoDb as a database.

We are going to need three things to work with this tutorial:

AWS Lambda MongoDB Atlas Node.js/npm installed on your local machine (>= v12.x.x)

Go to AWS and create a user with the AdministrationAccess. Download the aws accesskey and secretKey.

Go to MongodbAtlas and create free tire cluster.

next install--

    npm install -g serverless
    
and test using serverless (or) sls

configire serverless with the aws accesskey and secretKey.

open terminal and run--

  sls config credentials --provider aws --key <ACCESS_KEY> --secret <SECRET_KEY>
Note: If, for some reason you already had a AWS configured with the serverless package, you can always use overwrite -o flag in order to force the update the keys.

Next run the command --

    sls create -t aws-nodejs -p serverless-lambda-demo && cd serverless-lambda-demo
    
The -p flag will create a new directory with the name serverless-lambda-demo. The -t flag uses the pre-defined boilerplate.

------------------------------- To deploy ----------------------------------------

to deploy the functions:

                sls deploy
                
To download the serverless offline:

         npm install serverless-offline
         
In serverless.yml

plugins:
    - serverless-offline    
    
NOTE: This plugin must be in the root of serverless.yml

With the serverless offline plugin you can speed up local dev is by emulating AWS lambda and API Gateway locally when developing your Serverless project. i.e., runs on localhost:3000

    ----------------------Adding environment variables

    If you want to pass the environment variables from a .env file, you need to use the serverless-dotenv-plugin.
First, install the plugin as a development dependency:

        npm install serverless-dotenv-plugin --save-dev
        
You can then create a .env file in the root directory and add the environment variables to it.

STAGE=dev SECRET=**********

EG: provider: name: aws runtime: nodejs10.x stage: ${env:STAGE} region: eu-central-1 environment: SECRET: ${env:SECRET}

plugins:
    - serverless-dotenv-plugin

             
                    ----lambda cold start----
After a period of inactivity, your cloud provider will drop the container, and your function will become inactive, (a.k.a., cold).

A cold start happens when you execute an inactive function. The delay comes from your cloud provider provisioning your selected runtime container and then running your function

-- npm install serverless-plugin-warmup --save-dev

          plugins:
              - serverless-plugin-warmup
              
Add warmup: true property to all functions you want to be warm:

functions: hello: warmup: true
