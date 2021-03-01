import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

export default function Sidebar() {

    const [currencies, setCurrencies] = useState([])

    useEffect(() => {
        const getCurrencies = async () => {
            const res = await axios.get("https://api.exchangeratesapi.io/latest")
            const data = await res.data.rates
            const arrData = Object.keys(data)

            setCurrencies(arrData)
        }

        getCurrencies()

    }, [])
    return (
        <div >
            <ul className="h-64 grid grid-rows-3 grid-flow-col gap-4 text-center border shadow-sm mt-2 rounded-md border-gray-200 my-3">

            {
                currencies.map((e, i) => {
                    return(
                        <li className="border shadow-sm mt-2 rounded-md border-gray-200 my-3 text-center">
                            <Link to={`/${e}`}>
                                {e}
                            </Link>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
}
