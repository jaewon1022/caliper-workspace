"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

class ReadWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  async initializeWorkloadModule(
    workerIndex,
    totalWorkers,
    roundIndex,
    roundArguments,
    sutAdapter,
    sutContext
  ) {
    await super.initializeWorkloadModule(
      workerIndex,
      totalWorkers,
      roundIndex,
      roundArguments,
      sutAdapter,
      sutContext
    );

    for (let i = 1; i <= this.roundArguments.assets; i++) {
      let txArgs = {
        contractId: "chaincode-go",
        contractFunction: "Invoke",
        invokerIdentity: "user1",
        contractArguments: ["createAsset", `product-${i}`, "100", "10000"],
        readOnly: false,
      };

      await this.sutAdapter.sendRequests(txArgs);
    }
  }

  async submitTransaction() {
    const randomId = Math.floor(Math.random() * this.roundArguments.assets) + 1;

    let txArgs = {
      contractId: "chaincode-go",
      contractFunction: "Invoke",
      invokerIdentity: "user1",
      contractArguments: ["queryAsset", `product-${randomId}`],
      readOnly: true,
    };

    return this.sutAdapter.sendRequests(txArgs);
  }

  async cleanupWorkloadModule() {
    for (let i = 1; i <= this.roundArguments.assets; i++) {
      const assetId = `product-${i}`;
      let txArgs = {
        contractId: "chaincode-go",
        contractFunction: "Invoke",
        invokerIdentity: "user1",
        contractArguments: ["deleteAsset", assetId],
        readOnly: false,
      };

      await this.sutAdapter.sendRequests(txArgs);
    }
  }
}

function createWorkloadModule() {
  return new ReadWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
