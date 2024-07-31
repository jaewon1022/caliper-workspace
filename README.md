# TPS Testing workspace with Caliper

##### Caliper verison 0.6.0

##### Fabric verison 1.4

##### node version : 10.24.1

##### npm version : 6.14.12

```
caliper-workspace/
├── benchmarks
│   └── myAssetBenchmark.yaml
├── generated
│   ├── user1.json
│   ├── user.key
│   └── user.pem
├── networks
│   └── networkConfig.yaml
├── node_modules
│   └── // ...
├── workloads
│   ├── read.js
│   └── write.js
├── .gitignore
├── connection_property_peer-msp.json
├── package-lock.json
├── package.json
├── README.md
└── report.html
```

### Hyperledger Caliper Public Document examples

[create a caliper workspace](https://hyperledger.github.io/caliper/v0.6.0/fabric-tutorial/tutorials-fabric-existing/#step-1---create-a-caliper-workspace)

### TPS Checking References

[Network](https://hyperledger.github.io/caliper/v0.6.0//fabric-config/new/#network-configuration-file-reference)

[Workload](https://hyperledger.github.io/caliper/v0.6.0/workload-module/)

[Benchmark](https://hyperledger.github.io/caliper/v0.6.0/bench-config/)

This project has created for checking PixelTerior's ChainCode TPS with [Naver Cloud Platform Blockchain Service](https://console.ncloud.com/blockchain-service).
