// HomePage.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actFetchListData } from './duck/actions';
import { RootState, AppDispatch } from '../../../redux/store';
import MovieComponent from './Movie';
import { ListMovieState, Movie } from '../../../types/movie.type';
import Banner from './Banner';

export default function HomePage() {
  const dispatch: AppDispatch = useDispatch();

  // Sử dụng useSelector với kiểu dữ liệu đã định nghĩa
  const { loading, data }: ListMovieState<Movie> = useSelector(
    (state: RootState) => state.listMovieReducer as ListMovieState<Movie>
  );

  useEffect(() => {
    dispatch(actFetchListData());
  }, [dispatch]);

  const renderListMovie = () => {
    if (loading) return <div>Loading...</div>;

    // Kiểm tra data có phải null không
    if (data && data.length > 0) {
      return data.map((movie) => (
        <MovieComponent key={movie.maPhim} movie={movie} />
      ));
    } else {
      return <div>Không có dữ liệu phim</div>; // Hiển thị thông báo nếu không có dữ liệu
    }
  };

  return (
    <div className="container">
      <Banner />
      <div style={{ marginTop: '20px' }}>
        <h2 style={{ marginBottom: '15px', color: '#333', textAlign: 'center' }}>List Movies</h2>
        <div className="row">{renderListMovie()}</div>
      </div>
    </div>
  );
}
