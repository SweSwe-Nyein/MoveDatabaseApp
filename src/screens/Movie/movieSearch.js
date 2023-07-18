import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieList } from './action';

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = React.useState('');

  const dispatch = useDispatch();
  const fetchData = async () => {
    await dispatch(searchMovieList(query));
  }

  //get movie list
  const {searchList, loading} = useSelector(
    state => state.movieReducer,
  );

  return (
    <ScrollView className="px-3 pt-3">
      <View className="flex flex-row">
        <TextInput
          className="bg-white flex-1 border border-gray-300 px-4"
          onChangeText={setQuery} 
          value={query}
        />
        <TouchableOpacity className="basis-16 bg-red-800 justify-center" onPress={fetchData}>
          <Text className="text-white text-center font-semibold">Search</Text>
        </TouchableOpacity>
      </View>
      <Text className="pt-3 text-lg font-semibold">Result : {query}</Text>
      {
        loading ? (
          <Text className="text-center my-36">Loading ...</Text>
        ) : (
          searchList.results != undefined ? (
            <View>
              {searchList.results.map((movie) => {
                return (
                  <View className="flex gap-y-3 py-3" key={movie.id}>
                    <TouchableOpacity className="" 
                      onPress={() => {navigation.navigate("Detail", {movieId: movie.id})}}
                    >
                      <View className="bg-white rounded flex flex-row">
                        <Image
                          className="w-28 h-40 rounded"
                          height={100}
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
                          }}
                        />
                        <View className="py-2 px-3 w-4/6">
                          <Text className="text-base font-semibold w-30">{movie.title}</Text>
                          <Text className="mt-1">{movie.release_date}</Text>
                          <Text className="mt-2">Rating : {movie.vote_average}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
          ) : (
            <Text>No Result</Text>
          )
        )
      }
    </ScrollView>
  );
};

export default SearchScreen;
