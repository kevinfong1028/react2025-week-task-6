import App from "../App";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Products from "@/pages/Products";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/Cart",
                element: <Cart />,
            },
            {
                path: "/products/",
                element: <Products />,
            },
            {
                path: "/product/:id",
                element: <Product />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
