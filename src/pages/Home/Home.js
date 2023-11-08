import React, { useEffect, useState, useContext } from 'react'
// import InputField from '../../components/Input/InputField'
import ItemCard from '../../components/ItemCard/ItemCard';
import Checkboxfield from '../../components/CheckBoxField/CheckBoxField';
import { BiArrowBack } from 'react-icons/bi'
import './Home.css'
import RecommendedItem from '../../components/SliderCarousel/RecommendedItem';
import { request } from '../../utils/axios_helper';
import { cart } from '../../contexts/CartContext'


function Home() {

    const { cartState, dispatch } = useContext(cart);
    const [respData, setRespData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [categoryFilter, setCategoryFilter] =
        useState({
            "Mobile": false,
            "Laptop": false,
            "Clothes": false,
            "Watch": false,
        })


    useEffect(() => {
        const getData = async () => {
            let res = await request("GET", "/Ecommerce/product");
            const data = res.data;
            setIsLoading(false);
            setRespData(data);
        }
        getData();


    }, []);

    const onChangeHandler = (e) => {
        setCategoryFilter({ ...categoryFilter, [e.target.value]: (e.target.checked) });
    }

    function filterProduct(respData, categoryFilter) {
        let filterData = respData;
        if (cartState.searchText) {
            filterData = respData.filter((item) => {
                return (item.name.toLowerCase().includes(cartState.searchText.toLowerCase()));
            })
        }
        if (categoryFilter.Mobile === true || categoryFilter.Laptop === true ||
            categoryFilter.Clothes === true || categoryFilter.Watch === true) {
            filterData = filterData.filter((item) => {
                return categoryFilter[item.category] === true;
            })
        }
        return filterData;
    }
    let filterCategoryItem = filterProduct(respData, categoryFilter);
    const unCheckedAllCheckBox = () => {
        let checkBoxs = document.querySelectorAll(".form-check-input");
        checkBoxs.forEach((el) => {
            el.checked = false;
        })
    }
    const backHandler = () => {
        filterCategoryItem = respData;
        setCategoryFilter({
            "Mobile": false,
            "Laptop": false,
            "Clothes": false,
            "Watch": false,
        })
        dispatch({ type: "SEARCH_ITEM", payload: { name: "" } })
        unCheckedAllCheckBox();
    }


    return (
        <>
            <div class="container-fluid" >
                <div className='filter-category'>
                    <h3 className='filter-header'>Filter</h3>
                    <div className='filter-content'>
                        <h3>category</h3>
                        <Checkboxfield label="Mobiles" value="Mobile" onChange={onChangeHandler} />
                        <Checkboxfield label="Laptops" value="Laptop" onChange={onChangeHandler} />
                        <Checkboxfield label="Clothes" value="Clothes" onChange={onChangeHandler} />
                        <Checkboxfield label="Watch" value="Watch" onChange={onChangeHandler} />

                    </div>
                </div>
                <div className="product-contant">
                    <div className="product">
                        <div className="back-link"><BiArrowBack onClick={backHandler} /></div>
                        <div>
                            <h3>Recommended Products</h3>
                            <RecommendedItem recommendedProduct={respData} />
                        </div>
                        <h2>All Products</h2>
                        <div className="d-flex flex-wrap">
                            {isLoading ? <h3 className='loading'><span>Loading...</span></h3> :
                                filterCategoryItem.map((item) => {
                                    return <ItemCard key={item.id} itemId={item.id} itemName={item.name} itemDesc={item.description}
                                        imgPath="data:image/jpeg;base64,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"
                                        price={item.price} MRP={item.mrp} quantity={item.noOfQuantity} />
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Home;
