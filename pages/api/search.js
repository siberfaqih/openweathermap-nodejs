import axios from 'axios';
require('dotenv').config()

export default async function handler(req, res) {
    const units = "metric";
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.query.keyword}` + `&appid=${process.env.API_KEY}` + `&units=metric`;
	// const options = {
	// 	method: 'GET',
	// 	url: url,
	// };
	axios
		.get(url)
		.then(function (response) {
			res.status(200).json(response.data);
		})
		.catch(function (error) {
			res.status(500).json(error.response.data.payload);
		});
}