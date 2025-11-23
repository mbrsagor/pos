# Point of sales (POS)

> This application is a Point of Sale (POS) system designed to help business owners efficiently manage their shop or store. With proper use, it simplifies daily operations, improves accuracy, and makes overall management easier.


The following steps will walk you through installation on a Mac. Linux should be similar. It's also possible to develop on a Windows machine, but I have not documented the steps but you may run the project as docker.


### Setup:

```bash
git clone ...
cd pos
npm install
npm run dev
```

###### If you got error bootstrap related you may run this command like this:
```bash
npm install react-bootstrap bootstrap
```

> If you want to build the application here is the command:

```bash
npm run build
```

#### To Dockerize application


```bash
docker build -t pos .
docker run -d -p 5173:80 pos
```
