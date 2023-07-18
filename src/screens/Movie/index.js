import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieList } from './action';

const HomeScreen = ({navigation}) => {

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const fetchData = async () => {
    await dispatch(getMovieList(page));
  }

  //get movie list
  const {movieList, loading} = useSelector(
    state => state.movieReducer,
  );

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, [page]);
  const prevPage = () => {
    if (movieList.page > 1) {
      setPage(page - 1);
    }
  }
  const nextPage = () => {
    if (page < movieList.total_pages) {
      setPage(page + 1);
    }
  }

  return (
    <ScrollView className="px-3 pt-3">
      <Text className="pt-3 text-lg font-semibold">Trending Movies</Text>
      {
        loading ? (
          <Text className="text-center my-36">Loading ...</Text>
        ) : (
          movieList.results != undefined ? (
            <View>
              {movieList.results.map((movie) => {
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
              <View className="flex flex-row justify-between">
                <Text className="">Page : {page}</Text>
                <View className="flex flex-row justify-end mb-5 gap-5">
                  {
                    page > 1 ? (
                      <TouchableOpacity onPress={prevPage} className="flex-initial w-10 items-center py-2 bg-red-800 rounded">
                        <AntDesign name='left' size={18} color="#fff" />
                      </TouchableOpacity>
                    ) : null
                  }
                  {
                    page < movieList.total_pages ? (
                      <TouchableOpacity onPress={nextPage} className="flex-initial w-10 items-center py-2 bg-red-800 rounded">
                        <AntDesign name='right' size={18} color="#fff" />
                      </TouchableOpacity>
                    ) : null
                  }
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

export default HomeScreen;
