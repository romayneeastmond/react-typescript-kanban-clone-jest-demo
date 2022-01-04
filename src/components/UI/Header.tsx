import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header: React.FC<{ title?: string }> = (props) => {
    return (
        <header>
            <div className='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow'>
                <h5 className='my-0 mr-md-auto font-weight-normal logo'><Link to='/'>{props.title}</Link></h5>
                <nav className='my-2 my-md-0 mr-md-3'>
                    <NavLink className='p-2 mr-1 text-dark btn btn-sm btn-outline-light' to='/about'>About</NavLink>
                </nav>
            </div>
        </header>
    )
}

Header.defaultProps = {
    title: 'React TypeScript Demo'
}

export default Header