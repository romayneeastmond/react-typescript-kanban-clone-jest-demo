import React from 'react'

const DropDownMenu: React.FC<{ title?: string }> = (props) => {
    return (
        <div className='dropdown show'>
            <div className='dropdown-menu box-shadow'>
                <h6 className='dropdown-header'>{props.title}</h6>
                <div className='dropdown-divider'></div>
                {props.children}
            </div>
        </div>
    )
}

DropDownMenu.defaultProps = {
    title: 'Menu Options'
}

export default DropDownMenu