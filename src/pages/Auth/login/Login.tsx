// components
import { Link } from 'react-router-dom'
import AuthLayout from '../Layout'
// styles
import style from '../auth.module.scss'
// assets
import fingerPrint from '@assets/decoration/fingerPrint.svg'
import Form from './LoginForm'

//
const LoginForm = () => {
  return (
    <AuthLayout>
      <div className={style.formWrapper}>
        {/* decoration */}
        <div className={style.decoration}>
          <img src={fingerPrint} alt='login decoration' className={style.decorationImage} />
        </div>
        {/* copy */}
        <div className={style.copy}>
          <h5 className={style.title}>Welcome back</h5>
          <p className={style.text}>Glad to see you again.</p>
        </div>
        {/* form */}
        <Form />
        <p className={style.link}>
          Don't have an account{' '}
          <Link to='/auth/register' className={style.link}>
            Register
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

export default LoginForm
