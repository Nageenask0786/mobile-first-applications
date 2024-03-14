import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = (props) => {
    const onClickLogout = () => {
        const {history} = props
        Cookies.remove('user_details')
        history.replace('/login')
      }
    return(

    <header className="header">
        <ul className="d-flex flex-row align-items-center justify-content-between header-items-container">
            <li className = "item"><button type="button" className="btn btn-primary logout-button" onClick={onClickLogout}>Logout</button></li>
        </ul>
    </header>
)
    }

export default withRouter(Header)