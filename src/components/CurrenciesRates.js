import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

import {Line} from 'react-chartjs-2'

export default function CurrenciesRates() {

    const [data, setData] = useState({})

    const [loading, setLoading] = useState(true)

    const [date, setDate] = useState({
        startDate: "2020-01-01",
        endDate: "2020-02-28"
    })

    const {currency} = useParams()

    useEffect(() => {
        const getRates = async (cur) => {
            const res = await axios.get(`https://api.exchangerate.host/timeseries?start_date=${date.startDate}&end_date=${date.endDate}&base=USD&symbols=${cur}`)

            const rates = await res.data.rates

            const labels = Object.keys(rates)

            const dataValues = Object.keys(rates).map((e) => {
                return rates[e][cur]
            })

            setData({
                labels: labels,
                datasets: [
                    {
                        label: "Tipo de cambio USD",
                        data: dataValues,
                        borderColor: "blue",
                        pointBackgroundColor: "red",
                        pointRadius: 5
                    }
                ]
            })

            setLoading(false)
        }

        getRates(currency)

    }, [currency, date])

    const handleDate = (e) => {
        setDate({
            ...date,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <div>
                <input
                type="date"
                onChange={(e) => {handleDate(e)}}
                value={date.startDate}
                name="startDate"
                className="inline-flex items-center px-3 my-4 py-2 max-h-12 border border-gray-200 rounded-md font-medium shadow-sm text-white bg-blue-700 hover:bg-gray-700"
                />
                <input
                type="date"
                onChange={(e) => {handleDate(e)}}
                value={date.endDate}
                name="endDate"
                className="inline-flex items-center px-3 my-4 py-2 max-h-12 border border-gray-200 rounded-md font-medium shadow-sm text-white bg-blue-700 hover:bg-gray-700"
                />
            </div>

            {
                loading ?
                <h1>Cargando...</h1>
                :

                <Line 
                    data={data}    
                />
            }
        </div>
    )
}
