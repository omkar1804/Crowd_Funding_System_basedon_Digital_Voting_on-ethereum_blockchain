import React, { useEffect, useState } from "react";
import { Container, Header, Table, Button } from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import web3 from "../../web3";
import camp_abi from "../../campaign";

function Request() {
  const location = useLocation();
  const navigate = useNavigate();
  const [approvers, setapprovers] = useState();
  const [requests, setrequests] = useState([]);
  const [currentAcc, setcurrentAcc] = useState();

  const getRequests = async () => {
    const camp = new web3.eth.Contract(camp_abi, location.state.data);
    const numReq = await camp.methods.numRequests().call();

    const approve = await camp.methods.approversCount().call();
    let cp;
    const req = await Promise.all(
      Array(numReq)
        .fill()
        .map((element, ind) => {
          console.log(ind);
          console.log(numReq);
          return camp.methods.requests(ind).call();
        })
    );
    setrequests(req);
    setapprovers(approve);
    console.log(req);
    getCurrentAccount();
  };

  const approveRequest = async (ind) => {
    const camp = new web3.eth.Contract(camp_abi, location.state.data);
    await camp.methods
      .approveRequest(ind)
      .send({ from: currentAcc, gas: 3000000 })
      .then((res) => {
        console.log(res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const finalizeRequest = async (ind) => {
    const camp = new web3.eth.Contract(camp_abi, location.state.data);
    await camp.methods
      .finalizeRequest(ind)
      .send({ from: currentAcc, gas: 3000000 })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentAccount = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setcurrentAcc(accounts[0]);
  };

  window.ethereum.on("accountsChanged", getCurrentAccount);

  useEffect(() => {
    getRequests();
  }, [1]);

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
              Requests
            </Header>
            <div style={{ textAlign: "right" }}>
              <Button
                style={{ backgroundColor: "#66fcf1", color: "#1f2833" }}
                onClick={() => {
                  navigate("/newRequest", {
                    state: { data: location.state.data },
                  });
                }}
              >
                New Request
              </Button>
            </div>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Amount</Table.HeaderCell>
                  <Table.HeaderCell>Recipient</Table.HeaderCell>
                  <Table.HeaderCell>Approval Count</Table.HeaderCell>
                  <Table.HeaderCell>Approve</Table.HeaderCell>
                  <Table.HeaderCell>Finalize</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {requests ? (
                  requests.map((e, i) => (
                    <Table.Row key={i} disabled={e.complete}>
                      <Table.Cell>{i}</Table.Cell>
                      <Table.Cell>{e.description}</Table.Cell>
                      <Table.Cell>{e.value}</Table.Cell>
                      <Table.Cell>{e.recipient}</Table.Cell>
                      <Table.Cell>
                        {e.approvalCount}/{approvers}
                      </Table.Cell>
                      <Table.Cell>
                        {e.complete ? null : (
                          <Button
                            color="green"
                            onClick={() => {
                              approveRequest(i);
                            }}
                          >
                            Approve
                          </Button>
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {e.complete ? null : (
                          <Button
                            color="blue"
                            onClick={() => {
                              finalizeRequest(i);
                            }}
                          >
                            Finalize
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <div></div>
                )}
              </Table.Body>
            </Table>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default Request;
