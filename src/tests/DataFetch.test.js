import React from "react";
import ReactDOM from "react-dom";
import {DataFetch} from "../DataFetch";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<DataFetch />, div);
    ReactDOM.unmountComponentAtNode(div);
});