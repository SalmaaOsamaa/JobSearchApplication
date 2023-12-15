import React from 'react'
import Button from '../ui/Button'
import styles from './WelcomePage.module.scss'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {
    const navigate = useNavigate()
    
    const handleOnClick = () => {
       navigate('/jobs')
    }
  return (
    <div className={styles.container}>
    <p>test</p>
    {/* <div className={styles.imagehalf}>
      <img src={logo} alt="Welcome" />
    </div> */}
    <div className={styles.texthalf}>
      <p>Welcome to Dashboard!</p>
      <Button onClick={handleOnClick}>Click Here</Button>
    </div>
  </div>
  )
}

export default WelcomePage