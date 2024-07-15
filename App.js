//importa o tipo component do react
import React, { Component } from "react";

//importa os componetes text e view do react-native
import { Text, View } from "react-native";

//declara a classe por padrão e extende pelo component
export default class App extends Component {
  //render é obrigatorio nas classes que extendem o component
  render() {
    {
      /*return: retorna a estrutura*/
      return (
        /*component view, basicamente uma div do html tradicional, pode ser usado que nem um container e quando você startar o aplicativo, ele estara la */
        <View>
          {/* texto 'Yuri' que vai aparecer quando startar o app */}
          <Text>Yuri</Text>
          {/* fechamento do compomente*/}
        </View>
      );
    }
  }
}
