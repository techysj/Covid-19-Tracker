import React from 'react'

function Table({ countries }) {
    return (
        <div className="table">
            {countries.map((country) => (
                <tr>
                    <td style={{color:'Brown' , fontSize:'18px',fontWeight:'400',lineHeight:'1.5'}}>{country.country}</td>
                    <td>
                        <strong>{country.cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
