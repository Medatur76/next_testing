import "../styles/box.css";

export default function Box(options: {children?: any, className?: string}) {
    return (
        <div className={"box" + (options.className ? " " + options.className : "")}>
            {options.children}
        </div>
    )
}