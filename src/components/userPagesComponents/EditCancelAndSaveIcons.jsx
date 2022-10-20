

const EditCancelAndSaveIcons = (props) => {

  const { inputValue, editField } = props


  return (
    <>
      <div className="text-lg flex gap-x-6">
        {
          props.editMode !== props.editField ?
            <i className="fas fa-pencil cursor-pointer" onClick={() => {
              props.setEditMode(props.editField)
            }}></i>
            :
            <>
              {/* CANCEL EDITING */}
              <i className="fas fa-xmark text-red-600 cursor-pointer" onClick={() => {
                props.setEditMode('')
              }}></i>
              {/* SAVE EDIT */}
              <i className="fas fa-check text-green-600 cursor-pointer" onClick={() => {
                props.submitForm('update', {editField, inputValue})
                props.setEditMode('')
              }}></i>
            </>
        }
      </div>
    </>
  )
}

export default EditCancelAndSaveIcons