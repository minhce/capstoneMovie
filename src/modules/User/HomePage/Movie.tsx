
import { Link } from "react-router-dom";
import { Movie } from "../../../types/movie.type";

type Props = {
  movie: Movie;
};

export default function MovieComponent(props: Props) {
  const { movie } = props;
  return (
    <div className="col-md-3">
      <div className="card">
        <img className="card-img-top" src={movie.hinhAnh} alt="" />
        <div className="card-body">
          <h4 className="card-title">{movie.tenPhim}</h4>
          <Link to={`/detail/${movie.maPhim}`} className="btn btn-success">
            Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
