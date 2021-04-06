import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  login = async (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: "center", marginTop: 50 }}>
        <View>
          <Text style={{ textAlign: "center", fontSize: 50 }}>~Story Hub~</Text>
          <Image
            source={require("../assets/logo.jpg")}
            style={{ width: 300, height: 300 }}
          />
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />

          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={(text) => {
              this.setState({
                password: text,
              });
            }}
          />
        </View>
        <View>
          <TouchableOpacity
            style={{
              height: 30,
              width: 100,
              borderWidth: 1,
              marginTop: 20,
              paddingTop: 0,
              borderRadius: 8,
            }}
            onPress={() => {
              this.login(this.state.emailId, this.state.password);
            }}
          >
            <Text style={{ textAlign: "center", fontSize:20 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
});
