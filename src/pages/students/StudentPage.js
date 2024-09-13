import React from 'react'
import Header from '../../components/header/Header'
import ListStudent from '../../components/listStudent/ListStudent'
import { Container } from 'reactstrap'

export default function StudentPage() {
  return (
    <Container>
        <Header/>
        <h1 style={{textAlign:'center'}}>StudentPage</h1>
        <ListStudent/>
    </Container>
  )
}
