import "../styles/box.css";

export default function Box(options: {children?: any}) {
    return (
        <div className="box">
            {options.children}
        </div>
    )
}