import React from 'react';

const Legenda = () => {
    return (
        <div className="legend">
            <div style={{ "--color": '#a50f15' }}>&gt;5000</div>
            <div style={{ "--color": '#de2d26' }}>4501 - 5000</div>
            <div style={{ "--color": '#fb6a4a' }}>4001 - 4500</div>
            <div style={{ "--color": '#fc9272' }}>3501 - 4000</div>
            <div style={{ "--color": '#fcbba1' }}>3001 - 3500</div>
            <div style={{ "--color": '#fee5d9' }}>&lt;3000</div>
        </div>
    );
}

export default Legenda;
