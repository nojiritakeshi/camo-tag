// TestComponent
import React from 'react'

export const TestComponent = () => {
  const [number, setNumber] = React.useState(1)
  return (
    <>
      <button style={{ color: 'red' }} onClick={() => setNumber(number + number)}>
        Test
      </button>
      <p>{number}</p>
    </>
  )
}
