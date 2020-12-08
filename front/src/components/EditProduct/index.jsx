import React, { useState, useEffect } from "react";
import { useParams, Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getSingleProduct, editProduct } from "../../api/products";
import { Container, ListGroup, CardDeck, Col, Row, Button, Table, Form } from "react-bootstrap";
import Header from "../Header/";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Alert from "@material-ui/lab/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./style.scss";

const EditProduct = () => {
    let { id } = useParams();
    const history = useHistory();
    const { user: currentUser, isLoggedIn } = useSelector((state) => state.auth);
    const [errMessage, setErrMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    // const [productDetails, setProductDetails] = useState([]);
    const [productDetails, setProductDetails] = useState({});

    const getProductsList = async () => {
        try {
            const response = await getSingleProduct(id);
            setProductDetails((oldDetails) => ({
                ...oldDetails,
                productTitle: response.product.productTitle,
                productPrice: response.product.productPrice,
                productStock: response.product.productStock
            }));
        } catch (e) {
            setErrMessage('Product not found!')
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails({ ...productDetails, [name]: value });
      };

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data, e) => {
        const product = {
            productTitle: data.productTitle,
            productPrice: data.productPrice,
            productStock: data.productStock
        };
    
        try {
            const response = await editProduct( id, product);
            response.successMsg ? setSuccessMessage(response.successMsg) : setSuccessMessage(false);
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
            <Header />
            <Row className="mt-5 d-flex justify-content-center"  style={{minWidth: 400}}>
                <Col className="mt-4"  style={{maxWidth: 900}}>
                {errMessage ? (
                    <>
                        <div className="form__title d-flex justify-content-center mb-5 mt-5 ">
                            <Alert severity="error">{errMessage}</Alert>
                        </div>
                    </>
                ) : '' }
                {successMessage ? (
                    <>
                        <div className="form__title d-flex justify-content-center mb-5 mt-5 ">
                        <Alert severity="success">{successMessage}</Alert>
                        </div>
                    </>
                ) : '' }
                <div className="form__title d-flex justify-content-center mb-5 mt-5 ">
                    <h1>Edit a Product</h1>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="product__form__group" as={Col} auto>
                            <Form.Label className="product__form__label d-flex align-items-end">
                            Product Name:
                            </Form.Label>
                            <Form.Control
                            type="text"
                            defaultValue={productDetails.productTitle}
                            name="productTitle"
                            // value={paymentDetails.name}
                            ref={register({ required: true, minLength: 3 })}
                            />
                            <p style={{ color: "red" }}>
                            &#8203;
                            {errors.productTitle && errors.productTitle.type === "required" && (
                                <span>This field is required!</span>
                            )}
                            {errors.productTitle && errors.productTitle.type === "minLength" && (
                                <span>
                                This field requires minimum length of 3 characters!
                                </span>
                            )}
                            </p>
                        </Form.Group>

                        <Form.Group className="product__form__group" as={Col} auto>
                        <Form.Label className="product__form__label d-flex align-items-end">
                            Price:
                        </Form.Label>
                        <Form.Control
                            type="number"
                            step={0.01}
                            value={productDetails.productPrice}
                            // defaultValue={productDetails.productPrice}
                            name="productPrice"
                            onChange={handleChange}
                            // value={paymentDetails.cardNo}
                            ref={register({ required: true, min: 1 })}
                        />
                        <p style={{ color: "red" }}>
                            &#8203;
                            {errors.productPrice && errors.productPrice.type === "required" && (
                            <span>This field is required!</span>
                            )}
                            {errors.productPrice && errors.productPrice.type === "min" && (
                            <span>
                                This field requires minimum value of 1!
                            </span>
                            )}
                        </p>
                        </Form.Group>

                        <Form.Group className="product__form__group" as={Col} auto>
                            <Form.Label className="product__form__label d-flex align-items-end">
                            Stock:
                            </Form.Label>
                            <Form.Control
                            type="number"
                            step={0.01}
                            value={productDetails.productStock}
                            // defaultValue={productDetails.productStock}
                            name="productStock"
                            onChange={handleChange}
                            ref={register({ required: true, min: 1 })}
                            />
                            <p style={{ color: "red" }}>
                            &#8203;
                            {errors.productStock && errors.productStock.type === "required" && (
                                <span>This field is required!</span>
                            )}
                            {errors.productStock && errors.productStock.type === "min" && (
                                <span>This field requires minimum value of 1!</span>
                            )}
                            </p>
                        </Form.Group>
                        <Form.Group className="product__form__group" as={Col} auto>
                            <Button
                                className="btn-lg font-weight-bold"
                                variant="primary"
                                type="submit"
                            >
                            Edit Product
                            </Button>
                        </Form.Group>
                    {/* </Form.Row> */}
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default EditProduct;