import { useState } from 'react'
import { Toast } from 'react-bootstrap'

type ErrorAlertProps = {
  msg: string
  type: 'success' | 'danger' | 'warning'
}

const ErrorAlert = ({ msg, type }: ErrorAlertProps) => {
  const [showA, setShowA] = useState(true)

  const toggleShowA = () => setShowA(!showA)

  return (
    <Toast show={showA} onClose={toggleShowA} bg={type} autohide delay={5000} style={{ marginBottom: '2em' }}>
      <Toast.Body>{msg}</Toast.Body>
    </Toast>
  )
}

export default ErrorAlert
