import React from 'react'
import {  Button, Jumbotron } from 'react-bootstrap'

export const HomePage = () => {
    return (
      <Jumbotron>
        <h1>Добро пожаловать в чат!</h1>
        <p>
          This is a simple hero unit, a simple jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
    )
}

