/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  FlatList,
} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

const App = () => {
  const mockData = [1,2,3,4,5,6,7,8,9,10];
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const apiUrl = 'https://api.github.com/orgs/react-native-community/members?v=12';

  useEffect(() => {
    fetch(apiUrl)
    .then((result) => result.json()
      .then((json) => {setIsVisible(true); setData(json);})
    );
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
        style={styles.list}
          keyExtractor={(item) => data.length === 0 ? item.toString() : item.login}
          data={data.length === 0 ? mockData : data}
          ItemSeparatorComponent={() => <View style={styles.seperator}/>}
          ListHeaderComponent={() => <Text style={styles.textHeader}>Kullanıcı Listesi</Text>}
          renderItem={(item) => {
            const user = item.item;
            return (
            <View style={styles.listItem}>
              <ShimmerPlaceHolder style={styles.image} autoRun visible={isVisible}>
                <Image
                  source={{
                    uri: user.avatar_url,
                  }} style={styles.image}
                />
              </ShimmerPlaceHolder>
              <View style={styles.infoContainer}>
              <ShimmerPlaceHolder style={{...styles.shimText, width: 75}} autoRun visible={isVisible}><Text style={styles.text}>id: {user.id}</Text></ShimmerPlaceHolder>
              <ShimmerPlaceHolder style={{...styles.shimText, width: 175}} autoRun visible={isVisible}><Text style={styles.text}>username: {user.login}</Text></ShimmerPlaceHolder>
              <ShimmerPlaceHolder style={{...styles.shimText, width: 240}} autoRun visible={isVisible}><Text style={styles.text}>node_id: {user.node_id}</Text></ShimmerPlaceHolder>
              <ShimmerPlaceHolder style={{...styles.shimText, width: 260}} autoRun visible={isVisible}><Text style={styles.text}>url: {user.html_url}</Text></ShimmerPlaceHolder>
              </View>
            </View>
            );
          }
        }
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  text: {
    fontSize: 15,
  },
  shimText: {
    height: 15,
    marginTop: 3,
  },
  infoContainer: {
    marginStart: 20,
    marginTop: 0,
  },
  seperator: {
    height: 16,
  },
  textHeader: {
    fontSize: 36,
    marginBottom: 16,
    marginTop: 16,
    fontWeight: 'bold',
  },

});

export default App;
