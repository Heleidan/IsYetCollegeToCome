import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';

export default function Index({ navigation }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = 'f111559fd43b6d9141ac98084d113792';
      const city = 'Guadalajara, MX';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeather({
          city: 'Guadalajara, MX',
          description: data.weather[0].description,
          temperature: `${data.main.temp}°C`,
        });
      } catch (error) {
        console.error('Error al obtener datos del clima:', error);
        setWeather({ error: 'No se pudo cargar el clima' });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Image
          source={require('./assets/login.png')} 
          style={styles.loginImage}
        />
      </TouchableOpacity>

      {/* Sección de Clima */}
      <View style={styles.weatherContainer}>
        <Image source={require('./assets/clima.png')} style={styles.weatherIcon} />
        {loading ? (
          <ActivityIndicator size="small" color="#0000ff" />
        ) : weather?.error ? (
          <Text style={styles.errorText}>{weather.error}</Text>
        ) : (
          <View style={styles.weatherDetails}>
            <Text style={styles.weatherText}>Ciudad: {weather.city}</Text>
            <Text style={styles.weatherText}>Clima: {weather.description}</Text>
            <Text style={styles.weatherText}>Temperatura: {weather.temperature}</Text>
          </View>
        )}
      </View>

      {/* Botón Info CUCEI */}
      <TouchableOpacity
        style={styles.cuceiButton}
        onPress={() => navigation.navigate('Cucei')}
      >
        <Text style={styles.cuceiButtonText}>Info CUCEI</Text>
      </TouchableOpacity>

      {/* Línea de Separación */}
      <View style={styles.separator} />

      {/* Directorio */}
      <View style={styles.webviewContainer}>
        <Text style={styles.header}>Directorio</Text>
        <WebView
          source={{ uri: 'https://cucei.udg.mx/es/directorio' }}
          style={styles.webview}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loginImage: {
    width: 50,
    height: 50,
    marginTop: 20,
    marginLeft: 300,
    marginBottom: 20,
  },
  weatherContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: -80,
    padding: 10,
  },
  weatherIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  weatherDetails: {
    marginLeft: 5,
  },
  weatherText: {
    fontSize: 12,
    color: '#333',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  webviewContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  webview: {
    flex: 1,
    borderRadius: 10,
  },
  cuceiButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
  },
  cuceiButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

