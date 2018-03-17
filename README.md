### 1 you need to clone this repository
$ git clone https://github.com/KhokhlovAnton/ng_sn.git

### 2 when clone will be complited, enter in GitBash
$ npm run start

### 3 when it will be complited yuo should see something like this
> http-server -a localhost -p 51186 -c-1 ./
Starting up http-server, serving ./
Available on:
  http://localhost:51186

##### you can change port as you wish in package.json.

Now in your browser visit [localhost:51186](http://localhost:51186/)
* You will see authorization form [login](https://github.com/KhokhlovAnton/ng_sn/blob/master/img/login.png "Login form"). I use [angular-base64](https://www.npmjs.com/package/angular-base64) to create basic authorization
* also you should enter instance url

if you enter correct data you will see dashboard. [dashboard](https://github.com/KhokhlovAnton/ng_sn/blob/master/img/dashboard.png "dashboard")
detail view [details](https://github.com/KhokhlovAnton/ng_sn/blob/master/img/details.png "Detail")

points of test task
- [x] connect to serviceNow and receive answer - done
- [x] show KPI - done
- [x] show list of incidents - done
- [x] on click show incident details - done
