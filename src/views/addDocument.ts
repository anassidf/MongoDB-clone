const addDocument = () => {
  

// create section container and 3 input fields inside it 

let section  = document.createElement('section')
let fieldName = document.createElement('input')
let fieldValue = document.createElement('input')

// add attributes to each one of them

fieldName.setAttribute('placeholder', 'Enter Field Name')
fieldName.setAttribute('name', 'fieldName')
fieldValue.setAttribute('placeholder', 'Enter Value')
fieldValue.setAttribute('name', 'fieldValue')

fieldName.required = true ; 
fieldValue.required = true ;


// append inputs to section and section to the form after all

section.appendChild(fieldName)
section.appendChild(fieldValue)


const create__button = document.getElementById('add__documentButton')

create__button?.before(section)

}