import React from 'react'
import Note from './Note'
import AddNote from './AddNote'
export default function Home() {
  return (
    <>
    <AddNote/>
<div className="container my-3">
<Note/>
</div>
    </>
  )
}
