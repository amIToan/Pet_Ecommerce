import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import moment from "moment";
import Loading from "../../components/Error.Loading/Loading";
import Message from "../../components/Error.Loading/Error";
import publicRequest from "../../RequestMethos";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
async function fetchingData(pageNumber = 1) {
  const { data } = await publicRequest.get(
    `/news/all/?pageSize=16&pageNumber=${pageNumber}`
  );
  return data;
}
const Newspage = () => {
  const { pageNumber } = useParams();
  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    ["pagination", pageNumber],
    () => fetchingData(pageNumber),
    {
      keepPreviousData: true,
      cacheTime: 600000,
      staleTime: 300000,
    }
  );
  console.log(data);
  return (
    <>
      <Navbar />
      <Map />
      {/* {loading && <Loading />} */}
      <Footer />
    </>
  );
};

export default Newspage;
