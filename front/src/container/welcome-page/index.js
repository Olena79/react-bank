import "./index.css";
import Page from "./../../component/page";
import Button from "./../../component/button";

export default function Component () {
    return (
        <Page>
            <div className="big_fon">
                <h1 className="hello">Hello!</h1>
                <p className="par">Welcome to bank app</p>
            </div>

            <div className="b_coin"></div>

            <div className="buttons">               
                <a className="a" href="/signup">
                    <Button condition={"active"} style={{ backgroundColor: '#775CE5', color: 'white' }} text="Sign Up" />
                </a>
                
                <a className="a" href="/signin">
                    <Button condition={"active"} style={{ border: '1px solid #775CE5', color: '#775CE5' }} text="Sign In" />
                </a>                
            </div>
        </Page>
    );
}