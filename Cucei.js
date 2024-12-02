import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Linking, ScrollView } from 'react-native';

export default function Cucei({ navigation }) {
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

  const openUrl = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.container}>
      {/* Botón de login */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButton}>
        <Image source={require('./assets/login.png')} style={styles.loginImage} />
      </TouchableOpacity>

      {/* Sección de clima */}
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

      {/* Línea de Separación */}
      <View style={styles.separator} />

      {/* Botón Info alumno */}
      <TouchableOpacity onPress={() => navigation.navigate('Alumno')} style={styles.infoButton}>
        <Text style={styles.buttonText}>Info alumno</Text>
      </TouchableOpacity>

      {/* Contenido Scrollable */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Secciones en forma de mosaico */}
        <View style={styles.mosaicContainer}>
          {/* Mapa */}
          <TouchableOpacity onPress={() => openUrl('https://maps.app.goo.gl/JubSu3y5t7ixWXJWA')} style={styles.mosaicItem}>
            <Image source={require('./assets/mapa.jpg')} style={styles.mosaicImage} />
            <Text style={styles.mosaicText}>Mapa</Text>
          </TouchableOpacity>

          {/* Directorio */}
          <TouchableOpacity onPress={() => navigation.navigate('Index')} style={styles.mosaicItem}>
            <Image source={require('./assets/directorio.png')} style={styles.mosaicImage} />
            <Text style={styles.mosaicText}>Directorio</Text>
          </TouchableOpacity>

          {/* Módulos */}
          <TouchableOpacity onPress={() => navigation.navigate('Modulos')} style={styles.mosaicItem}>
            <Image source={require('./assets/modulos.png')} style={styles.mosaicImage} />
            <Text style={styles.mosaicText}>Módulos</Text>
          </TouchableOpacity>

          {/* Realidad Aumentada */}
          <TouchableOpacity style={styles.mosaicItem}>
            <Image source={require('./assets/realidad.png')} style={styles.mosaicImage} />
            <Text style={styles.mosaicText}>Realidad Aumentada</Text>
          </TouchableOpacity>
        </View>

        {/* Sección Dirección */}
        <Text style={styles.sectionTitle}>CENTRO UNIVERSITARIO DE CIENCIAS EXACTAS E INGENIERÍAS</Text>
        <Text style={styles.addressText}>
          Blvd. Marcelino García Barragán #1421, esq Calzada Olímpica, C.P. 44430, Guadalajara, Jalisco, México.
          {'\n'}
          Teléfono: +52 33 1378 5900
        </Text>

        {/* Sección Redes Sociales */}
        <Text style={styles.sectionTitle}>Redes Sociales</Text>
        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={() => openUrl('https://www.facebook.com/udegcucei')}>
            <Image source={require('./assets/RS_FB.png')} style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.instagram.com/udegcucei/')}>
            <Image source={require('./assets/RS_IG.png')} style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://x.com/udegcucei')}>
            <Image source={require('./assets/RS_TW.png')} style={styles.socialMediaIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openUrl('https://www.youtube.com/@udegcucei')}>
            <Image source={require('./assets/RS_YT.png')} style={styles.socialMediaIcon} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loginButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  loginImage: {
    width: 50,
    height: 50,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 10,
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
    marginVertical: 20,
  },
  infoButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  mosaicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mosaicItem: {
    width: '40%',
    margin: '5%',
    alignItems: 'center',
  },
  mosaicImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  mosaicText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  socialMediaIcon: {
    width: 50,
    height: 50,
  },
});

