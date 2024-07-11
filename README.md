# ALOHA-EARN-CLIENTAPP #

This is Docker based MERN application so we need to setup some prerequisites.

### Prerequisites ###

* [Docker (ubuntu)](https://docs.docker.com/install/linux/docker-ce/ubuntu)
* [Docker (mac)](https://docs.docker.com/docker-for-mac/install)

### How do I get set up? ###
* First of all make sure your docker is working without sudo user. If not then please check the [steps](https://docs.docker.com/install/linux/linux-postinstall/) to setup that properly
* Setup directory structure:
    * Create /Users/$USER/Documents/Projects/nri/ae-app-client
    * Api server /Users/$USER/Documents/Projects/nri/ae-app-client
    * If you already have repo then move them in the above structure or copy paste them in above structure.
    * Main-clientapp (api server)
        * (repo: ssh://git-codecommit.us-west-2.amazonaws.com/v1/repos/ae-app-client)ß

* Setup api server.
    * cd /Users/$USER/Documents/Projects/nri/ae-app-client and run below command
    * docker build -t "ubuntu18:ae-app-client" .
    * docker run -it --name ae-app-client -p 4000:4000 -v "/Users/$USER/Documents/Projects/nri/ae-app-client:/var/www/apiserver" "ubuntu18:ae-app-client"
    * If npm not install or you have cloned fresh repo then run next comand: "npm install" when done exit from this container


* Start apps
    * To start apiserver
        * docker attach ae-app-client
        * npm start

* To start api test cases
    * For api server
        * Start api server
        * npm run test

* To start and stop all apps just use shell scripts within nri folder.
    * ./startapp.sh
    * ./stopapp.sh


* Deploy on dev server
    * We need to push the dev branch and it will start dev server deployment

* Deploy on prod server
    * We need to push the master branch and it will start prod server deployment


### Who do I talk to? ###

* Contact to Repo owner or admin (adalsingh.it@gmail.com)%