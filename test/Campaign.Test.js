const Campaign = artifacts.require("Campaign");
const CampaignFactory = artifacts.require("CampaignFactory");

contract("CampaignFactory", (accounts) => {
  before(async () => {
    instance_factory = await CampaignFactory.new();
    await instance_factory.createCampaign("100");
    camp_address = await instance_factory.getDeployedContracts();
    // console.log(camp_address);
    instance_campaign = await Campaign.at(camp_address[0]);
  });

  it("deploys factory and campaign", async () => {
    assert.ok(instance_factory.address);
    // console.log(instance_campaign);
    assert.ok(instance_factory.address);
  });

  it("marks caller as manager of the campaign", async () => {
    const manager = await instance_campaign.manager();
    assert.equal(manager, accounts[0]);
  });

  it("marks a user as approver after contributing to the campaign", async () => {
    await instance_campaign.contribute({ value: "101", from: accounts[1] });
    const isApprover = await instance_campaign.approvers(accounts[1]);
    assert(isApprover);
  });

  it("require minimum amount of contribution", async () => {
    try {
      await instance_campaign.contribute({ value: "50", from: accounts[1] });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("allows a manager to make a request", async () => {
    await instance_campaign.createRequest("Buy batteries", 999999, accounts[1]);

    const request = await instance_campaign.requests(0);
    assert.equal("Buy batteries", request.description);
  });

  //run this test individually by commenting the above test cases
  it("process requests", async () => {
    await instance_campaign.contribute({
      value: web3.utils.toWei("10", "ether"),
      from: accounts[0],
    });

    await instance_campaign.createRequest(
      "Buy batteries",
      web3.utils.toWei("5", "ether"),
      accounts[1]
    );

    await instance_campaign.approveRequest(0);

    await instance_campaign.finalizeRequest(0);

    let balance = await web3.eth.getBalance(accounts[1]);
    let ether = await web3.utils.fromWei(balance, "ether");
    ether = parseFloat(ether);
    console.log(ether);
    assert(ether > 104);
  });
});
