import { Fragment } from "react";
import "./index.css";

export default function Component({ title, paragraph, style }) {
    return (
    <Fragment>
        <div className="position">
            <h1 style={style ? style : {}} className="title">{title}</h1>
            <p style={style ? style : {}} className="paragraph">{paragraph}</p>
        </div>
    </Fragment>
    );
}