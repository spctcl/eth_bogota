import { SafeEventEmitterProvider } from "@web3auth-mpc/base";
import { Web3AuthCore } from "@web3auth-mpc/core";
import { useEffect, useState } from "react";
import { View } from 'react-native';

const clientId = "BIUeA2m8P1d1N2wrOLi4VOFVtqawWzlxM5SB9jI6sKNYs3To0RnvroWyu9PImiDrYO5m2Z8IaDqokzEV7tdi8_c"

function App() {
    const [web3auth, setWeb3auth] = useState<Web3AuthCore | null>(null);
    const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                await web3auth.init();

                setWeb3auth(web3auth);

                if (web3auth.provider) {
                    setProvider(web3auth.provider);
                }

            } catch (error) {
                console.log(error);
            }
        };
        init();
    }, []);

    function uiConsole(...args: any[]): void {
        const el = document.querySelector("#console>p");
        if (el) {
            el.innerHTML = JSON.stringify(args || {}, null, 2);
        }
    }

    const login = async () => {
        if (!web3auth) {
            uiConsole("web3auth not initialized yet.");
            return;
        }
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
    }; 

    const unloggedInView = (
        <button disabled={!web3auth} onClick={login} className="card">
            {web3auth ? "Login" : "Loading..."}
        </button>
    );

    return (
        <View>
            {unloggedInView}
        </View>
    );
}

export default App;