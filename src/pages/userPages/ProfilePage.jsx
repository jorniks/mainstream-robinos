import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router";



import EditCancelAndSaveIcons from '../../components/userPagesComponents/EditCancelAndSaveIcons'
import { deleteUser, updateInfo } from "../../features/auth/userSlice";




const ProfilePage = ({ user, setRefreshInfo }) => {

  const [editMode, setEditMode] = useState(''),
        [openDeletePopUp, setOpenDeletePopUp] = useState(false),
        [formData, setFormData] = useState({
          name: user?.name,
          email: user?.email,
          balance: user?.balance,
          password: ''
        }),
        [togglePasswordField, setTogglePasswordField] = useState(false),
        dispatch = useDispatch(),
        navigate = useNavigate()




  useEffect(() => {
    if (!user?.email) {
      toast.error('You are logged out')
      navigate('/')
    }
  }, [user, navigate])





  const onInputChange = (event) => {
    setFormData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value
    }))
  }


  const submitForm = (formName, eventData) => {
    if (formName === 'update') {
      const { editField, inputValue } = eventData,
            queryBody = `${editField}:${inputValue}`.split(':'),
            updateValues = {[queryBody[0]]: queryBody[1]}


      dispatch(updateInfo(updateValues))
      .unwrap()
      .then((originalPromiseResult) => {
        toast.success(`${editField} updated successfully`)
        setRefreshInfo(Date.now())
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error(rejectedValueOrSerializedError)
      })
    } else if (formName === 'delete') {
      dispatch(deleteUser(eventData))
      .unwrap()
      .then((originalPromiseResult) => {
        toast.success('Congratulations, you just confirmed that you are an ASSHOLE!')
        setRefreshInfo(Date.now())
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error(rejectedValueOrSerializedError)
      })
    }
  }







  return (
    <div className='px-3 py-8 space-y-14'>
      <section className="bg-gray-200 dark:bg-gray-800 shadow-lg rounded w-full max-w-3xl mx-auto py-8 px-6 space-y-4">
        <h4 className="text-xl font-bold mb-8">Your Profile Info</h4>
        
        <figure className="w-full max-w-md mx-auto">
          <label htmlFor="" className="">Name:</label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              className={`w-full py-2 px-1.5 focus:outline-none text-gray-800 ${editMode !== 'name' ? 'pointer-events-none bg-gray-100 border-none' : 'bg-gray-50 border-b border-black' }`}
              placeholder='name'
              name='name'
              value={formData.name}
              onChange={onInputChange}
              required
            />
            <EditCancelAndSaveIcons submitForm={submitForm} inputValue={formData.name} editMode={editMode} setEditMode={setEditMode} editField={'name'} />
          </div>
        </figure>
        
        <figure className="w-full max-w-md mx-auto">
          <label htmlFor="" className="">Email:</label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              className={`w-full py-2 px-1.5 focus:outline-none text-gray-800 ${editMode !== 'email' ? 'pointer-events-none bg-gray-100 border-none' : 'bg-gray-50 border-b border-black' }`}
              placeholder='email'
              name='email'
              value={formData.email}
              onChange={onInputChange}
              required
            />
            <EditCancelAndSaveIcons submitForm={submitForm} inputValue={formData.email} editMode={editMode} setEditMode={setEditMode} editField={'email'} />
          </div>
        </figure>
        
        <figure className="w-full max-w-md mx-auto">
          <label htmlFor="" className="">Password:</label>
          <div className="flex items-center gap-4">

            <div className={`w-full flex items-center ${editMode !== 'password' ? 'bg-gray-100 border-none' : 'bg-gray-50 border-b border-black' }`}>
              <input
                type={togglePasswordField === true ? 'text' : 'password'}
                className={`w-full py-2 px-1.5 focus:outline-none text-gray-800 ${editMode !== 'password' && 'pointer-events-none bg-gray-100'}`}
                placeholder='password'
                name='password'
                value={'password'}
                onChange={onInputChange}
                required
              />

              <div className={`px-2 ${editMode !== 'password' && 'hidden'}`}>
                <i className={`fas ${togglePasswordField === true ? 'fa-eye-slash' : 'fa-eye'} text-xl sm:text-base cursor-pointer`} onClick={() => {
                  setTogglePasswordField(!togglePasswordField)
                }}></i>
              </div>
            </div>

            <EditCancelAndSaveIcons submitForm={submitForm} inputValue={'password'} editMode={editMode} setEditMode={setEditMode} editField={'password'} />
          </div>
        </figure>
      </section>



      <section className="ring-2 ring-red-600 shadow-lg rounded w-full max-w-3xl mx-auto py-4 px-6 space-y-4">
        <h4 className="text-red-600 text-lg font-bold">DELETE ACCOUNT</h4>
        <p className="text-sm">
          Once you delete your account, there is no going back. Please be certain because this will permanently delete your account and you will lose all funds not withdrawn from your account.
        </p>

        <div className="relative text-gray-800">
          <div className={`absolute left-0 bottom-9 transition-all duration-300 ease-in-out bg-gray-200 p-4 w-full sm:w-1/2 ${openDeletePopUp !== true ? 'scale-0' : 'z-10'}`}>

            <p className="font-semibold">Please note that this will lead to loss of funds and you will not be able to recover this account.</p>
            Proceed to delete account?
            <div className="flex items-center justify-end gap-x-6 mt-2">
              <button className="btn-solid hover-gradient px-6 py-1" onClick={() => {
                setOpenDeletePopUp(!openDeletePopUp)
              }}>No</button>

              <button className="btn-outline hover-solid px-6 py-1" onClick={() => {
                submitForm('delete', { email: formData.email })
              }}>Yes</button>
            </div>
          </div>

          <button className="btn-outline hover-solid px-6 py-1.5" onClick={() => {
            setOpenDeletePopUp(!openDeletePopUp)
          }}>Delete Account</button>
        </div>
      </section>
    </div>
  )
}

export default ProfilePage