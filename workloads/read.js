"use strict";

const { WorkloadModuleInterface } = require("@hyperledger/caliper-core");

class ReadWorkload extends WorkloadModuleInterface {
  constructor() {
    super();
    this.workerIndex = -1;
    this.totalWorkers = -1;
    this.roundIndex = -1;
    this.roundArguments = undefined;
    this.sutAdapter = undefined;
    this.sutContext = undefined;
  }

  async initializeWorkloadModule(
    workerIndex,
    totalWorkers,
    roundIndex,
    roundArguments,
    sutAdapter,
    sutContext
  ) {
    this.workerIndex = workerIndex;
    this.totalWorkers = totalWorkers;
    this.roundIndex = roundIndex;
    this.roundArguments = roundArguments;
    this.sutAdapter = sutAdapter;
    this.sutContext = sutContext;
  }

  async submitTransaction() {
    let txArgs = {
      contractId: "chaincode-go",
      contractFunction: "Invoke",
      invokerIdentity: "user1",
      contractArguments: ["queryUser", "user1"],
      readOnly: true,
    };

    return this.sutAdapter.invokeSmartContract(
      "chaincode-go",
      "v0.1.0",
      txArgs,
      30
    );
  }

  async cleanupWorkloadModule() {
    // Do nothing
  }
}

function createWorkloadModule() {
  return new ReadWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
