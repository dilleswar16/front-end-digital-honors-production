import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {

    const navigate = useNavigate();

  return (
    <section className="p-0 bg-img cover-background" 
    style={{background: "-webkit-linear-gradient(to right,#2c5364,#203a43,#0f2027);",background: "linear-gradient(to right,#2c5364,#203a43,#0f2027"}}>
        <div className="container-fluid d-flex flex-column">
            <div className="row align-items-center justify-content-center min-vh-100">
                <div className="col-md-9 col-lg-6 my-5">
                    <div className="text-center error-page">
                        <h1 className="mb-0 text-secondary">404</h1>
                        <h2 className="mb-4 text-white">UH OH! You're lost.</h2>
                        <p className="w-sm-80 mx-auto mb-4 text-white">The page you are looking for does not exist.
          How you got here is a mystery. But you can click the button below
          to go back to the homepage.</p>
                        <div>
                            <button onClick={()=>{
                                    navigate("/homepage")
                            }} className="btn">
                                    Go Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default NotFound
