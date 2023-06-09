import { StyleSheet, Text, View, Image } from 'react-native'
  

export default function CommentsScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.postPhoto} />
      <Text style={styles.text}>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  postPhoto: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    marginTop: 32,
    marginBottom: 8,
    alignItems: 'center',
  },
});