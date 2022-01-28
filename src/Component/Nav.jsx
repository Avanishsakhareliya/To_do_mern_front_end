import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Nav() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.setItem("user_token", "");
        navigate("/");
    }

    return (<>

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
           
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">

            {
                localStorage.getItem("user_token")?
                <>
                    <Link className="nav-item nav-link active" to="/home">Home <span class="sr-only">(current)</span></Link>
                    <button className="nav-item nav-link" onClick={logout}>logout</button>
                </>:
                <>
                <Link className="nav-item nav-link" to="/">signup</Link>
                <Link className="nav-item nav-link" to="/login">Login</Link>
                </>
            }



                    {/* <button className="nav-item nav-link " onClick={logout}>logout</button> */}
                </div>
            </div>
        </nav>
    </>)
}

export default Nav;