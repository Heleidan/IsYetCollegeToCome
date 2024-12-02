import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

export default function Login() {
  const [ingCorreo, setIngCorreo] = useState('');
  const [ingCodigo, setIngCodigo] = useState('');
  const [ingPassword, setIngPassword] = useState('');

  const consulta = () => {
    // Validar el correo
    const correoRegex = /^[a-zA-Z0-9._%+-]+@alumnos\.udg\.mx$/;
    if (!correoRegex.test(ingCorreo)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo con la terminación @alumnos.udg.mx');
      return;
    }

    // Aquí puedes realizar la consulta con los valores
    console.log('Correo:', ingCorreo);
    console.log('Código:', ingCodigo);
    console.log('Password:', ingPassword);
    Alert.alert('Inicio de sesión', 'Datos ingresados correctamente.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia Sesión</Text>

      <View style={styles.imageContainer}>
        <Image source={require('./assets/UDG.png')} style={styles.image} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="CORREO"
          keyboardType="email-address"
          value={ingCorreo}
          onChangeText={setIngCorreo}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="CODIGO"
          keyboardType="numeric"
          value={ingCodigo}
          onChangeText={setIngCodigo}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña SIIAU"
          secureTextEntry
          value={ingPassword}
          onChangeText={setIngPassword}
        />
      </View>

      <TouchableOpacity onPress={consulta} style={styles.buttonContainer}>
        <Image
          style={styles.buttonImage}
          source={require('./assets/inicio.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 40,
    color: 'blue',
    marginBottom: 30,
  },
  imageContainer: {
    marginBottom: 40,
  },
  image: {
    width: 150,
    height: 250,
    resizeMode: 'contain',
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 15,
    width: 250,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  input: {
    paddingLeft: 10,
    fontSize: 16,
    height: 40,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 30,
  },
  buttonImage: {
    width: 160,
    height: 50,
    resizeMode: 'contain',
  },
});