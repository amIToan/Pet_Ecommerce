import "./relatedNews.scss"
import { useEffect, useState, memo } from "react"
import { Link } from "react-router-dom";
import publicRequest from "../../RequestMethos";
import Alert from 'react-bootstrap/Alert'
import { newsImageURL } from "../../RequestMethos";
const RelatedNews = () => {
    const [relatedNews, setRelatedNews] = useState(null)
    useEffect(() => {
        async function fetchingData() {
            const { data } = await publicRequest.get(`/news/all/?pageSize=14&pageNumber=1`)
            data.allPosts && setRelatedNews(data.allPosts)
        }
        fetchingData()
    }, [])
    return (
        <div>
            <h2 className="widget-title">
                <span>BÀI VIẾT LIÊN QUAN</span>
            </h2>
            <div className="widget-content">
                {relatedNews ?
                    <>
                        {
                            relatedNews.length > 0 && relatedNews.map(item =>
                                <div className="row mt-3" key={item._id}>
                                    <div className="col-5">
                                        <img src={`${newsImageURL}/${item.image[0]}`} alt="fsd" className="d-block img-fluid" />
                                    </div>
                                    <div className="col-7">
                                        <Link to={`/news/details/${item._id}`} className="text-reset text-decoration-none">
                                            MÁCH BẠN CÁCH CHỌN ĐỒ BƠI HỢP MỐT
                                        </Link>
                                    </div>
                                </div>
                            )
                        }</> :
                    <Alert variant={"danger"}>
                        There's something wrong!!!
                    </Alert>
                }

            </div>
        </div>
    )
}

export default memo(RelatedNews)