import './feature.css';
import React from 'react';

const Frame3: React.VFC = () => {
    return (
        <div className="frame-3" >
            <div className="rectangle-2-.-2" />
            <div className="mask-group" >
                <div className="rectangle-2-.-1" />
                <div className="image-1-8" />
            </div>
            <p className="text-1" >$49, 329.77</p>
            <p className="text-2" >Your balance is equivalent</p>
            <div className="group" >
                <div className="rectangle-3" />
                <p className="text-3" >Deposit</p> </div>
            <div className="group-2" >
                <div className="rectangle-3-.-1" />
                <p className="text-4" >Withdraw</p>
            </div>
            <div className="bit--coin--line" >
                <img src="website/src/icegif-3384.gif" alt='image' />
            </div>
        </div>)
}

export default Frame3;