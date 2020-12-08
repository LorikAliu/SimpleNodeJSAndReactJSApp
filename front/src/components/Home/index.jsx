import React, { useState, useEffect } from "react";
import { useLocation, Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProducts, getSingleProduct, deleteProduct } from "../../api/products";
import { Container, ListGroup, CardDeck, Col, Row, Button, Table, Form } from "react-bootstrap";
import Header from "../Header/";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Alert from "@material-ui/lab/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.scss";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = ({ filterChanged }) => {
    const history = useHistory();
    const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);
    const [errMessage, setErrMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [productDetails, setProductDetails] = useState([]);
    // const [page, setPage] = useState(null);
    // const [currentPage, setCurrentPage] = useState(null);
    // const [prevPage, setPrevPage] = useState(null);
    // const [prevPageValue, setPrevPageValue] = useState(null);
    // const [nextPage, setNextPage] = useState(null);
    // const [nextPageValue, setNextPageValue] = useState(null);
    // const [pgResult, setPgResult] = useState(false);
    // const [maxPagination, setMaxPagination] = useState(null);

    let query = useQuery();
    let queryPage = query.get("page");
    let querySearch = query.get("title");

    const getProductsList = async () => {
        const response = await getProducts( queryPage, querySearch );
        setProductDetails(response.products);
    };

    const handleDeleteSubmit = async (id) => {
        const userID = {
          user_id: currentUser.user._id,
        };
        try {
            const response = await deleteProduct( id, userID );
          
            response.errMessage ? setErrMessage(response.errMessage) : setErrMessage(false);
            response.successMessage ? setSuccessMessage(response.successMessage) : setSuccessMessage(false);
        } catch (e) {}
      };

    useEffect(() => {
        getProductsList();
      }, []);

    if (!isLoggedIn) {
        return <Redirect to={"/login"} />;
    }

    return (
        <>
            <Header filterChanged={filterChanged} />
            <div className="event__container">
                {errMessage && <Alert severity="error">{errMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}
            </div>
            <Row className="mt-5 d-flex justify-content-center"  style={{minWidth: 400}}>
                <Col className="mt-4"  style={{maxWidth: 900}}>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {productDetails           
                    .map((product) => (
                            <tr>
                                <td>{product.productTitle}</td>
                                {/* <td>{product.productPrice / 100} $</td> */}
                                <td>{product.productPrice.toFixed(2)} $</td>
                                <td>{product.productStock}</td>
                                <td>{product.productDate}</td>
                                <td><Button variant="secondary" onClick={() => {
                                        history.push({
                                            pathname: `/editproduct/${product._id}`
                                        });
                                    }}>Edit</Button>
                                </td>
                                <td><Button variant="danger" onClick={() => {
                                    if (window.confirm("Delete the event?")) {
                                        handleDeleteSubmit(product._id);
                                    }
                                    }}>Delete</Button>
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </Table>
                </Col>
            </Row>
        </>
    )
}

export default Home;