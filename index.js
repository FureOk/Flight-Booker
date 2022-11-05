const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const fs = require("fs");
const { userInfo } = require("os");

const app = express();

app.use(json());
app.use(express.urlencoded());

app.use("/", routes);

// adding a new flight
app.post('/flights', (req, res) => {
  console.log(req.body.bookFlight)

  flights.push(req.body.bookFlight);
  
  let stringData = JSON.stringify(flights, null, 2);
  fs.writeFile('flights', stringData, (err, data) => {
    if (err) {
      return res.status(500).json({ message: err })
    }
  })
  return res.status(200).json({message: 'Your flight has been booked successfully!'})
});

// getting all the flights
app.get ('/flights', (req, res) => {
  return res.json({ flights })
});


// getting one flight 
app.get('/flights/:id', (req, res) => {
  let flightId = req.params.id;

  let flightTag = flights.find(flight => {
    return String(flight.id) === flightId
  });

  if(flightTag) {
  return res.status(200).json({flight: flightTag});
  } else {
    return res.status(404).json({message: 'We cannot find this flight.'});
  }

});

// updating a flight
app.put('/flights', (req, res) => {
  let flightId = req.params.id;

  let flightTag = flights.find(flight => {String(flight.id) === flightId });
  
  if(flightTag) {
  res.status(200).json({message: 'Flight Details Updated'})
  const {time, price} = req.body;
  flight.time = time
  flight.price = price
  } else {
    res.status(500).json({message: 'An error occured.'})
  }
});

// deleting flight
app.get('/flights', (req, res) => {
  let flightId = req.params.id;

  let flightTag = flights.find(flight => {String(flight.id) === flightId });
  if(flightTag) {
    flights.splice(flights.indexOf(flight), 1);
    res.status(200).json({message : 'Flight Deleted.'})
  } else {
    return res.status(404).json({message: 'Flight not deleted.'})
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
