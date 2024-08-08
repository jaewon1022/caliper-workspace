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
      const assetId = `${this.workerIndex}-${i}`;
      console.log(
        `Creating asset "${this.workerIndex}-${i}" by workerNode ${workerIndex}`
      );

      let txArgs = {
        contractId: this.roundArguments.contractId,
        contractFunction: "createAsset",
        invokerIdentity: "user1",
        contractArguments: [assetId, "100", "10000"],
        readOnly: false,
      };

      await this.sutAdapter.sendRequests(txArgs);
    }
  }

  // actual workload for the test
  async submitTransaction() {
    const randomId = Math.floor(Math.random() * this.roundArguments.assets) + 1;

    const assetSet = [
      { price: "10", totalStock: "100000" },
      { price: "20", totalStock: "50000" },
      { price: "40", totalStock: "25000" },
      { price: "50", totalStock: "20000" },
      { price: "100", totalStock: "10000" },
      { price: "200", totalStock: "5000" },
    ];

    const randomAsset = assetSet[Math.floor(Math.random() * assetSet.length)];

    // 현재 버전을 가져오기 위해 자산 상태 조회
    let assetId = `${this.workerIndex}-${randomId}`;

    let txArgs = {
      contractId: this.roundArguments.contractId,
      contractFunction: "updateAsset",
      invokerIdentity: "user1",
      contractArguments: [assetId, randomAsset.price, randomAsset.totalStock],
      readOnly: false,
    };

    return this.sutAdapter.sendRequests(txArgs);
  }

  // cleanup after the workload is done
  async cleanupWorkloadModule() {
    for (let i = 1; i <= this.roundArguments.assets; i++) {
      const assetId = `${this.workerIndex}-${i}`;

      console.log(
        `Deleting asset "${assetId}" by workerNode ${this.workerIndex}`
      );

      let txArgs = {
        contractId: this.roundArguments.contractId,
        contractFunction: "deleteAsset",
        invokerIdentity: "user1",
        contractArguments: [assetId],
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
