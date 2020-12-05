
![Example](https://i.imgur.com/AzHdNdu.png)


---

Raise multiple domains in a very simple way


## Installation 
### Step 0
Get the repository

    git clone https://github.com/hugojerez/node-ez-multidomain
    cd node-ez-multidomain

### Step 1
The first step is to create the files```cert.pem``` and ```key.pem``` , it is necessary to apply the SSL security protocol

    openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
### Step 2
Install  dependencies with ```npm``` or ```yarn```

    npm i install


## How it works 

If my domain is ```foo.com``` and my script points to port ```3000```, I must create a folder with the name ```hello.com_3000```

The schema is: domain + underscore + port

An example of implementation 

Note: ```node-ex-multidomain/```must be in the same parent folder, as seen in the image

![another example](https://i.imgur.com/ncshIRS.png)
## The final step

    npm run start

### Optional

You can use a pm2 script to handle this service 

_Note: If you create/modify/delete a folder pointing to a domain _ port You will have to restart the service_

