import './index.css'
const Filters = (props) => {
    const {language,changeLanguage,category,changeCategory} = props
    const onChangeOfLanguage = (event) => {
        changeLanguage(event.target.value)
    }
    const onChangeCategory = (event) => {
        changeCategory(event.target.value)
    }
    return(
      <div className="modal-body">
        <select value={category} onChange={onChangeCategory}>
            <option value="Any">Any</option>
            <option value="Programming">Programming</option>
            <option value="Miscellaneous">Misc</option>
            <option value="Dark">Dark</option>
            <option value="pun">Pun</option>
            <option value="Spooky">Spooky</option>
        </select>
        <select value={language} onChange={onChangeOfLanguage}>
            <option value="en">English</option>
            <option value="cs">Czech</option>
            <option value="de">German</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
        </select>
      </div>
      
   
)
    }

export default Filters