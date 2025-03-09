import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

// Komponentti, joka hakee ja näyttää maan, pääkaupungin ja lipun

export default function Capitals() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => { // Hakee maat ja pääkaupungit
    fetch("https://restcountries.com/v3.1/all") // Hakee kaikki maat API:sta
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((country) => ({
          name: country.name.common,
          capital: country.capital?.[0] || "",
          flag: country.flags.png, // Tallentaa valitut tiedot
        }));
        setCountries(formattedData);
      })
      .catch((error) => console.error('Error', error));
  }, []);

  const filteredCountries = countries.filter( // Suodattaa maat vastaako hakusana maan tai pääkaupungin nimeä
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.capital.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder='Search country and capital'
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.flag }} style={styles.flag} />
            <View>
              <Text style={styles.countryName}>{item.name}</Text>
              {item.capital ? <Text>{item.capital}</Text> : null} 
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 10,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});