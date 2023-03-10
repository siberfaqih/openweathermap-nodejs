import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
// import styles from '../styles/Home.module.css'
import {useState} from 'react';
import axios from 'axios'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [keyword, setKeyword] = useState(null);
  const [response, setResponse] = useState(null);
  
  const getWeather = async () => {
		try {
			const res = await axios.get('api/search/', {
				params: {keyword}
			});
			const {data} = res;
			setResponse(data); // Store the response
      // const icon = reponse.weather[0].icon;
      // const image = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
 
		} catch (error) {
			console.log(error);
		}
	};

  
  return (
    <>
      <Head>
        <title>Real Time Weather Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Muhammad Faqih" />
        <meta name="NIM" content="2020230032" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
          <div>
            <h1>City Weather Data</h1>
          </div>

          <div>
            <form
              onSubmit={e => {
                getWeather();
                e.preventDefault();
                e.stopPropagation();
              }}
              >
              <input 
                placeholder='Bekasi'
                type="text" 
                className="me-3"
                onChange={e => {
                  setKeyword(e.target.value);
                  setResponse(null);
                }}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
           </form>
          </div>

          {response && (
            <div>
              <table className="table mt-5 table-primary">
                <tbody>
                  <tr>
                    <td className="text-center" colspan="2">
                      <Image
                        src={`https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`}
                        alt={response.weather[0].description}
                        width="100"
                        height="100"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">Temperature</th>
                    <td>{response.main.temp}</td>
                  </tr>
                  <tr>
                    <th scope="col">Description</th>
                    <td>{response.weather[0].description}</td>
                  </tr>
                  <tr>
                    <th scope="col">Humidity</th>
                    <td>{response.main.humidity}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}    
          
        </div>

        <div className="mt-10 text-center">
          <p className="text-primary text-xs font-light">
            Made by siberfaqih -{" "}
            <a
              target="_blank"
	      rel="noreferrer"
              className="hover:text-active"
              href="https://github.com/siberfaqih/"
            >
              See my github
            </a>
          </p>
        </div>
      </main>

       

    </>
  )
}
