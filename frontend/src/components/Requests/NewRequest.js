import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Table,
  Button,
  Form,
  Checkbox,
} from "semantic-ui-react";
import { useLocation, useNavigate } from "react-router-dom";
import web3 from "../../web3";
import camp_abi from "../../campaign";

function NewRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const [desc, setdesc] = useState();
  const [val, setval] = useState();
  const [recp, setrecp] = useState();
  const [currentAcc, setcurrentAcc] = useState();

  const createNewRequest = async (e) => {
    e.preventDefault();
    const camp = new web3.eth.Contract(camp_abi, location.state.data);
    await camp.methods
      .createRequest(desc, val, recp)
      .send({ from: currentAcc, gas: 3000000 })
      .then((res) => {
        console.log(res);
        navigate("/request", { state: { data: location.state.data } });
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
    getCurrentAccount();
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
            <div
              style={{
                width: "50%",
                margin: "5% 25%",
                padding: "2rem",
                backgroundColor: "#66fcf1",
                borderRadius: "10px",
              }}
            >
              <Form>
                <Form.Field>
                  <label
                    style={{
                      color: "#1f2833",
                      fontSize: "18px",
                      textAlign: "left",
                    }}
                  >
                    Description
                  </label>
                  <input
                    placeholder="Enter Description"
                    value={desc}
                    onChange={(e) => setdesc(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label
                    style={{
                      color: "#1f2833",
                      fontSize: "18px",
                      textAlign: "left",
                    }}
                  >
                    Value
                  </label>
                  <input
                    placeholder="Enter the value "
                    value={val}
                    onChange={(e) => setval(e.target.value)}
                  />
                </Form.Field>
                <Form.Field>
                  <label
                    style={{
                      color: "#1f2833",
                      fontSize: "18px",
                      textAlign: "left",
                    }}
                  >
                    Recipient
                  </label>
                  <input
                    placeholder="Enter the recipient's address"
                    value={recp}
                    onChange={(e) => setrecp(e.target.value)}
                  />
                </Form.Field>
                <br />
                <Button
                  style={{ backgroundColor: "#1f2833", color: "#66fcf1" }}
                  onClick={(e) => {
                    createNewRequest(e);
                  }}
                  type="submit"
                >
                  Add Request
                </Button>
              </Form>
            </div>
          </Container>
        </Container>
      </Container>
    </div>
  );
}

export default NewRequest;
