import { useEffect, useState } from "react"
import Map from "../../components/maps/Map";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/footer";
import moment from "moment";
import Loading from "../../components/Error.Loading/Loading";
import Message from "../../components/Error.Loading/Error";
import { useParams, Link } from "react-router-dom";
import publicRequest from "../../RequestMethos";
import Alert from 'react-bootstrap/Alert'
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { newsImageURL } from "../../RequestMethos";
import RelatedNews from "../../components/News/relatedNews"
import { Helmet } from "react-helmet";
const NewsDetails = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null)
    useEffect(() => {
        async function fetchingData(newsId) {
            const { data } = await publicRequest.get(`/news/${newsId
                }`)
            data && setNews(data)
        }
        fetchingData(newsId)
    }, [newsId])
    return (
        <>
            <Helmet>
                <title>{news?.title ? news.title : "PetShop"}</title>
                <meta name="keywords" content={news?.metaKeys ? news.metaKeys : "Quần áo, trang phục , BJJ, Brazilian JiuJitsu, Judo, võ phục, Nogi, Rashguard,..."} />
                <meta name="description" content={news?.metaDes ? news.metaDes : "Công ty chuyên về võ phục, Gi, NoGi, đặc biệt chuyên về Judo, Brazilian JiuJitsu, BJJ,..."} />
            </Helmet>
            <Navbar />
            <Map />
            <div className="container my-4">
                <div className="row">
                    {news ? <>
                        <div className="col-12 col-md-9">
                            <h3>{news.title}</h3>
                            <div dangerouslySetInnerHTML={{
                                __html: news.description
                            }}></div>
                            <div className="my-3">
                                {news.image?.length > 0 &&
                                    news.image.map((item, index) =>
                                    (<div key={index}>
                                        <img src={`${newsImageURL}/${item}`} alt={news.title} className="d-block img-fluid" />
                                    </div>)
                                    )
                                }
                            </div>
                            <div className="d-flex align-items-center">
                                <CalendarMonthIcon />
                                {moment(news.createdAt).calendar()}
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <RelatedNews />
                        </div>
                    </> :
                        <>
                            <Alert variant={"danger"}>
                                There's something wrong!!!
                            </Alert>
                        </>}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default NewsDetails