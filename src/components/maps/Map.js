import "./Map.scss"
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { memo } from "react"
function Map() {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const pathname = window.location.pathname
    const breadcumArray = pathname.split("/").filter(item => item != "")
    return (
        <div className="app_breadcrumb_container">
            <div className="container app_breadcrumb_container">
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    {breadcumArray?.length > 0 && breadcumArray.map((item, index) => index === breadcumArray.length - 1 ? <Breadcrumb.Item active key={index}>{capitalize(item)}</Breadcrumb.Item> : <Breadcrumb.Item active>{item}</Breadcrumb.Item>)}
                </Breadcrumb>
            </div>
        </div>
    )
}

export default memo(Map)