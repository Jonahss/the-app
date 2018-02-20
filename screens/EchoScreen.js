import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import baseStyles from '../styles/base';

const ECHO_KEY = "@TheApp:savedEcho";

export default class EchoScreen extends Component {


  constructor() {
    super();
    this.state = {savedEcho: null, curText: null};
  }

  async componentDidMount() {
    await this.setEcho();
  }

  async saveEcho() {
    if (!this.state.curText) {
      throw new Error("Must enter text");
    }

    await AsyncStorage.setItem(ECHO_KEY, this.state.curText);
    await this.setEcho();
  }

  async setEcho() {
    const savedEcho = await AsyncStorage.getItem(ECHO_KEY);
    this.setState({savedEcho});
  }

  render() {
    const {savedEcho} = this.state;
    const placeholder = `Say something${savedEcho ? ' new' : ''}`;
    return (
      <View style={styles.main}>
        {savedEcho &&
          <View style={{...baseStyles.flexCenter}}>
            <Text style={styles.echoHeader}>Here's what you said before:</Text>
            <Text style={styles.savedEcho}>{savedEcho}</Text>
          </View>
        }
        <View style={styles.form}>
          <Input
            placeholder={placeholder}
            style={styles.formControl}
            onChangeText={(text) => this.setState({curText: text})}
          />
          <Button
            text="Save" style={styles.formControl}
            onPress={this.saveEcho.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  echoHeader: {
    fontSize: baseStyles.fontSizeMed,
    margin: baseStyles.margin,
  },
  savedEcho: {
    margin: baseStyles.margin,
    color: '#999',
    fontSize: baseStyles.fontSizeBig,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: baseStyles.margin,
  },
});