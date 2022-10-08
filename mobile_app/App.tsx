import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Web3Auth } from "@web3auth-mpc/web3auth";
import { OpenloginAdapter } from "@web3auth-mpc/openlogin-adapter";
import { SafeEventEmitterProvider } from "@web3auth-mpc/base";
import { tssDataCallback, tssGetPublic, tssSign, generatePrecompute } from "torus-mpc";
import { WebView } from 'react-native-webview';

export default function App() {
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          uiConfig: {
            appLogo: "https://images.web3auth.io/web3auth-logo-w.svg",
            theme: "light",
            loginMethodsOrder: ["twitter", "google"],
          },
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x5",
            rpcTarget: "https://rpc.ankr.com/eth_goerli",
            displayName: "Goerli Testnet",
            blockExplorer: "https://goerli.etherscan.io/",
            ticker: "ETH",
            tickerName: "Ethereum",
          },
          enableLogging: true,
        });
  
        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "mandatory",
          },
          tssSettings: {
            useTSS: true,
            tssGetPublic,
            tssSign,
            tssDataCallback,
          },
          adapterSettings: {
            _iframeUrl: "https://mpc-beta.openlogin.com",
            network: "development",
            clientId,
          },
        });
        (window as any).openloginAdapter = openloginAdapter;
  
        web3auth.configureAdapter(openloginAdapter);


        await web3auth.initModal({
          modalConfig: {
            "torus-evm": {
              label: "Torus Wallet",
              showOnModal: false,
            },
            metamask: {
              label: "Metamask",
              showOnModal: false,
            },
            "wallet-connect-v1": {
              label: "Wallet Connect",
              showOnModal: false,
            },
          },
        });
        setWeb3auth(web3auth);
  
        if (web3auth.provider) {
          setProvider(web3auth.connect()); // EY: Calling connect opens the modal.
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    init();
  }, []);
  
  return (
    <View style={styles.container}>
      <WebView
          scalesPageToFit={true}
          bounces={false}
          javaScriptEnabled
          style={{ height: 500, width: 300 }}
          source={{
            html: `
                  <!DOCTYPE html>
                  <html>
                    <head></head> // <--add header styles if needed
                    <body>
                      <button onClick={web3auth.connect()}>Connect</button>
                      <div id="baseDiv">${iframeString}</div> //<--- add your iframe here
                    </body>
                  </html>
            `,
          }}
          automaticallyAdjustContentInsets={false}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
