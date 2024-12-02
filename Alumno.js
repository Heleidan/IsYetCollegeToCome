import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Button } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function Alumno() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMaterias, setShowAllMaterias] = useState(false); // Controlar cuántas materias mostrar

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch('https://cuceimobile.space/Escuela/kardex.php');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudentData(data);
      } catch (err) {
        setError('Error al cargar la información del alumno.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos del alumno...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  const materiasToShow = showAllMaterias
    ? studentData.materias
    : studentData.materias.slice(0, 3); // Mostrar 3 o todas las materias según el estado

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.title}>Información del Alumno</Text>

      {/* Datos Generales */}
      <Text style={styles.sectionTitle}>Datos Generales</Text>
      <Text style={styles.text}>Nombre: {studentData.nombre}</Text>
      <Text style={styles.text}>Carrera: {studentData.carrera}</Text>
      <Text style={styles.text}>Código: {studentData.codigo}</Text>

      {/* Materias Cursadas */}
      <Text style={styles.sectionTitle}>Materias Cursadas</Text>
      {materiasToShow.map((materia, index) => (
        <View key={index} style={styles.materiaContainer}>
          <Text style={styles.text}>
            {materia.descripcion} ({materia.ciclo})
          </Text>
          <Text style={styles.text}>Calificación: {materia.calificacion}</Text>
          <Text style={styles.text}>Créditos: {materia.creditos}</Text>
        </View>
      ))}
      <Button
        title={showAllMaterias ? 'Mostrar menos' : 'Mostrar más'}
        onPress={() => setShowAllMaterias(!showAllMaterias)}
      />

      {/* Créditos Totales */}
      <Text style={styles.sectionTitle}>Créditos Totales</Text>
      <Text style={styles.text}>Adquiridos: {studentData.creditosAdquiridos}</Text>
      <Text style={styles.text}>Requeridos: {studentData.creditosRequeridos}</Text>
      <PieChart
        data={[
          {
            name: 'Adquiridos',
            population: studentData.creditosAdquiridos,
            color: '#4CAF50',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
          },
          {
            name: 'Restantes',
            population: Math.max(
              studentData.creditosRequeridos - studentData.creditosAdquiridos,
              0
            ), // Asegurarse de no mostrar valores negativos
            color: '#FF5722',
            legendFontColor: '#7F7F7F',
            legendFontSize: 14,
          },
        ]}
        width={Dimensions.get('window').width - 40}
        height={200}
        chartConfig={{
          color: () => `rgba(255, 255, 255, 0.5)`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      {/* Créditos por Área */}
      <Text style={styles.sectionTitle}>Créditos por Área</Text>
      {studentData.creditosArea.map((area, index) => {
        const remainingCredits = Math.max(
          area.creditosRequeridos - area.creditosAdquiridos,
          0
        ); // Evitar negativos
        return (
          <View key={index} style={styles.areaContainer}>
            <Text style={styles.text}>{area.area}</Text>
            <PieChart
              data={[
                {
                  name: 'Adquiridos',
                  population: area.creditosAdquiridos,
                  color: '#4CAF50',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 14,
                },
                {
                  name: 'Restantes',
                  population: remainingCredits,
                  color: remainingCredits > 0 ? '#FF5722' : '#4CAF50', // Lleno si no hay restantes
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 14,
                },
              ]}
              width={Dimensions.get('window').width - 40}
              height={200}
              chartConfig={{
                color: () => `rgba(255, 255, 255, 0.5)`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        );
      })}

      {/* Promedio General */}
      <Text style={styles.sectionTitle}>Promedio General</Text>
      <Text style={styles.text}>{studentData.promedio}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 2,
    textAlign: 'center',
  },
  materiaContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  areaContainer: {
    marginVertical: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
});

