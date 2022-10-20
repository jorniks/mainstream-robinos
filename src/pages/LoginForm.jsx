import { useState } from 'react'
import { useSelector } from 'react-redux'



const LoginForm = ({ showLoginForm, setShowLoginForm, setShowRegisterForm, submitForm }) => {


  const [togglePasswordField, setTogglePasswordField] = useState(false),
        [formData, setFormData] = useState({
          email: '',
          password: ''
        }),
        { email, password } = formData,
        { isLoading } = useSelector((state) => state.auth)






  const onInputChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }


  const prepareForSubmission = (event) => {
    event.preventDefault()
    const userData = {
      email,
      password
    }

    submitForm('login', userData)
  }





  return (
    <div className={`${showLoginForm === false && 'scale-0'} bg-black z-30 bg-opacity-20 flex items-center justify-center transition-all duration-500 fixed top-0 w-screen h-screen p-1.5`}>
      <div className="bg-white w-full max-w-3xl h-3/5 sm:h-3/4 transition-all duration-700 grid grid-cols-5 relative shadow-xl">
        <section className="absolute right-2 cursor-pointer" onClick={() => {
          setShowLoginForm(false)
        }}>
          <i className="fas fa-xmark text-2xl"></i>
        </section>

        <section className="col-span-5 sm:col-span-3 hidden sm:block bg-red-600 bg-opacity-25" style={{
          backgroundImage: `url('/img/login/my_password.svg')`, backgroundRepeat: "no-repeat",
          backgroundSize: "contain", backgroundPosition: "center"
        }}>
        </section>

        <section className="col-span-5 sm:col-span-2 px-3 flex flex-col h-full">
          <section className={`flex-1 flex items-center`}>
            <div className="w-full">
              <form onSubmit={prepareForSubmission} autoComplete="false" className="space-y-4">
                <h4 className="text-xl font-semibold">Sign In</h4>

                <div className="relative bg-gradient-to-tr from-yellow-400 via-red-600 to-red-700 pb-0.5">
                  <input
                    type="text"
                    className="w-full text-gray-800 py-2 px-1.5 focus:outline-none bg-gray-50 peer placeholder:opacity-0"
                    placeholder='email'
                    name='email'
                    value={email}
                    onChange={onInputChange}
                    required
                  />
                  <span htmlFor="" className="form-label">email</span>
                </div>
                
                <div className="relative flex items-center gap-x-1">
                  <div className="bg-gradient-to-tr from-yellow-400 via-red-600 to-red-700 pb-0.5 w-full">
                    <input
                      type={togglePasswordField === true ? 'text' : 'password'}
                      className="w-full text-gray-800 py-2 px-1.5 focus:outline-none bg-gray-50 peer placeholder:opacity-0"
                      placeholder='password'
                      name='password'
                      value={password}
                      onChange={onInputChange}
                      required
                    />
                    <label htmlFor="" className="form-label">password</label>
                  </div>
                  <i className={`fas ${togglePasswordField === true ? 'fa-eye-slash' : 'fa-eye'} text-xl sm:text-base cursor-pointer`} onClick={() => {
                    setTogglePasswordField(!togglePasswordField)
                  }}></i>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-blue-700 font-medium cursor-pointer">
                    Forgot Password?
                  </div>

                  <button className={`btn-solid hover-gradient w-2/5 py-3 sm:py-1.5 ${isLoading === true && 'bg-opacity-70 pointer-events-none'}`}> Login </button>
                </div>
              </form>
              
              <section className="space-y-2 text-center mt-8">
                <span className="text-xs font-medium">or Connect with Social Media</span>

                <div className="flex items-center justify-evenly gap-x-3">
                  <div className="relative w-full">
                    <button className="text-white text-sm font-bold focus:outline-none bg-red-600 w-full py-3 sm:py-1.5">
                      <i className="fab fa-google mr-2"></i>
                      gmail
                    </button>
                  </div>

                  <div className="relative w-full">
                    <button className="text-white text-sm font-bold focus:outline-none bg-blue-700 w-full py-3 sm:py-1.5">
                      <i className="fab fa-facebook-f mr-2"></i>
                      facebook
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>

          
          <section className="flex items-center gap-3 text-sm sm:text-xs py-2">
            <span className=""> Don't have an account? </span>

            <h6 className="font-semibold cursor-pointer" onClick={() => {
              setShowLoginForm(false)
              setShowRegisterForm(true)
            }}> Sign Up Here </h6>
          </section>
        </section>
      </div>
    </div>
  )
}

export default LoginForm