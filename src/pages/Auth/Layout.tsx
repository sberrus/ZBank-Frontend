// components
import GridDecoration from './GridDecoration'
// styles
import style from './layout.module.scss'

// types
type AuthLayoutProps = {
  children: JSX.Element
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={style.layout}>
      <div className={style.formContainer}>{children}</div>
      <GridDecoration />
    </div>
  )
}

export default AuthLayout

/**
 *
 * TASKS
 *
 * todo: Add error handling in all components
 */
