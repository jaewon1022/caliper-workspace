"use strict";

const { WorkloadModuleBase } = require("@hyperledger/caliper-core");

class WriteWorkload extends WorkloadModuleBase {
  constructor() {
    super();
  }

  // initialize items for using in submitTransaction
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

  // actual workload for the test
  async submitTransaction() {
    const randomId = Math.floor(Math.random() * this.roundArguments.assets) + 1;

    let txArgs = {
      contractId: "chaincode-go",
      contractFunction: "Invoke",
      invokerIdentity: "user1",
      contractArguments: ["deleteAsset", `product-${randomId}`],
      readOnly: false,
    };

    return this.sutAdapter.sendRequests(txArgs);
  }

  // cleanup after the workload is done
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

// create the workload module
function createWorkloadModule() {
  return new WriteWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
