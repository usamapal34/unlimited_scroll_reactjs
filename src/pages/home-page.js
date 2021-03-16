import React, { Component } from "react";
import { Header, Spinner, PassengerDataCard } from "../components";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import passengersApi from "../apis/passengers-api";

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      page: -1,
      pageSize: 20,

      fetchingPassengers: false,
      passengersFetched: false,
      passengers: [],
    };
    this.passengerCardsContainerRef = React.createRef();
  }

  componentDidMount() {
    const { page, pageSize } = this.state;
    this.fetchPassengers(page + 1, pageSize);
  }

  fetchPassengers(page, pageSize) {
    this.setState({
      fetchingPassengers: true,
    });
    passengersApi.getPassengers(page, pageSize).then(
      (response) => {
        let passengers = this.state.passengers;
        if (response.data && response.data.length > 0) {
          const filteredResponse = response.data.filter((data) => {
            return data.name && data.name !== "" && data.name !== " ";
          });
          passengers = [...passengers, ...filteredResponse];
          this.setState({
            page: page,
            fetchingPassengers: false,
            passengersFetched: true,
            passengers: passengers,
          });
        } else {
          this.setState({
            fetchingPassengers: false,
            passengersFetched: false,
            passengers: passengers,
          });
        }
      },
      (error) => {
        console.log(error.message);
        this.setState({
          fetchingPassengers: false,
          passengersFetched: false,
        });
      }
    );
  }

  mouseOverPassengerCardsContainer(e) {
    this.passengerCardsContainerRef.current.style.backgroundColor =
      "rgb(240, 240, 240)";
  }

  mouseLeavePassengerCardsContainer(e) {
    this.passengerCardsContainerRef.current.style.backgroundColor = "white";
  }

  renderPassengers(passengers) {
    const { fetchingPassengers, page, pageSize } = this.state;

    return (
      <Paper
        style={{
          height: `${window.innerHeight - 100}px`,
          overflow: "auto",
          padding: "20px",
        }}
        ref={this.passengerCardsContainerRef}
        onMouseOver={(e) => this.mouseOverPassengerCardsContainer(e)}
        onMouseLeave={(e) => this.mouseLeavePassengerCardsContainer(e)}
      >
        {passengers.map((passenger, index) => {
          return (
            <PassengerDataCard
              key={index}
              index={index}
              passenger={passenger}
            />
          );
        })}
        {fetchingPassengers && this.state.passengers.length > 0 ? (
          <Spinner />
        ) : (
          ""
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.fetchPassengers(page + 1, pageSize)}
        >
          Load More
        </Button>
      </Paper>
    );
  }

  render() {
    const { fetchingPassengers, passengersFetched, passengers } = this.state;
    return (
      <div>
        <Header />
        {fetchingPassengers && passengers.length === 0 ? (
          <Spinner />
        ) : (
          this.renderPassengers(passengers)
        )}
      </div>
    );
  }
}

export default HomePage;
