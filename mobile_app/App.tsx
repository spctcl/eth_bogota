import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {

const appUrl = 'https://localhost:3000';

return (
      <View style={styles.container}>
      <WebView
    
          scalesPageToFit={true} 
          javaScriptEnabled
          source={{
            html: appUrl
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
