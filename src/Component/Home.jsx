import { useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require('axios');


function Home() {
    const [userMsg, setuerMsg] = useState({
        title: "", message: "",
    })
    const token = localStorage.getItem("user_token")

    const [state, setState] = useState([]);
    const [updatedatas, setupdatedata] = useState("");
    async function dataArray() {
        const result = await axios({
            method: 'get',
            url: 'http://localhost:5000/todo_list',
            headers: { "token": `${token}` }
        })
        setState(result.data)
        // console.log("state",state);
        console.log("result", result.data);
    }
    useEffect(() => {
        dataArray()
    }, [])
    function handlechange(e) {
        const { name, value } = e.target;
        setuerMsg({ ...userMsg, [name]: value })
    }
    async function deletedata(id) {
        console.log(id);
        const removedata = await axios.delete(`http://localhost:5000/deletedata/${id}`);

        dataArray()

        console.log("removedata", removedata);
    }
    async function updatedata(id) {
        console.log(id);
        const updatedata = await axios.put(`http://localhost:5000/updatedata/${id}`);
        console.log(updatedata.data);
        setuerMsg({
            title: updatedata.data.title,
            message: updatedata.data.message,
        })
        setupdatedata(id)
    }
    const addTodo = async () => {
        if (updatedatas === "") {

            await axios({
                method: 'post',
                url: 'http://localhost:5000/todo',
                headers: { "token": `${token}` },
                // userMsg
                data: { title: userMsg.title, message: userMsg.message }
            })
        }
        dataArray()
    }
    async function postdata(e) {

        // console.log(updateuser);
        if (updatedatas === "") {
            addTodo()
            // const create_to_do = await axios.post("http://localhost:5000/todo", userMsg)
            // console.log(create_to_do.data);
        }
        else {
            const update = await axios.put(`http://localhost:5000/updatedata/${updatedatas}`, userMsg)
            console.log(update);
        }

        setuerMsg({
            title: "", message: ""
        })

        dataArray()
    }

    return (<>
        <br />
        <div style={{ marginLeft: "100px", width: "50%" }}>

            <div class="form-floating mb-3">
                <input type="string" class="form-control" id="floatingInput" placeholder="enter title" name='title' value={userMsg.title} onChange={handlechange} />
                <label for="floatingInput">title</label>
            </div>
            <br />
            <div class="form-floating">
                <textarea type="string" class="form-control" placeholder="Leave a comment here" id="floatingTextarea" name='message' value={userMsg.message} onChange={handlechange}></textarea>
                <label for="floatingTextarea">enter message</label>
            </div>
            <br />
            <div className='text-center'>
                <button type="button" class="btn btn-outline-primary" onClick={(e) => postdata(e)}>ADD</button>

            </div>
        </div><br /><br />
        <div>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">index</th>
                        <th scope="col">title</th>
                        <th scope="col">Message</th>
                        <th scope="col"></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        state.map((val, id) => {

                            return <tr>
                                <th scope="row">{id + 1}</th>
                                <td>{val.title}</td>
                                <td>{val.message}</td>
                                <td><button onClick={() => updatedata(val._id)} type="button" class="btn btn-outline-dark"><i class="fas fa-user-edit "></i></button>
                                    <span> </span>
                                    <button onClick={() => deletedata(val._id)} type="button" class="btn btn-outline-danger">  <i class="fas fa-trash-alt text-dark"></i></button>

                                </td>
                            </tr>
                        })
                    }


                </tbody>
            </table>
        </div>

    </>)
}
export default Home