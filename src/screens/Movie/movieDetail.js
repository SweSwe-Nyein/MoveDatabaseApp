import React, { useEffect } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { movieDetailBackDrop } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetail } from './action';

const DetailScreen = ({ route, navigation }) => {
  const {movieId} = route.params;

  const dispatch = useDispatch();
  const fetchData = async () => {
    await dispatch(movieDetail(movieId));
  }

  const {detail, loading} = useSelector(
    state => state.movieReducer,
  );

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [movieId])

  const renderCast = ({ item }) => (
    <View className="mr-4">
      <Image
        className="w-20 h-20 rounded-full mb-2"
        height={100}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
        }}
      />
      <Text className="text-center w-20">{item.name}</Text>
    </View>
  );
  const renderCrew = ({ item }) => (
    <View className="mr-4">
      <Image
        className="w-20 h-20 rounded-full mb-2"
        height={100}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${item.profile_path}`,
        }}
      />
      <Text className="text-center w-20">{item.name}</Text>
    </View>
  );
  const renderSimilar = ({ item }) => (
    <TouchableOpacity onPress={() => {navigation.navigate("Detail", {movieId: item.id})}}>
      <View className="mr-6">
        <Image
          className="w-28 h-40 rounded"
          height={100}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
        />
        <Text className="text-center w-20">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView>
      {
        loading ? (
          <Text className="text-center my-36">Loading ...</Text>
        ) : (
          detail != undefined ? (
            <View className="">
              <ImageBackground
                className="w-full h-48"
                source={{
                  uri: `https://image.tmdb.org/t/p/w500/${detail.backdrop_path}`,
                }}
                resizeMode="cover"
              >
                <View style={movieDetailBackDrop}/>
                <View className="py-2 px-3 absolute bottom-2 left-0">
                  <Text className="text-lg font-semibold text-white">{detail.original_title}</Text>
                  <View className="flex flex-row">
                    {
                      detail.genres != undefined ?
                      (detail.genres.map((g, index) => <Text className="text-base text-white" key={index}>{g.name}{index == detail.genres.length-1 ? '' : ','} </Text>)) : null
                    }
                  </View>
                </View>
              </ImageBackground>
              <View className="p-3">
                <View className="flex flex-row justify-between mt-3">
                  <View>
                    <Text className="text-black font-semibold">Runtime</Text>
                    <Text>{detail.runtime} mins</Text>
                  </View>
                  <View>
                    <Text className="text-black font-semibold">Rating</Text>
                    <Text>{Math.round(detail.vote_average * 10) / 10}</Text>
                  </View>
                  <View>
                    <Text className="text-black font-semibold">Languages</Text>
                    <Text>{detail.spoken_languages != undefined ? detail.spoken_languages[0].english_name : null}</Text>
                  </View>
                </View>
                <View className="mt-5">
                  <Text className="text-black font-semibold mb-1">Released Date</Text>
                  <Text className="leading-5 text-justify">{detail.release_date}</Text>
                </View>
                <View className="mt-5">
                  <Text className="text-black font-semibold mb-1">Tagline</Text>
                  <Text className="leading-5 text-justify">{detail.tagline}</Text>
                </View>
                <View className="mt-5">
                  <Text className="text-black font-semibold mb-1">Synopsis</Text>
                  <Text className="leading-5 text-justify">{detail.overview}</Text>
                </View>
                <View className="mt-5">
                  <Text className="text-black font-semibold mb-5">Cast</Text>
                  <FlatList
                    data={detail.credits != undefined ? detail.credits.cast : []}
                    renderItem={renderCast}
                    keyExtractor={(item, index) => index}
                    horizontal
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-black font-semibold mb-5">Crew</Text>
                  <FlatList
                    data={detail.credits != undefined ? detail.credits.crew : []}
                    renderItem={renderCrew}
                    keyExtractor={(item, index) => index}
                    horizontal
                  />
                </View>
                <View className="mt-5">
                  <Text className="text-black font-semibold mb-5">Related Movies</Text>
                  <FlatList
                    data={detail.similar != undefined ? detail.similar.results : []}
                    renderItem={renderSimilar}
                    keyExtractor={(item, index) => index}
                    horizontal
                  />
                </View>
              </View>
            </View>
          ) : (
            <Text>Something Went Wrong</Text>
          )
        )
      }
    </ScrollView>
  );
};

export default DetailScreen;
