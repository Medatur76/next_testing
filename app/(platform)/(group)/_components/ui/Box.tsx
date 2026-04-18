import "../styles/box.css";

export default function Box(options: {children?: any, className?: string, width?: string}) {
    return (
        <div className={"box" + (options.className ? " " + options.className : "")} style={options.width ? {width: options.width} : undefined}>
            {options.children}
        </div>
    )
}