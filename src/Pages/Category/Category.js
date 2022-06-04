import Map from "../../components/maps/Map"
import Navbar from "../../components/Navbar/Navbar";
import StoreSystems from "../../components/storesystem/StoreSystems";
import Policy from "../../components/Policy/Policy";
import Footer from "../../components/footer/footer";
import MainCategory from "../../components/maincategory/MainCategory";
import { memo } from "react";
function Category() {
    return (
        <>
            < Navbar />
            < Map />
            <MainCategory />
            <StoreSystems />
            <Policy />
            <Footer />
        </>
    )
}

export default  memo(Category)