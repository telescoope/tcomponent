import React, { useState, useEffect } from 'react'

import { defaultFilterData, secureData, setAuthHeader } from 'tcomponent'

import { useSelector, useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  const [list, setList] = useState([])

  const [dataSatu, setDataSatu] = useState([
    {
      value: 1,
      label: null
    },
    {
      value: 2,
      label: null
    },
    {
      value: 3,
      label: null
    },
    {
      value: 4,
      label: null
    },
    {
      value: 5,
      label: null
    }
  ])

  const filter = useSelector((state) => state.core.filter) || {}

  const auth = useSelector((state) => state.auth) || {}

  function onReload() {
    const { page, load, keyword, sorted, search } = defaultFilterData(
      filter,
      [],
      'slider'
    )

    const url = process.env.REACT_APP_API_URL + '/slider?'

    const options = {
      data: secureData({
        page,
        load,
        keyword,
        sorted,
        search
      }),
      method: 'POST',
      headers: setAuthHeader(auth),
      url
    }

    setLoading(true)

    axios(options)
      .then((response) => {
        setLoading(false)
        setList(response.data.data)
        // console.log(response.data)
      })
      .catch((error) => {
        setLoading(false)
        // console.log(error)
      })
  }

  useEffect(() => {
    setInterval(() => {
      dispatch({
        type: 'SET_INPUT',
        payload: {
          key: 'field',
          value: Math.floor(Math.random() * 101)
        }
      })

      dispatch({
        type: 'SET_INPUT',
        payload: {
          key: 'coba[221]',
          value: Math.floor(Math.random() * 101)
        }
      })
      setDataSatu([
        {
          value: Math.floor(Math.random() * 101),
          label: null
        },
        {
          value: Math.floor(Math.random() * 101),
          label: null
        },
        {
          value: Math.floor(Math.random() * 101),
          label: null
        }
      ])
    }, 5000)
  }, [])

  // console.log(dataSatu)

  function clearData() {
    dispatch({
      type: 'RESET_INPUT',
      payload: null
    })

    dispatch({
      type: 'RESET_PARAMETER',
      payload: null
    })

    dispatch({
      type: 'RESET_FILTER',
      payload: null
    })
  }

  return (
    <div style={{ padding: '0px 20px' }}>
      <h1>tcomponent - telescoope.org</h1>
    </div>
  )
}

export default App
