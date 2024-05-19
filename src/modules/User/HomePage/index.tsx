import Banner from "./Banner";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actFetchListData } from "./duck/actions";
import { RootState } from "../../../redux/store";
import MovieComponent from "./Movie";



export default function HomePage() {
  const dispatch: any = useDispatch();

  const { loading, data } = useSelector(
    (state: RootState) => state.listMovieReducer
  );

  useEffect(() => {
    dispatch(actFetchListData());
  }, [dispatch]);

  const renderListMovie = () => {
    if (loading) return <div>Loading...</div>;

    if (data && data.length > 0) {
      return data.map((movie) => <MovieComponent movie={movie} />);
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

