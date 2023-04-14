// components
import { Link } from 'react-router-dom'
import AuthLayout from '../Layout'
// styles
import style from './Login.module.scss'
// assets
import fingerPrint from '@assets/decoration/fingerPrint.svg'
import Form from './Form'

//
const LoginForm = () => {
  return (
    <AuthLayout>
      <div className={style.login}>
        {/* decoration */}
        <div className={style.decoration}>
          <img src={fingerPrint} alt='login decoration' className={style.fingerPrint} />
        </div>
        {/* copy */}
        <div className={style.copy}>
          <h5 className={style.title}>Welcome back</h5>
          <p className={style.text}>Glad to see you again.</p>
        </div>
        {/* form */}
        <Form />
        <div className={style.notAccountContainer}>
          <p>
            Don't have an account{' '}
            <Link to='/auth/register' className={style.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LoginForm
