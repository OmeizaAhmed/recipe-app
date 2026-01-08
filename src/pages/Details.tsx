import { useParams } from "react-router-dom"

export default function Details(){
  const {id} = useParams();
  return (
    <div>This is the Detail Page with id number: {id}</div>
  )
}