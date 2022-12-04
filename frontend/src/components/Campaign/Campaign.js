import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Header,
  Button,
  Grid,
  GridRow,
  GridColumn,
  Card,
  Input,
} from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import web3 from "../../web3";
import camp_abi from "../../campaign";

function Campaign() {
  const location = useLocation();
  const inputRef = useRef();

  const [manager, setmanager] = useState("");
  const [minAmount, setminAmount] = useState(0);
  const [approvers, setapprovers] = useState();
  const [requests, setrequests] = useState();
  const [balance, setbalance] = useState(0);
  const [currentAcc, setcurrentAcc] = useState();
  const [input, setinput] = useState();

  const getStats = async () => {
    const camp = new web3.eth.Contract(camp_abi, location.state.data);
    const manager_address = await camp.methods.manager().call();
    const min_amt = await camp.methods.minimumAmount().call();
    const approve = await camp.methods.approversCount().call();
    const request = await camp.methods.numRequests().call();
    const balnc = await web3.eth.getBalance(location.state.data);

    setmanager(manager_address);
    setminAmount(min_amt);
    setapprovers(approve);
    setrequests(request);
    setbalance(balnc);

    getCurrentAccount();
  };

  const getCurrentAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setcurrentAcc(accounts[0]);
  };

  const contribute = async () => {
    // e.preventDefault();
    const camp = new web3.eth.Contract(camp_abi, location.state.data);
    alert(input);
    await camp.methods
      .contribute()
      .send({
        from: currentAcc,
        value: Number(input),
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  window.ethereum.on("accountsChanged", getCurrentAccount);

  useEffect(() => {
    getStats();
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
            CrowdFund
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
              {location.state.data}
            </Header>
            <Grid divided>
              <GridRow>
                <GridColumn
                  width={11}
                  textAlign="left"
                  style={{ height: "55vh" }}
                >
                  <Card.Group>
                    <Card>
                      <Card.Content>
                        <Card.Header
                          style={{ width: "100%", wordWrap: "break-word" }}
                        >
                          {manager}
                        </Card.Header>
                        <Card.Meta>Manager of campaign</Card.Meta>
                        <Card.Description>
                          Manager is the person who deployed this contract.
                        </Card.Description>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>{minAmount}</Card.Header>
                        <Card.Meta>
                          Minimum Amount to contribute to the contract.
                        </Card.Meta>
                        <Card.Description>
                          Matthew is a pianist living in Nashville.
                        </Card.Description>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>{requests}</Card.Header>
                        <Card.Meta>Total number of requests</Card.Meta>
                        <Card.Description>
                          Matthew is a pianist living in Nashville.
                        </Card.Description>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>{approvers}</Card.Header>
                        <Card.Meta>Total number of approvers</Card.Meta>
                        <Card.Description>
                          Matthew is a pianist living in Nashville.
                        </Card.Description>
                      </Card.Content>
                    </Card>
                    <Card>
                      <Card.Content>
                        <Card.Header>{balance}</Card.Header>
                        <Card.Meta>Total balance of the contract</Card.Meta>
                        <Card.Description>
                          Matthew is a pianist living in Nashville.
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                  <br />
                  <Button
                    style={{ backgroundColor: "#66fcf1", color: "#1f2833" }}
                    onClick={(e) => {}}
                  >
                    View Requests
                  </Button>
                </GridColumn>

                <GridColumn width={5} textAlign="center">
                  <Input
                    focus
                    placeholder="Enter amount to contribute in ethers!"
                    type="number"
                    onChange={(e) => {
                      setinput(e.target.value);
                    }}
                    fluid
                  />
                  <br />
                  <Button
                    style={{ backgroundColor: "#66fcf1", color: "#1f2833" }}
                    onClick={contribute}
                  >
                    Contribute!!
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

export default Campaign;
