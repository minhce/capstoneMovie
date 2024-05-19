import { getBannerMovieApi } from "../../../apis/movie";
import { useQuery } from "@tanstack/react-query";
import { Carousel } from "antd";

export default function Banner() {
  const { isLoading, data = [] } = useQuery({
    queryKey: ["banner"],
    queryFn: getBannerMovieApi,
  });
  if (isLoading) return <p>Loading</p>;
  return (
    <div>
      <Carousel arrows infinite={false}>
        {data.map((item) => {
          return (
            <div>
              <img
                src={item.hinhAnh}
                style={{ height: 600 }}
                className="w-full object-cover h-[600px]"
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
