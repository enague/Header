const axios = require("axios");
const mockLocationsData = require("./mockLocationsData.json");
const mockHostelData = require("./mockHostelData.json");

const mongoose = require("mongoose");

mongoose.connect("mongodb://<user>:<password>@ds163300.mlab.com:63300/header");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.once("open", () => console.log("db connected successfully"));



const hostelSchema = mongoose.Schema({
	id: Number,
	location_id: Number,
	hostel_name: String,
	street_name: String,
	features: Array,
	photos: Array
});

const Hostel = mongoose.model("Hostel", hostelSchema);

const makeHostel = container => {
	for (let i = 0; i < mockHostelData.length; i += 1) {
		const currentHostel = mockHostelData[i];
		const newHostel = new Hostel({
			id: currentHostel.id,
			location_id: currentHostel.location_id,
			hostel_name: currentHostel.hostel_name,
			street_name: currentHostel.street_name,
			features: currentHostel.features,
			photos: container
		});

		newHostel.save((err, product) => {
			if (err) throw err;
		});
	}
};

const getAPIPhotos = () => {
	axios
		.get(
			"https://api.unsplash.com/search/photos?per_page=30&query=travel&client_id=54008d4032d0467ec44b27e6e2ab76efbf4e6b8a449cd18ea4bf29ca9946620c"
		)
		.then(response => {
			const res = response.data.results.splice(1, 6);
			const container = [];
			res.forEach(photo => {
				container.push(photo.urls.regular);
			});
			makeHostel(container);
		});
};

Hostel.count((error, count) => {
	if (count === 0) {
		getAPIPhotos();
	} else {
		console.log("your database has your hostels collection");
	}
});

const locationSchema = mongoose.Schema({
	id: Number,
	city: String,
	country: String,
	country_code: String,
	hostels: Array
});

const Location = mongoose.model("Location", locationSchema);

const makeLocation = () => {
	for (let i = 0; i < mockLocationsData.length; i += 1) {
		const current = mockLocationsData[i];
		const newLocation = new Location({
			id: current.id,
			city: current.city,
			country: current.country,
			country_code: current.country_code,
			hostels: current.hostels
		});

		newLocation.save((err, product) => {
			if (err) throw err;
		});
	}
};

Location.count((error, count) => {
	if (count === 0) {
		makeLocation();
	} else {
		console.log("your database has locations collection");
	}
});

module.exports.Hostel = Hostel;
module.exports.Location = Location;
