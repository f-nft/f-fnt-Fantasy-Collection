import React from "react";

const navbar = ({ accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }

    return (
        <div>
            {/*left side icon */}
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Discord</div>

            {/*right side icon */}
                <div>About</div>
                <div>Mint</div>
                <div>Team</div>
                <div>Road Map</div>

            {/*connect */}
            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button onClick={connectAccount}>Connect</button>
            )}
        </div>
    );
};