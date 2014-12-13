[Redis cluster demo on GCE](http://4890cf56-kelonye.node.tutum.io/)
---

Running locally
---

```bash
fig build or tutum build
fig up
fig scale node=6
fig up
```

Deploy using Tutum
---

- Sign up at [Tutum.co](http://tutum.co)
- Log into Tutum
- Click on the menu on the upper right corner of the screen
- Select Account info
- Select Api Key
- Link a custom node
- Set the following env vars appropriately:
  - TUTUM_USER
  - TUTUM_APIKEY
  - TUTUM_REDIS_CLUSTER_TEST_NODE_UUID (the custom node uuid)
- Install [tutum-deploy](https://github.com/kelonye/node-tutum-deploy) with:
  
```bash
npm install -g tutum-deploy
```

- Run `make deploy` to deploy the services
- Go to https://dashboard.tutum.co/node/cluster/list
- Select your new cluster and use the provided hostname to access the app
