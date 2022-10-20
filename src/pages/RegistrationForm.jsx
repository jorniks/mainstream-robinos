import { useState } from 'react'
import { useSelector } from 'react-redux'



const RegistrationForm = ({ showRegisterForm, setShowRegisterForm, setShowLoginForm, submitForm }) => {
  const [togglePasswordField, setTogglePasswordField] = useState(false),
        [formData, setFormData] = useState({
          name: '',
          email: '',
          password: ''
        }),
        { name, email, password } = formData,
        { isLoading } = useSelector((state) => state.auth)

  




  const onInputChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }


  const prepareForSubmission = (e) => {
    e.preventDefault()
    const userData = {
      name,
      email,
      password
    }

    submitForm('register', userData)
  }





  return (
    <div className={`${showRegisterForm === false && 'scale-0'} bg-black z-30 bg-opacity-20 flex items-center justify-center transition-all duration-500 fixed top-0 w-screen h-screen p-1.5`}>
      <div className="bg-white w-full max-w-3xl h-3/5 sm:h-3/4 transition-all duration-700 grid grid-cols-5 relative shadow-xl">
        <section className="absolute right-2 cursor-pointer" onClick={() => {
          setShowRegisterForm(false)
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
              <form onSubmit={prepareForSubmission} className="space-y-4">
                <h4 className="text-xl font-semibold">Sign Up</h4>

                <div className="relative bg-gradient-to-tr from-yellow-400 via-red-600 to-red-700 pb-0.5">
                  <input
                    type="text"
                    className="w-full text-gray-800 py-2 px-1.5 focus:outline-none bg-gray-50 peer placeholder:opacity-0"
                    placeholder='name'
                    name='name'
                    value={name}
                    onChange={onInputChange}
                    required
                  />
                  <label htmlFor="" className="form-label">name</label>
                </div>

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
                  <label htmlFor="" className="form-label">email</label>
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
                
                <div className="flex items-center justify-end">
                  <button className={`btn-solid hover-gradient w-2/5 py-3 sm:py-1.5 ${isLoading === true && 'bg-opacity-70 pointer-events-none'}`}> Register </button>
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
            <span className=""> Already have an account? </span>

            <h6 className="font-semibold cursor-pointer" onClick={() => {
              setShowRegisterForm(false)
              setShowLoginForm(true)
            }}> Sign In Here </h6>
          </section>
        </section>
      </div>
    </div>
  )
}

export default RegistrationForm