import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import * as Utils from "../utils";
import { useForm } from "react-hook-form";

// const VITE_BASEURL = import.meta.env.VITE_BASEURL;
// const VITE_PATH = import.meta.env.VITE_PATH;
const { VITE_BASEURL, VITE_PATH } = import.meta.env;

function Cart() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const apiProduct = {
        getAll: async (page = 1) => {
            const url = `${apiBase}/api/${apiPath}/products/all`;
            try {
                const res = await axios.get(url);
                if (res.data.success) {
                    // console.log("get resp:", res.data);
                    setProducts(res.data.products); // array
                }
            } catch (error) {
                console.dir(error);
            }
        },
        getOne: async (request) => {
            const url = `${apiBase}/api/${apiPath}/product`;
            try {
                return await axios.post(url, request);
            } catch (error) {
                console.dir(error);
            }
        },
        delete: async (pId) => {
            const url = `${apiBase}/api/${apiPath}/product/${pId}`;
            try {
                return await axios.delete(url);
            } catch (error) {
                console.dir(error);
            }
        },
        put: async (request, pId) => {
            const url = `${apiBase}/api/${apiPath}/product/${pId}`;
            try {
                return await axios.put(url, request);
            } catch (error) {
                console.dir(error);
            }
        },
    };

    useEffect(() => {
        (async () => {
            const url = `${VITE_BASEURL}/api/${VITE_PATH}/products`;
            const resp = await axios.get(url);
            console.log('List', resp)
            setProducts(resp.data.products);
        })();
    }, []);

    const clickDetail = async (id, e) => {
        e.preventDefault();
        navigate(`/product/${id}`);
    };

    const [cartData, setCartData] = useState({});
    const [isFreezed, setIsFreezed] = useState(true);

    const loadCart = async () => {
        const url = `${VITE_BASEURL}/api/${VITE_PATH}/cart`;
        try {
            const res = await axios.get(url);
            console.log(res.data);
            if (res.data.success) {
                let modify = {
                    ...res.data.data,
                    carts: res.data.data.carts.map((item) => ({
                        ...item,
                        isDisabled: false,
                    })),
                };
                setCartData(modify);
                // setProducts(
                //     res.data.data.carts.map((item) => ({
                //         ...item,
                //         isDisabled: true,
                //     })),
                // );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const handleInputChange = (e, index) => {
        setIsFreezed(false);
        // setProducts((prev) =>
        //     prev.map((item, i) =>
        //         i === index
        //             ? {
        //                   ...item,
        //                   qty: e.target.value,
        //                   isDisabled: false,
        //               }
        //             : item,
        //     ),
        // );
        setCartData((prev) => ({
            ...prev,
            carts: prev.carts.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          qty: e.target.value,
                          isDisabled: false,
                      }
                    : item,
            ),
        }));
    };

    const addCart = async (id) => {
        setIsFreezed(true);
        const url = `${VITE_BASEURL}/api/${VITE_PATH}/cart/`;
        const req = {
            data: {
                product_id: id,
                qty: 1,
            },
        };
        // console.log('add cart', id, url, req)
        try {
            const resp = await axios.post(url, req);
            if (resp.data.success) {
                alert(
                    `${resp.data.message},總共已有 ${resp.data.data.qty}個${resp.data.data.product.title}`,
                );
                loadCart();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsFreezed(false);
        }
    };

    const updateCart = async (cId, pId, q = 1) => {
        const req = {
            data: {
                product_id: pId,
                qty: Number(q),
            },
        };
        const url = `${VITE_BASEURL}/api/${VITE_PATH}/cart/${cId}`;
        try {
            const res = await axios.put(url, req);
            if (res.data.success) {
                loadCart();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCart = async (cId, title) => {
        const yes = confirm(`確定要刪除 ${title} 嗎?`);
        if (!yes) return;

        const url = `${VITE_BASEURL}/api/${VITE_PATH}/cart/${cId}`;
        try {
            const res = await axios.delete(url);
            if (res.data.success) {
                loadCart();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [isEmptyBtnDisabled, setIsEmptyBtnDisabled] = useState(false);
    useEffect(
        (e) => {
            setIsEmptyBtnDisabled(cartData.carts?.length === 0 ? true : false);
        },
        [cartData.carts?.length],
    );

    const emptyCart = async () => {
        const yes = confirm(`確定清空購物車嗎?`);
        if (!yes) return;

        const url = `${VITE_BASEURL}/api/${VITE_PATH}/carts`;
        try {
            // return;
            const res = await axios.delete(url);
            if (res.data.success) {
                loadCart();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            inputName: "",
            inputEmail: "",
            inputTel: "",
            inputAddr: "",
            inputComment: "",
            agree: true,
        },
        mode: "onChange",
    });

    console.log(errors);

    const mySubmit = async (inputData) => {
        const req = {
            data: {
                user: {
                    name: inputData.inputName,
                    email: inputData.inputEmail,
                    tel: inputData.inputTel,
                    address: inputData.inputAddr,
                },
                message: inputData.inputComment,
            },
        };
        console.log("mySubmit", req);
        try {
            const url = `${VITE_BASEURL}/api/${VITE_PATH}/order`;
            const res = await axios.post(url, req)
            console.log('order post', res)

            if(res.data.success){

            }

        } catch (error) {
            console.log('XXX', error)
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>產品清單</h3>
                        <table className="table table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>picture</th>
                                    <th>Item</th>
                                    <th>price</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p, index) => (
                                    <tr key={p.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={p.imageUrl}
                                                alt={p.title}
                                                style={{ height: "80px" }}
                                            />
                                        </td>
                                        <td>{p.title}</td>
                                        <td>
                                            <del className="me-2 text-secondary">
                                                {p.origin_price}
                                            </del>
                                            {p.price}
                                        </td>
                                        <td>
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic example"
                                            >
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary"
                                                    onClick={() =>
                                                        navigate(`/product/${p.id}`)
                                                    }
                                                >
                                                    看詳細
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary"
                                                    onClick={() =>
                                                        addCart(p.id)
                                                    }
                                                >
                                                    加入訂單
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 d-flex justify-content-between">
                        <h3>訂單 </h3>
                        <span className="">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={emptyCart}
                                disabled={isEmptyBtnDisabled}
                            >
                                清空購物車
                            </button>
                        </span>
                    </div>
                    <div className="col-12 d-flex">
                        <table className="table table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>品名</th>
                                    <th className="w-25">數量/單位</th>
                                    <th>刪除</th>
                                    <th>小計</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.carts?.length < 1 ? (
                                    <tr>
                                        <td colSpan="8">趕快去敗家</td>
                                    </tr>
                                ) : (
                                    cartData.carts?.map((p, index) => (
                                        <tr key={p.product_id}>
                                            <td>{index + 1}</td>
                                            <td>{p.product.title}</td>
                                            <td>
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id={`qty-${p.id}`}
                                                        value={p.qty}
                                                        step="1"
                                                        min="1"
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                index,
                                                            )
                                                        }
                                                    />
                                                    <span className="input-group-text">
                                                        {p.product.unit}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div
                                                    className="btn-group"
                                                    role="group"
                                                    aria-label="Basic example"
                                                >
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            deleteCart(
                                                                p.id,
                                                                p.product.title,
                                                            )
                                                        }
                                                    >
                                                        刪除
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                {Utils.thousandNum(p.total)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4">total</td>
                                    <td>{Utils.thousandNum(cartData.total)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="col-12 mt-3 mb-5">
                        <form
                            onSubmit={handleSubmit((d) => mySubmit(d))}
                            className="w-50 mx-auto border p-4"
                        >
                            <h4>訂單資訊</h4>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputName"
                                    className="form-label"
                                >
                                    <i className="text-danger me-2">*</i>姓名
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("inputName", {
                                        required: "請填寫姓名",
                                        min: 3,
                                        maxLength: 30,
                                    })}
                                />
                                <p className="text-danger">
                                    {errors.inputName?.message}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputEmail"
                                    className="form-label"
                                >
                                    <i className="text-danger me-2">*</i>Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    {...register("inputEmail", {
                                        required: "請填寫email",
                                    })}
                                    placeholder="example@mail.com"
                                />
                                <p className="text-danger">
                                    {errors.inputEmail?.message}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputTel"
                                    className="form-label"
                                >
                                    <i className="text-danger me-2">*</i>電話
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    {...register("inputTel", {
                                        required: "請填寫8-10位數字電話號碼",
                                        minLength: {
                                            value: 8,
                                            message: "至少8碼",
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "最多10碼",
                                        },
                                    })}
                                />
                                <p className="text-danger">
                                    {errors.inputTel?.message}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputAddr"
                                    className="form-label"
                                >
                                    地址：必填
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("inputAddr", {
                                        required: "請填寫地址",
                                    })}
                                />
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="inputComment"
                                    className="form-label"
                                >
                                    留言：非必填
                                </label>
                                <textarea
                                    className="form-control"
                                    {...register("inputComment")}
                                />
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="agree"
                                    {...register("agree", {
                                        required: "請先確認訂單內容無誤",
                                    })}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="agree"
                                >
                                    Check me out
                                </label>
                                <p className="text-danger">
                                    {errors.agree?.message}
                                </p>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
