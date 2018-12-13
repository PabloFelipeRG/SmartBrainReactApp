import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn === true) {
        return(
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 fw6 db black link underline hover-gray pa3 pointer'>Sign Out</p>
            </nav>
        );
    } else if (isSignedIn === false) {
        return( 
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 fw6 db black link underline hover-gray pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 fw6 db black link underline hover-gray pa3 pointer'>Register</p>
            </nav>
        );
    }
}

export default Navigation;