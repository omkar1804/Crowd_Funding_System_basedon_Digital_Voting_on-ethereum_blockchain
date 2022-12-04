import React, { useEffect, useState } from "react";
import factory from "../../factory";
import web3 from "../../web3";

import {
  Container,
  Header,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Card,
} from "semantic-ui-react";

function Home() {
  const [campaigns, setcampaigns] = useState([]);
  const [currentAcc, setcurrentAcc] = useState();

  const getCampaigns = async () => {
    const camps = await factory.methods.getDeployedContracts().call();
    setcampaigns(camps);
    console.log(campaigns);

    getCurrentAccount();
  };

  const getCurrentAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setcurrentAcc(accounts[0]);
  };

  const createCampaign = async (e) => {
    e.preventDefault();
    alert(currentAcc);
    await factory.methods
      .createCampaign("1")
      .send({ from: currentAcc, gas: 3000000 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getCampaigns();
    // window.location.reload();
  };

  window.ethereum.on("accountsChanged", getCurrentAccount);

  useEffect(() => {
    getCampaigns();
  }, []);
  return (
    <div>
      <Container
        style={{
          backgroundColor: "#04c8bb",
          padding: "1rem 0rem",
          height: "100vh",
        }}
        fluid
      >
        <Container
          style={{
            padding: "1rem",
            backgroundColor: "#1f2833",
            margin: "2rem 0rem",
          }}
        >
          <Header style={{ color: "#66fcf1", fontSize: "40px" }}>
            CrowdFund Campaign
          </Header>
          <Container
            style={{
              margin: "2rem 0rem",
              height: "70vh",
              padding: "1.5rem",
            }}
          >
            <Header
              textAlign="left"
              style={{ color: "#66fcf1", fontSize: "25px" }}
            >
              Open Campaigns
            </Header>
            <Grid divided>
              <GridRow>
                <GridColumn
                  width={12}
                  textAlign="left"
                  style={{ height: "55vh" }}
                >
                  <Card.Group>
                    {campaigns.length ? (
                      campaigns.map((m, i) => (
                        <Card
                          fluid
                          color="teal"
                          style={{
                            padding: "1rem",
                          }}
                          key={i}
                        >
                          <Card.Header
                            style={{
                              color: "#1f2833",
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginBottom: "1rem",
                            }}
                          >
                            {m}
                          </Card.Header>

                          <Card.Description>
                            <Button
                              style={{
                                backgroundColor: "#66fcf1",
                                color: "#1f2833",
                                border: "1px solid #1f2833",
                              }}
                            >
                              View Campaign
                            </Button>
                          </Card.Description>
                        </Card>
                      ))
                    ) : (
                      <Container
                        textAlign="center"
                        style={{
                          height: "55vh",
                          color: "#66fcf1",
                          border: "2px dashed #66fcf1",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "20px",
                        }}
                      >
                        No campaigns registered till now!!
                      </Container>
                    )}
                  </Card.Group>
                </GridColumn>

                <GridColumn width={4} textAlign="center">
                  <Button
                    style={{ backgroundColor: "#66fcf1", color: "#1f2833" }}
                    onClick={(e) => {
                      createCampaign(e);
                    }}
                  >
                    Create Campaign
                  </Button>
                </GridColumn>
              </GridRow>
            </Grid>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default Home;
