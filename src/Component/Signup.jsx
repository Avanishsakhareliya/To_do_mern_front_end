import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react"
// import Home from './Home';
// import {Navigate} from "react-router-dom"
import { useNavigate } from 'react-router-dom';


const axios = require('axios');
function Signup() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        c_password: ""
    })

    const [err, seterr] = useState({
        e1: "", e2: "", e3: "", e4: "", errval: false
    })
    let navigate = useNavigate();

    function handlechange(e) {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })




    }
    function validation() {
        user.username === "" ? seterr((pre) => ({ ...pre, e1: "enter your username", errval: true })) : seterr((pre) => ({ ...pre, e1: "", errval: false }))
        user.email === "" ? seterr((pre) => ({ ...pre, e2: "enter your email", errval: true })) : seterr((pre) => ({ ...pre, e2: "", errval: false }))
        user.password === "" ? seterr((pre) => ({ ...pre, e3: "enter your password", errval: true })) : seterr((pre) => ({ ...pre, e3: "", errval: false }))
        user.c_password === "" ? seterr((pre) => ({ ...pre, e4: " reenter password", errval: true })) : seterr((pre) => ({ ...pre, e4: "", errval: false }))

    }
    async function postdata(e) {
        try {

            validation()
            if (err.errval === false) {
                if (!user.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                    alert("wrong email")
                }

                const createdata = await axios.post("http://localhost:4000/signup", user)
                console.log("creatdata ", createdata);

                console.log("creatdata stus", createdata.status);
                console.log("email user", createdata.data.email);


                if (createdata.status === 200) {
                    localStorage.setItem("user_token", createdata.data.token)
                    setUser({
                        username: "",
                        email: "",
                        password: "",
                        c_password: ""
                    })
                    alert("success")
                    navigate("/home")
                    window.location.reload();
                }
            }
            else {
                // alert("wrong email")
                // seterr((pre) => ({ ...pre, e2: "please enter valid email", errval: true }))

            }

        } catch (error) {
            // alert("email already exites ")
            seterr((pre) => ({ ...pre, e2: "email alredy exits", errval: true }))
        }

    }
    return (<>

        <section class="vh-100" style={{ backgroundColor: "#eee" }}>
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-12 col-xl-11">
                        <div class="card text-black" style={{ borderRadius: "25px" }}>
                            <div class="card-body p-md-5">
                                <div class="row justify-content-center">
                                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form class="mx-1 mx-md-4">

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="text" id="form3Example1c" class="form-control" name='username' value={user.username} placeholder='username' onChange={handlechange} />
                                                    <label class="form-label" for="form3Example1c">{err.e1}</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="email" id="form3Example3c" class="form-control" name='email' value={user.email} placeholder='Your Email' onChange={handlechange} />
                                                    <label class="form-label" id='err_e2' style={{ color: "red" }} for="form3Example3c">{err.e2}</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4c" class="form-control" name='password' value={user.password} placeholder='Password' onChange={handlechange} />
                                                    <label class="form-label" for="form3Example4c">{err.e3}</label>
                                                </div>
                                            </div>

                                            <div class="d-flex flex-row align-items-center mb-4">
                                                <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div class="form-outline flex-fill mb-0">
                                                    <input type="password" id="form3Example4cd" class="form-control" name='c_password' value={user.c_password} placeholder='Repeat your password' onChange={handlechange} />
                                                    <label class="form-label" for="form3Example4cd">{err.e4}</label>
                                                </div>
                                            </div>

                                            <div class="form-check d-flex justify-content-center mb-5">
                                                <input
                                                    class="form-check-input me-2"
                                                    type="checkbox"
                                                    value=""
                                                    id="form2Example3c"
                                                />
                                                <label class="form-check-label" for="form2Example3">
                                                    I agree all statements in <a href="#!">Terms of service</a>
                                                </label>
                                            </div>

                                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="button" class="btn btn-primary btn-lg" onClick={(e) => postdata(e)}>Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" class="img-fluid" alt="Sample_image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default Signup